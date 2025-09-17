'use strict'

const { test, describe } = require('node:test')
const assert = require('node:assert')
const pino = require('pino')
const Console = require('../index.js')

describe('timing methods', () => {
  let logs = []
  const logger = pino({
    level: 'info'
  }, {
    write: (chunk) => {
      logs.push(JSON.parse(chunk))
    }
  })
  const console = new Console(logger)

  test('time() and timeEnd()', (t) => {
    logs = []
    console.time('test')
    console.timeEnd('test')

    assert.strictEqual(logs.length, 1)
    assert.match(logs[0].msg, /^test: \d+\.\d+ms$/)
  })

  test('timeEnd() with non-existent timer', () => {
    logs = []
    console.timeEnd('nonexistent')

    assert.strictEqual(logs.length, 1)
    assert.strictEqual(logs[0].level, 40) // warn level
    assert.strictEqual(logs[0].msg, "Timer 'nonexistent' does not exist")
  })

  test('timeLog() with existing timer', () => {
    logs = []
    console.time('testLog')
    console.timeLog('testLog', 'checkpoint')

    assert.strictEqual(logs.length, 1)
    assert.match(logs[0].msg, /^testLog: \d+\.\d+ms checkpoint$/)
  })

  test('timeLog() with non-existent timer', () => {
    logs = []
    console.timeLog('nonexistent')

    assert.strictEqual(logs.length, 1)
    assert.strictEqual(logs[0].level, 40) // warn level
    assert.strictEqual(logs[0].msg, "Timer 'nonexistent' does not exist")
  })

  test('default timer label', () => {
    logs = []
    console.time()
    console.timeEnd()

    assert.strictEqual(logs.length, 1)
    assert.match(logs[0].msg, /^default: \d+\.\d+ms$/)
  })
})
