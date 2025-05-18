# gm-radius-overlay

[English](#english) | [日本語](#japanese)

<a id="japanese"></a>

## これ何？

任意のウェブサイトに埋め込まれた Google Maps 上に、半径 ● m の円（オーバーレイ）を描画できる Chrome 拡張機能です。
「会社から ● km 圏内の物件だけを可視化したい」場合などにご活用ください。

### 特徴

- あらゆるGoogle Map埋め込みサイトで動作（するはず）
- 設定はブラウザ間で同期
- カスタマイズ可能な表示オプション：
  - 中心座標（緯度・経度）
  - 円の半径（メートル単位）
  - 円の線の色
  - 円の塗りつぶし色
  - 透明度（0-1の範囲で調整可能）

### 使い方

#### 拡張機能を読み込む

以下のいずれかの方法で拡張機能をChromeに読み込ませてください：

1. 開発者モードを使用する場合：
   - Chromeの拡張機能ページ（chrome://extensions/）を開く
   - 「デベロッパーモード」を有効化
   - 「パッケージ化されていない拡張機能を読み込む」をクリック
   - 本リポジトリの`ChromeExtension`ディレクトリを選択

2. パッケージ化された拡張機能を使用する場合：
   - 本リポジトリの`ChromeExtension.crx`ファイルをChromeにドラッグ&ドロップ

#### 動かす

1. 任意のGoogle Mapを埋め込んだサイトに移動
2. 拡張機能のアイコンをクリックし、設定パネルを開く
3. 以下の項目を設定（デフォルトでは東京駅周辺が設定されています）：
   - 中心座標：表示したい円の中心点の緯度・経度
   - 半径：円の大きさ（メートル単位）
   - 線の色：円の外周の色
   - 塗りつぶしの色：円の内部の色
   - 透明度：塗りつぶしの透明度
4. 「保存」ボタンをクリック
5. Google Mapを設定した座標まで移動すると円が表示される

設定は自動的にブラウザに保存され、次回も同じ設定が使用されます。

### Tampermonkeyスクリプトについて

開発の過程で[Tampermonkey](https://www.tampermonkey.net/)用のスクリプト（`tampermonkey/script.js`）も作成しています。
Chrome拡張機能をインストールせずに機能を試したい場合は、このスクリプトを使用してください。

スクリプトの特徴：

- 軽量で単一ファイル
- カスタマイズ可能な設定項目（スクリプト内のコメント参照）
- Chrome拡張機能と同様の基本機能

#### Tampermonkeyスクリプトの使用方法

1. [Tampermonkey](https://www.tampermonkey.net/)をChromeにインストール
2. 新規スクリプトを作成
3. `tampermonkey/script.js`の内容をコピー&ペースト
4. 必要に応じて設定項目（中心座標、半径、色など）を編集
5. 保存して有効化
6. Google Mapが埋め込まれたサイトで動作を確認

---

<a id="english"></a>

## What is this?

This is a Chrome extension that allows you to draw a circle (overlay) with a radius of ● m on Google Maps embedded in any website.
You can use this when you want to visualize only the properties within ● km from your office.

### Features

- Works on any website with embedded Google Maps
- Settings sync across browsers
- Customizable display options:
  - Center coordinates (latitude & longitude)
  - Circle radius (in meters)
  - Circle stroke color
  - Circle fill color
  - Opacity (adjustable from 0-1)

### How to Use

#### Loading the Extension

You can load the extension into Chrome using either of these methods:

1. Using Developer Mode:
   - Open Chrome's extensions page (chrome://extensions/)
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `ChromeExtension` directory from this repository

2. Using Packaged Extension:
   - Drag and drop the `ChromeExtension.crx` file from this repository into Chrome

#### Operation

1. Navigate to any site with an embedded Google Map
2. Click the extension icon to open the settings panel
3. Configure the following options (default is set to Tokyo Station area):
   - Center coordinates: latitude and longitude of the circle's center point
   - Radius: size of the circle in meters
   - Stroke color: color of the circle's outline
   - Fill color: color of the circle's interior
   - Opacity: transparency of the fill color
4. Click the "Save" button
5. Move the Google Map to your configured coordinates to display the circle

Settings are automatically saved to your browser and will be reused in future sessions.

### About the Tampermonkey Script

A [Tampermonkey](https://www.tampermonkey.net/) script (`tampermonkey/script.js`) was also created during development.
You can use this script if you want to try the functionality without installing the Chrome extension.

Script features:

- Lightweight single file
- Customizable settings (see comments in script)
- Same core functionality as the Chrome extension

#### How to Use the Tampermonkey Script

1. Install [Tampermonkey](https://www.tampermonkey.net/) in Chrome
2. Create a new script
3. Copy & paste the contents of `tampermonkey/script.js`
4. Edit the settings (center coordinates, radius, colors, etc.) as needed
5. Save and enable the script
6. Test on any site with embedded Google Maps
