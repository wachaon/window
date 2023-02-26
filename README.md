# windwo
*window* は [*wes*](https://github.com/wachaon/wes) でウインドウを操作するモジュールです。

## インストール

```bash
wes install @wachaon/window --bare
```

## コンパイル
*window* は付属のC#のソースコードをコンパイルせずに実行できますが、コンパイルすることで
より高速に動作可能になります。

```bash
wes window --compile
```

既定値ではコンパイルされた実行ファイルは *window.exe* としてカレントディレクトリに配置されます。
より高度なコンパイルが必要な場合は `csharpscript/compile(input, options)` を使用してください。

## `move(left, top, width, height)`

アクティブなウインドウの位置とサイズを変更します。

## `get()`

アクティブなウインドの位置とサイズをコンソールに表示します。
*window.exe* をコンパイルしないと使用できません。

```javascript
const { ger } = require('window')
get()
```

## `hwnd()`

アクティブなウインドのウインドウハンドルを取得します。

```javascript
const { hwnd } = require('window')
hwnd()
```

## `windowLeft()` `windowTop()` `windowWidth()` `windowHeight()`

アクティブなウインドの位置やサイズを個別に取得します。

```javascript
const { windowLeft, windowTop, windowWidth, windowHeight } = require('window')
console.log('left: %O top: %O width: %O height: %O', windowLeft, windowTop, windowWidth, windowHeight)
```
## `max` `min` `normal`

アクティブなウインドをそれぞれ「最大化」、「最小化」、「ノーマル」状態に移行します。

```javascript
const { max, min, normal } = require('window')
max()
normal()
min()
```

## `activateHandle(hWnd)`

ウインドウハンドル(`hWnd`) のウインドウをアクティブにします。
アクティブにしたウインドウが最小化されていたら、それは解除されます。

```javascript
const { activateHandle, hwnd } = require('window')

WShell.Run('notepad', 1, false)
WScript.Sleep(500)
const notepad = hwnd()
min()
activateHandle(notepad)
```

## `activateTitle`

ウインドウタイトルからウインドウをアクティブにします。
より確実にウインドウをアクティブにする為に実行ファイルがコンパイルされて居なくてもコンパイルしてから実行します。

```javascript
const { activateTitle } = require('window')

WShell.Run('notepad', 1, false)
WScript.Sleep(500)
min()
const title = '無題 - メモ帳'
activateTitle(title)
```
