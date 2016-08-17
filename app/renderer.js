var fs = require('fs')
var file = fs.readFileSync('./app/package.json')
document.write(file)

startIoBot()

function startIoBot() {
  const Brolog = require('brolog')
  const brolog = Brolog('SILLY')

  const IoBot = require('wechaty').IoBot

  const ioBot = new IoBot({
    profile: 'wechaty-epp'
    , head: 'chrome'
    , token: 'EPP'
    , log: brolog
  })

  return ioBot.init()
      .then(_ => brolog.verbose('startIoBot()', 'init-ed'))
      .catch(e => {
        brolog.error('Bot', 'init() fail: %s', e)
        ioBot.quit()
        // process.exit(-1)
      })
}
