'use strict'

const { test, describe } = require('node:test')
const assert = require('node:assert')
const pino = require('pino')
const Console = require('../index.js')

describe('trace method', () => {
  let logs = []

  test('trace() includes stack trace when debug enabled', () => {
    logs = []
    const logger = pino({
      level: 'debug'
    }, {
      write: (chunk) => {
        logs.push(JSON.parse(chunk))
      }
    })
    const console = new Console(logger)

    console.trace('test trace')

    assert.strictEqual(logs.length, 1)
    assert.strictEqual(logs[0].level, 20) // debug level
    assert.strictEqual(logs[0].msg, 'test trace')
    assert.ok(logs[0].trace)
    assert.match(logs[0].trace, /at.*trace\.test\.js/)
  })

  test('trace() is skipped when debug disabled', () => {
    logs = []
    const logger = pino({
      level: 'info' // debug disabled
    }, {
      write: (chunk) => {
        logs.push(JSON.parse(chunk))
      }
    })
    const console = new Console(logger)

    console.trace('test trace')

    assert.strictEqual(logs.length, 0)
  })

  test('trace() without message uses default', () => {
    logs = []
    const logger = pino({
      level: 'debug'
    }, {
      write: (chunk) => {
        logs.push(JSON.parse(chunk))
      }
    })
    const console = new Console(logger)

    console.trace()

    assert.strictEqual(logs.length, 1)
    assert.strictEqual(logs[0].msg, 'Trace')
  })
})
