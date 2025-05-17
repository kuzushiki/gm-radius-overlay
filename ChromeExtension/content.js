/* global chrome */

// inject.jsをページに挿入
const script = document.createElement('script');
script.src = chrome.runtime.getURL('inject.js');
(document.head || document.documentElement).appendChild(script);
script.onload = () => script.remove();

// 保存された設定を読み込む
chrome.storage.sync.get(['mapSettings'], (result) => {
  if (result.mapSettings) {
    // ページのスクリプトに設定を渡す
    const event = new CustomEvent('GM_RADIUS_SETTINGS_UPDATED', {
      detail: result.mapSettings
    });
    document.dispatchEvent(event);
  }
});

// 設定更新メッセージを受け取る
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'SETTINGS_UPDATED') {
    // ページのスクリプトに設定を渡す
    const event = new CustomEvent('GM_RADIUS_SETTINGS_UPDATED', {
      detail: message.settings
    });
    document.dispatchEvent(event);
  }
});