/**
 * Wechaty - Wechat for Bot, Connecting ChatBots. Chat as a Service
 *
 * https://github.com/wechaty
 *
 * Electron Main
 *
 */
const {
  BrowserWindow
  , app
  , Menu
  , Tray
} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null
let appTray = null

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', e => {
  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

/**
 * add node_modules search directory for app
 */
var path = require('path')

var devMode = (process.argv || []).indexOf('--dev') !== -1

if (devMode) {
  console.log('devMode!!!!!!!!!!!!!!')
  // load the app dependencies
  var PATH_APP_NODE_MODULES = path.join(__dirname, 'node_modules')
  require('module').globalPaths.push(PATH_APP_NODE_MODULES)

  const PATH_APP_NODE_MODULES_BIN = path.join(__dirname, 'node_modules/.bin')
  process.env.PATH = process.env.PATH + ':' + PATH_APP_NODE_MODULES_BIN
}


