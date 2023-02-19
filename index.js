const { readFileSync, existsFileSync, deleteFileSync } = require('filesystem')
const { resolve, basename, extname } = require('pathname')
const { execCommand } = require('utility')
const ps = require('ps')

// window
const window_cs = generate('src/window.cs', 5)
const window_exe = resolve(__dirname, 'window.exe')
const exists_window_exe = existsFileSync(window_exe)

// window method
function move(left = 0, top = 0, width = 100, height = 100) {
    if (exists_window_exe) execCommand(`${window_exe} move ${left} ${top} ${width} ${height}`)
    else ps(window_cs, ['move', left, top, width, height])
}

function get() {
    if (exists_window_exe) return execCommand(`${window_exe} get`)
    else return ps(window_cs, ['get', 0, 0, 0, 0])
}

function hwnd() {
    if (exists_window_exe) return execCommand(`${window_exe} hwnd`)
    else return ps(window_cs, ['hwnd', 0, 0, 0, 0])
}

function windowLeft() {
    if (exists_window_exe) return execCommand(`${window_exe} windowLeft`)
    else return ps(window_cs, ['windowLeft', 0, 0, 0, 0])
}

function windowTop() {
    if (exists_window_exe) return execCommand(`${window_exe} windowTop`)
    else return ps(window_cs, ['windowTop', 0, 0, 0, 0])
}

function windowWidth() {
    if (exists_window_exe) return execCommand(`${window_exe} windowWidth`)
    else return ps(window_cs, ['windowWidth', 0, 0, 0, 0])
}

function windowHeight() {
    if (exists_window_exe) return execCommand(`${window_exe} windowHeight`)
    else return ps(window_cs, ['windowHeight', 0, 0, 0, 0])
}

function max() {
    if (exists_window_exe) execCommand(`${window_exe} max`)
    else ps(window_cs, ['max', 0, 0, 0, 0])
}

function min() {
    if (exists_window_exe) execCommand(`${window_exe} min`)
    else ps(window_cs, ['min', 0, 0, 0, 0])
}

function normal() {
    if (exists_window_exe) execCommand(`${window_exe} normal`)
    else ps(window_cs, ['normal', 0, 0, 0, 0])
}

function activateTitle(title) {
    if (exists_window_exe) execCommand(`${window_exe} activateTitle "${title}"`)
    // else ps(window_cs, ['activateTitle', title, 0, 0, 0])
    else {
        require('./src/compile')('src/window.cs')
        execCommand(`${window_exe} activateTitle "${title}"`)
        WScript.Sleep(1)
        deleteFileSync(window_exe)
    }
}

function activateHandle(hWnd) {
    if (exists_window_exe) execCommand(`${window_exe} activateHandle ${hWnd}`)
    else ps(window_cs, ['activateHandle', hWnd, 0, 0, 0])
}

function generate(spec, len = 0) {
    const file = resolve(__dirname, spec)
    const program = basename(file, extname(file))
    const args = len ? (new Array(len)).fill(0).map((arg, i) => `$args[${i}]`).join(', ') : ''
    const source = readFileSync(file, 'auto')
    const code = `$Source = @"
${source}"@

Add-Type -Language CSharp -TypeDefinition $Source
[${program}]::Main(${args})`
    return code
}

module.exports = {
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
    activateHandle
}