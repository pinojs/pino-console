'use strict'

const { test, describe } = require('node:test')
const assert = require('node:assert')
const pino = require('pino')
const Console = require('../index.js')

describe('assertion methods', () => {
  let logs = []
  const logger = pino({
    level: 'info'
  }, {
    write: (chunk) => {
      logs.push(JSON.parse(chunk))
    }
  })
  const console = new Console(logger)

  test('assert() with truthy condition does nothing', () => {
    logs = []
    console.assert(true, 'should not log')
    console.assert(1, 'should not log')
    console.assert('string', 'should not log')

    assert.strictEqual(logs.length, 0)
  })

  test('assert() with falsy condition logs error', () => {
    logs = []
    console.assert(false, 'assertion failed')

    assert.strictEqual(logs.length, 1)
    assert.strictEqual(logs[0].level, 50) // error level
    assert.strictEqual(logs[0].msg, 'Assertion failed: assertion failed')
  })

  test('assert() without message', () => {
    logs = []
    console.assert(false)

    assert.strictEqual(logs.length, 1)
    assert.strictEqual(logs[0].level, 50) // error level
    assert.strictEqual(logs[0].msg, 'Assertion failed')
  })

  test('assert() with multiple arguments', () => {
    logs = []
    console.assert(false, 'test', 'failed', 'badly')

    assert.strictEqual(logs.length, 1)
    assert.strictEqual(logs[0].msg, 'Assertion failed: test failed badly')
  })
})
