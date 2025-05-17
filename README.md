# gm-radius-overlay

## これ何？

埋め込まれたGoogle Mapにオーバーレイで円を表示するChrome拡張機能です。
近距離手当の対象となる物件を探すケースなど、特定の箇所から⚪︎km圏内を表示したいときにどうぞ。

## 使い方

### 拡張機能を読み込む

本リポジトリの`ChromeExtension`ディレクトリを指定してください。
または、`ChromeExtension.crx`ファイルを読み込ませてください。

### 動かす

1. 任意のGoogle Mapを埋め込んだサイトに移動
2. 拡張機能をクリックし、座標などを設定する(デフォルトでは東京駅周辺が設定されています)
3. Google Mapを設定した座標まで動かすと円が表示される

## その他

開発の過程で[Tampermonkey](https://www.tampermonkey.net/)用のスクリプト（script.js）も作成しています。
google mapが埋め込まれたサイトで実行してください。