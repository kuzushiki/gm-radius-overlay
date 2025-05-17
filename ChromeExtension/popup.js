/* global chrome */

console.log('[gm-radius-overlay] Popup script loaded');

// デフォルト設定
const DEFAULT_SETTINGS = {
  center: { lat: 35.6813166, lng: 139.7567661 },
  radius: 2000,
  strokeColor: '#4285F4',
  fillColor: '#4285F4',
  opacity: 0.15
};

// DOM要素
const elements = {
  lat: document.getElementById('lat'),
  lng: document.getElementById('lng'),
  radius: document.getElementById('radius'),
  strokeColor: document.getElementById('strokeColor'),
  fillColor: document.getElementById('fillColor'),
  opacity: document.getElementById('opacity'),
  opacityValue: document.getElementById('opacityValue'),
  save: document.getElementById('save')
};

console.log('[gm-radius-overlay] DOM elements:', elements);

// 保存された設定を読み込んでフォームに反映
chrome.storage.sync.get(['mapSettings'], (result) => {
  const settings = result.mapSettings || DEFAULT_SETTINGS;
  console.log('[gm-radius-overlay] Loading settings:', settings);
  
  elements.lat.value = settings.center.lat;
  elements.lng.value = settings.center.lng;
  elements.radius.value = settings.radius;
  elements.strokeColor.value = settings.strokeColor;
  elements.fillColor.value = settings.fillColor;
  elements.opacity.value = settings.opacity;
  elements.opacityValue.textContent = settings.opacity;
});

// 透明度スライダーの値を表示に反映
elements.opacity.addEventListener('input', (e) => {
  elements.opacityValue.textContent = e.target.value;
});

// 保存ボタンのクリックハンドラ
elements.save.addEventListener('click', () => {
  const settings = {
    center: {
      lat: parseFloat(elements.lat.value),
      lng: parseFloat(elements.lng.value)
    },
    radius: parseInt(elements.radius.value, 10),
    strokeColor: elements.strokeColor.value,
    fillColor: elements.fillColor.value,
    opacity: parseFloat(elements.opacity.value)
  };

  console.log('[gm-radius-overlay] Saving settings:', settings);

  // 設定を保存
  chrome.storage.sync.set({ mapSettings: settings }, () => {
    console.log('[gm-radius-overlay] Settings saved to storage');
    
    // 現在アクティブなタブにメッセージを送信
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        console.log('[gm-radius-overlay] Sending message to tab:', tabs[0].id);
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'SETTINGS_UPDATED',
          settings
        });
      }
    });
  });
});