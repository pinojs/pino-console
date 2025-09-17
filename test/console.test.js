'use strict'

const { test, describe } = require('node:test')
const assert = require('node:assert')
const pino = require('pino')
const Console = require('../index.js')

describe('Console constructor', () => {
  test('should create console instance with pino logger', () => {
    const logger = pino({ level: 'silent' })
    const console = new Console(logger)

    assert.ok(console instanceof Console)
    assert.strictEqual(typeof console.log, 'function')
    assert.strictEqual(typeof console.info, 'function')
    assert.strictEqual(typeof console.warn, 'function')
    assert.strictEqual(typeof console.error, 'function')
    assert.strictEqual(typeof console.debug, 'function')
  })

  test('should throw TypeError if logger is not provided', () => {
    assert.throws(() => new Console(), TypeError, 'logger is required')
    assert.throws(() => new Console(null), TypeError, 'logger is required')
    assert.throws(() => new Console({}), TypeError, 'logger is required')
  })
})

describe('basic logging methods', () => {
  let logs = []
  const logger = pino({
    level: 'trace'
  }, {
    write: (chunk) => {
      logs.push(JSON.parse(chunk))
    }
  })
  const console = new Console(logger)

  test('log() should map to pino.info()', () => {
    logs = []
    console.log('test message')

    assert.strictEqual(logs.length, 1)
    assert.strictEqual(logs[0].level, 30) // info level
    assert.strictEqual(logs[0].msg, 'test message')
  })

  test('info() should map to pino.info()', () => {
    logs = []
    console.info('info message')

    assert.strictEqual(logs.length, 1)
    assert.strictEqual(logs[0].level, 30) // info level
    assert.strictEqual(logs[0].msg, 'info message')
  })

  test('warn() should map to pino.warn()', () => {
    logs = []
    console.warn('warning message')

    assert.strictEqual(logs.length, 1)
    assert.strictEqual(logs[0].level, 40) // warn level
    assert.strictEqual(logs[0].msg, 'warning message')
  })

  test('error() should map to pino.error()', () => {
    logs = []
    console.error('error message')

    assert.strictEqual(logs.length, 1)
    assert.strictEqual(logs[0].level, 50) // error level
    assert.strictEqual(logs[0].msg, 'error message')
  })

  test('debug() should map to pino.debug()', () => {
    logs = []
    console.debug('debug message')

    assert.strictEqual(logs.length, 1)
    assert.strictEqual(logs[0].level, 20) // debug level
    assert.strictEqual(logs[0].msg, 'debug message')
  })
})

describe('format specifiers', () => {
  let logs = []
  const logger = pino({
    level: 'info'
  }, {
    write: (chunk) => {
      logs.push(JSON.parse(chunk))
    }
  })
  const console = new Console(logger)

  test('should support %s string formatting', () => {
    logs = []
    console.log('User %s logged in', 'Alice')

    assert.strictEqual(logs.length, 1)
    assert.strictEqual(logs[0].msg, 'User Alice logged in')
  })

  test('should support %d integer formatting', () => {
    logs = []
    console.log('Count: %d', 42)

    assert.strictEqual(logs.length, 1)
    assert.strictEqual(logs[0].msg, 'Count: 42')
  })

  test('should support %% literal percent', () => {
    logs = []
    console.log('Progress: 50%%')

    assert.strictEqual(logs.length, 1)
    assert.strictEqual(logs[0].msg, 'Progress: 50%')
  })
})
