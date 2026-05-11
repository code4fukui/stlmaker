# stlmaker

STL形式でカスタマイズ可能な3Dボックスモデルを生成するシンプルなウェブツールです。

## ライブデモ

**[https://code4fukui.github.io/stlmaker/](https://code4fukui.github.io/stlmaker/)**

インターフェースには、ボックスの幅、高さ、奥行きをセンチメートル単位で指定する入力フィールドが用意されています。ダウンロードボタンをクリックすると、対応する`box.stl`ファイルが生成され保存されます。

## 機能

-   **ブラウザ上で生成**: サーバー側の処理を必要とせず、ウェブブラウザ内で直接STLファイルを生成します。
-   **カスタマイズ可能な寸法**: ボックスモデルの幅、高さ、奥行きを簡単に設定できます。
-   **即時ダウンロード**: ワンクリックで`box.stl`ファイルを生成・ダウンロードできます。

## 使い方

1.  [デモページ](https://code4fukui.github.io/stlmaker/)を開きます。
2.  `width`（幅）、`height`（高さ）、`depth`（奥行き）のフィールドに希望する寸法を入力します。デフォルトの単位はセンチメートル（cm）です。
3.  **ダウンロード**ボタンをクリックします。
4.  `box.stl`ファイルがコンピューターに保存されます。

*注: 入力されたセンチメートル値は、最終的なSTLファイルではメートル単位に変換されます（例: `15`cmの入力は、モデル内では`0.15`単位になります）。*

## 依存関係

このツールは単一のHTMLファイルとして構築されており、以下のJavaScriptライブラリに依存しています:

-   [STL.js](https://github.com/code4fukui/STL/): 3DモデルのバイナリSTLデータを生成するために使用されます。
-   [downloadFile.js](https://js.sabae.cc/downloadFile.js): ブラウザからのファイルダウンロードを実行するためのユーティリティです。

## 関連情報

-   **STLファイル形式**: [Wikipedia記事](https://en.wikipedia.org/wiki/STL_(file_format))
-   **関連プロジェクト**: [box usdzmaker](https://code4fukui.github.io/usdzmaker)

## ライセンス

MIT License
