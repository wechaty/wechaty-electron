/**
 * Wechaty
 *
 */
const path = require('path')

const Config = {
  GITHUB: {
    HOME:     'https://github.com/wechaty/wechaty'
    , ISSUES: 'https://github.com/wechaty/wechaty/issues'
    , WIKI:   'https://github.com/wechaty/wechaty/wiki'
  }
}

module.exports = Config.default = Config.Config = Config
