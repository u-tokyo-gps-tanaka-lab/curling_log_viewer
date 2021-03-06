# curling_log_viewer
------
## 概要

電気通信大学エンターテイメントと認知科学研究ステーション (http://entcog.c.ooco.jp/entcog/) が中心となって運営しているデジタルカーリング大会 (http://minerva.cs.uec.ac.jp/curling/wiki.cgi) のログをブラウザ上で表示するためのプログラムです．

-------
## python3 版
### インストール

python3の標準的なライブラリ以外に，Bottle (http://bottlepy.org/docs/dev/index.html) というWeb Framework を使っています．

 pip install bottle

でインストール可能なはずです．

-------
### 使い方

pythonで書かれた簡易Webサーバ(標準ではポート 8080 で待ち受ける)を起動します．

 ./server/bottle_viewer.py [-p port] log_top_directory

その後，Webブラウザで「http://localhost:8080/viewer/」のように接続します．簡易Webサーバのポートを8080から変更している時は，URLの「8080」の部分を変更する必要があります．

後は，ディレクトリを移動して拡張子「.dcl」のファイルを開くと，viewerのページに移行します．

「Curling viewer」の画面では，以下のボタンで操作が可能です．
- [<<<] ゲーム開始時に戻る
- [<<] エンド開始時に戻る．エンド開始時に押された場合は一つ前のエンド開始時に戻る．
- [<] 前のストーンに戻る．
- [>] 次のストーンに進む．
- [>>] エンド終了時まで進む．エンド終了時に押された場合は次のエンド終了時に進む．
- [>>>] ゲーム終了時まで進む

![viewer画面](https://github.com/u-tokyo-gps-tanaka-lab/curling_log_viewer/blob/images/viewer_sample.png)

------
## Node.js 版
### インストール
Node.jsおよびそのパッケージシステムである npmが使えるというのが前提になります．インストールは node_serverのディレクトリに移動して

 npm install 

を実行するだけで終わるはずです．その後，

 node app.js [-p port] log_top_directory

で起動してください．後は，Python3 版と同じです．

-------
## 注意
- ログファイルの形式はドキュメント化されているわけではないので，第2回UEC杯のログを扱えるようプログラムにはなっていますが，今後のログに関しても扱えることを保証するものではありません．
- 表示される軌跡は，淡い色が対戦プログラムの出力通りの軌跡，濃い色が乱数が加わった軌跡のつもりです．初速から予想される対数螺旋を描いたものなので，対戦に使われたシミュレータと同一の軌跡ではありません．
