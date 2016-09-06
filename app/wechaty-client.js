// const fs = require('fs')

const Brolog = require('brolog')

const { IoClient } = require('wechaty')

// document.write(file)


brolog.info('Wechaty', 'Wechaty EPP starting...')


const client = new IoClient({
  token: 'EPP'
  , log: Brolog
})

client.init()
    .then(_ => brolog.verbose('startIoBot()', 'init-ed'))
    .catch(e => {
      brolog.error('Bot', 'init() fail: %s', e.message)
      throw e
      // process.exit(-1)
    })

module.exports = client
