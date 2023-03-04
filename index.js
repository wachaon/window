const { existsFileSync, deleteFileSync } = require('filesystem')
const { resolve } = require('pathname')
const { execCommand } = require('utility')
const argv = require('argv')
const isCLI = require('isCLI')
const { execScript, compile } = require('csharpscript')

// window
const window_cs = resolve(__dirname, 'src/window.cs')
const window_exe = resolve(__dirname, 'window.exe')
const exists_window_exe = existsFileSync(window_exe)
const window = 'window'
const Main = 'Main'

// window method
function move(left = 0, top = 0, width = 100, height = 100) {
    if (exists_window_exe) execCommand(`${window_exe} move ${left} ${top} ${width} ${height}`)
    else execScript(window_cs, window, Main, 'move', left, top, width, height)
}

function get() {
    if (exists_window_exe) return execCommand(`${window_exe} get`)
    else execScript(window_cs, window, Main, 'get', 0, 0, 0, 0)
}

function hwnd() {
    if (exists_window_exe) return execCommand(`${window_exe} hwnd`)
    else return execScript(window_cs, window, Main, 'hwnd', 0, 0, 0, 0)
}

function windowLeft() {
    if (exists_window_exe) return execCommand(`${window_exe} windowLeft`)
    else return execScript(window_cs, window, Main, 'windowLeft', 0, 0, 0, 0)
}

function windowTop() {
    if (exists_window_exe) return execCommand(`${window_exe} windowTop`)
    else return execScript(window_cs, window, Main, 'windowTop', 0, 0, 0, 0)
}

function windowWidth() {
    if (exists_window_exe) return execCommand(`${window_exe} windowWidth`)
    else return execScript(window_cs, window, Main, 'windowWidth', 0, 0, 0, 0)
}

function windowHeight() {
    if (exists_window_exe) return execCommand(`${window_exe} windowHeight`)
    else return execScript(window_cs, window, Main, 'windowHeight', 0, 0, 0, 0)
}

function max() {
    if (exists_window_exe) execCommand(`${window_exe} max`)
    else execScript(window_cs, window, Main, 'max', 0, 0, 0, 0)
}

function min() {
    if (exists_window_exe) execCommand(`${window_exe} min`)
    else execScript(window_cs, window, Main, 'min', 0, 0, 0, 0)
}

function normal() {
    if (exists_window_exe) execCommand(`${window_exe} normal`)
    else execScript(window_cs, window, Main, 'normal', 0, 0, 0, 0)
}

function activateTitle(title) {
    if (exists_window_exe) execCommand(`${window_exe} activateTitle "${title}"`)
    // else ps(window_cs, ['activateTitle', title, 0, 0, 0])
    else {
        compile(window_cs, { out: window_exe })
        execCommand(`${window_exe} activateTitle "${title}"`)
        WScript.Sleep(1)
        deleteFileSync(window_exe)
    }
}

function activateHandle(hWnd) {
    if (exists_window_exe) execCommand(`${window_exe} activateHandle ${hWnd}`)
    else execScript(window_cs, window, Main, 'activateHandle', hWnd, 0, 0, 0)
}

function title() {
    if (exists_window_exe) execCommand(`${window_exe} title`)
    else execScript(window_cs, window, Main, 'title', 0, 0, 0, 0)
}

if (isCLI(__filename)) {
    if (argv.get('c') || argv.get('compile') || argv.unnamed[1] === 'compile') console.log(compile(window_cs, { out: window_exe }))
} else module.exports = {
    move,
    get,
    hwnd,
    windowLeft,
    windowTop,
    windowWidth,
    windowHeight,
    max,
    min,
    normal,
    activateTitle,
    activateHandle,
    title
}