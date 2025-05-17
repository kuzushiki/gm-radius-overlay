/* global google */

(() => {
  window.__gmRadiusOverlay = {
    settings: {
      center: { lat: 35.6813166, lng: 139.7567661 },
      radius: 2000,
      strokeColor: '#4285F4',
      fillColor: '#4285F4',
      opacity: 0.15
    }
  };

  /** Google Maps APIが呼ばれるのを待つ */
  const waiter = setInterval(() => {
    if (!window.google?.maps?.Map) return;
    clearInterval(waiter);
    hookMapPrototype();
  }, 50);

  /** Google Maps APIのMap.prototype.setCenterをフック */
  function hookMapPrototype() {
    const Proto = google.maps.Map.prototype;
    if (Proto.__radiusHooked) return;
    const orig = Proto.setCenter;
    Proto.setCenter = function (...args) {
      attachCircle(this);
      return orig.apply(this, args);
    };
    Proto.__radiusHooked = true;
    console.log('[gm-radius-overlay] Map prototype hooked');
  }

  let currentCircle = null;

  /** 円を描画 */
  function attachCircle(map) {
    if (map.__radiusDone) return;
    const settings = window.__gmRadiusOverlay.settings;
    currentCircle = new google.maps.Circle({
      map,
      center: settings.center,
      radius: settings.radius,
      strokeColor: settings.strokeColor,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: settings.fillColor,
      fillOpacity: settings.opacity,
      clickable: false,
    });
    map.__radiusDone = true;
    console.log('[gm-radius-overlay] circle attached');
  }

  /** 設定更新イベントリスナー */
  document.addEventListener('GM_RADIUS_SETTINGS_UPDATED', (e) => {
    window.__gmRadiusOverlay.settings = e.detail;
    if (currentCircle) {
      const settings = window.__gmRadiusOverlay.settings;
      currentCircle.setOptions({
        center: settings.center,
        radius: settings.radius,
        strokeColor: settings.strokeColor,
        fillColor: settings.fillColor,
        fillOpacity: settings.opacity
      });
      console.log('[gm-radius-overlay] circle updated');
    }
  });
})();