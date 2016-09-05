// const fs = require('fs')

const Brolog = require('brolog')
const brolog = Brolog('SILLY')

const { IoClient } = require('wechaty')

// document.write(file)


brolog.info('Wechaty', 'Wechaty EPP starting...')


const client = new IoClient({
  token: 'EPP'
  , log: brolog
})

client.init()
    .then(_ => brolog.verbose('startIoBot()', 'init-ed'))
    .catch(e => {
      brolog.error('Bot', 'init() fail: %s', e.message)
      throw e
      // process.exit(-1)
    })
