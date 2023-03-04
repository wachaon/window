const WShell = require('WScript.Shell')

const {
    move,
    activateTitle,
    min,
    title
} = require('./index')

WShell.Run('notepad', 1, false)
move(100, 200, 900, 500)
WScript.Sleep(500)
min()
const name = '無題 - メモ帳'
activateTitle(name)
move(200, 200, 700, 400)

console.log(() => title())