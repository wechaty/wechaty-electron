// const fs = require('fs')

const Brolog = require('brolog')
const brolog = Brolog('SILLY')

const { IoBot } = require('wechaty')

// document.write(file)


brolog.info('Wechaty', 'Wechaty EPP Works!')


const ioBot = new IoBot({
  token: 'EPP'
  , log: brolog
})

ioBot.init()
    .then(_ => brolog.verbose('startIoBot()', 'init-ed'))
    .catch(e => {
      brolog.error('Bot', 'init() fail: %s', e)
      throw e
      // process.exit(-1)
    })
