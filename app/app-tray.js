/**
 * Wechaty Electron
 */
const path    = require('path')
const Brolog  = require('brolog')
const {
  app
  , Menu
  , Tray
  , nativeImage
} = require('electron').remote

class AppTray {
  constructor({
    window
    , log = Brolog
  }) {
    this.log = log
    this.log.verbose('AppTray', 'constructor()')

    this.window = window
  }

  init() {
    this.log.verbose('AppTray', 'init()')

    this.initTrayWithIcon()
    this.initClickEvent()

    this.tray.setToolTip('Wechaty EPP')

    return this
  }

  initClickEvent() {
    this.log.verbose('AppTray', 'initClientEvent()')

    switch (process.platform) {
      case 'linux':
        const contextMenu = Menu.buildFromTemplate([
          {
            label: 'Hide/Show'
            , click: () => this.toggleWindowVisible()
          }
          , {
            label: 'Quit'
            , click: () => app.exit(0)
          }
        ])
        this.tray.setContextMenu(contextMenu)
        break

      default: // Linux platform has no `on('click')` event
        this.tray.on('click', () => this.toggleWindowVisible())
        break
    }

    return
  }

  /**
   * Setup Tray with Icon
   *
   *  cross platform manual - http://electron.rocks/proper-tray-icon
   *  image convert tool - https://iconverticons.com/online/
   *
   */
  initTrayWithIcon() {
    this.log.verbose('AppTray', 'initTrayWithIcon() for %s', process.platform)

    const iconPath = path.join(__dirname, '../resource/tray/')

    let iconFile
    switch (process.platform) {
      case 'linux':
        iconFile = 'icon-linux.png'
        break

      case 'darwin':
        iconFile = 'icon.png'
        break

      case 'win32':
        iconFile = 'icon@2x.png'
        break

      default:
        this.log.error('AppTray', 'initTrayWithIcon() unsupported platform: %s', process.platform)
        iconFile = 'icon@2x.png'
        break
    }
    const iconFilePath = path.join(iconPath, iconFile)
    const image = nativeImage.createFromPath(iconFilePath)
    image.setTemplateImage(true)

    const tray = new Tray(image)

    if (process.platform === 'darwin') {
      // TBD: tray.setPressedImage(
      //   path.join(iconPath, 'iconHighlight.png')
      // )
    }

    return this.tray = tray
  }

  toggleWindowVisible() {
    this.log.verbose('AppTray', 'toggleWindowVisible()')

    return this.window.isVisible()
            ? this.window.hide()
            : this.window.show()
  }
}

module.exports = AppTray
