/**
 * Wechaty Electron
 *
 */
const {
  Menu
  , app
  , shell
  , ipcRenderer
} = require('electron').remote

const Config = require("./config")

class AppMenu {
  constructor() {
  }

  init() {
    let template = this.getTemplate()
    if (template) {
      let menu = Menu.buildFromTemplate(template)
      Menu.setApplicationMenu(menu)
    }
    return Promise.resolve(this)
  }

  getTemplate(platform) {
    const name = app.getName()

    const menuTemplate = [
      {
        label: 'Wechaty',
        submenu: [
          {
            label: 'About Wechaty',
            selector: 'orderFrontStandardAboutPanel:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: AppMenu.quit
          }
        ]
      },
      {
        label: 'Help'
        , submenu: [
          {
            label: 'GitHub Repository'
            , click: AppMenu.github
          }
          , {
            type: 'separator'
          }
          , {
            label: 'Issues'
            , click: AppMenu.githubIssues
          }
          , {
            label: 'Documentation'
            , click: AppMenu.githubWiki
          }
          /*, {
            label: 'Check for New Release',
            click: AppMenu.checkUpdate
          }*/
        ]
      }
    ];
    return menuTemplate
  }

  static quit() {
    app.exit(0)
  }

  static github() {
    shell.openExternal(Config.GITHUB.HOME)
  }

  static githubIssues() {
    shell.openExternal(Config.GITHUB.ISSUES)
  }

  static githubWiki() {
    shell.openExternal(Config.GITHUB.WIKI)
  }

  static checkUpdate() {
    ipcRenderer.send('update')
  }
}
module.exports = AppMenu
