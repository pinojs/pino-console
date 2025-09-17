'use strict'

const { test, describe } = require('node:test')
const assert = require('node:assert')
const pino = require('pino')
const Console = require('../index.js')

describe('level filtering', () => {
  test('respects logger level settings', () => {
    const logs = []
    const logger = pino({
      level: 'warn' // Only warn and error should be logged
    }, {
      write: (chunk) => {
        logs.push(JSON.parse(chunk))
      }
    })
    const console = new Console(logger)

    // These should be filtered out
    console.debug('debug message')
    console.log('info message')
    console.info('info message')

    // These should be logged
    console.warn('warning message')
    console.error('error message')

    assert.strictEqual(logs.length, 2)
    assert.strictEqual(logs[0].level, 40) // warn
    assert.strictEqual(logs[1].level, 50) // error
  })

  test('level filtering affects complex operations', () => {
    const logs = []
    const logger = pino({
      level: 'warn'
    }, {
      write: (chunk) => {
        logs.push(JSON.parse(chunk))
      }
    })
    const console = new Console(logger)

    // trace() should be skipped entirely when debug is disabled
    console.trace('this should not appear')

    // time operations at info level should be skipped
    console.time('test')
    console.timeEnd('test')

    assert.strictEqual(logs.length, 0)
  })
})
