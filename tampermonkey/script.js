// ==UserScript==
// @name        google maps radius overlay
// @run-at      document-start
// @grant       none
// ==/UserScript==
(() => {
  /* ============ 設定項目 ============ */
  const CENTER = { lat: 35.6813166, lng: 139.7567661 }; // 円の中心を緯度と経度で指定
  const RADIUS = 2000;                                  // 円の半径をメートルで指定
  const STROKE = '#4285F4', FILL = '#4285F4', OPACITY = 0.15; // 円の色と透明度を指定
  /* ================================= */

  /** Google Maps APIが呼ばれるのを待つ */
  const waiter = setInterval(() => {
    if (!window.google?.maps?.Map) return;
    clearInterval(waiter);
    hookMapPrototype();
  }, 50);

  /** Google Maps APIのMap.prototype.setCenterをフック */
  function hookMapPrototype () {
    // eslint-disable-next-line no-undef
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

  /** 円を描画 */
  function attachCircle (map) {
    if (map.__radiusDone) return;
    // eslint-disable-next-line no-undef
    new google.maps.Circle({
      map,
      center: CENTER,
      radius: RADIUS,
      strokeColor:   STROKE,
      strokeOpacity: 0.8,
      strokeWeight:  2,
      fillColor:     FILL,
      fillOpacity:   OPACITY,
      clickable:     false,
    });
    map.__radiusDone = true;
    console.log('[gm-radius-overlay] circle attached');
  }
})();