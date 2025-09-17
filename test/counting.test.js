'use strict'

const { test, describe } = require('node:test')
const assert = require('node:assert')
const pino = require('pino')
const Console = require('../index.js')

describe('counting methods', () => {
  let logs = []
  const logger = pino({
    level: 'info'
  }, {
    write: (chunk) => {
      logs.push(JSON.parse(chunk))
    }
  })
  const console = new Console(logger)

  test('count() increments counter', () => {
    logs = []
    console.count('test')
    console.count('test')

    assert.strictEqual(logs.length, 2)
    assert.strictEqual(logs[0].msg, 'test: 1')
    assert.strictEqual(logs[1].msg, 'test: 2')
  })

  test('countReset() resets counter', () => {
    logs = []
    console.count('reset-test')
    console.count('reset-test')
    console.countReset('reset-test')
    console.count('reset-test')

    assert.strictEqual(logs.length, 3)
    assert.strictEqual(logs[0].msg, 'reset-test: 1')
    assert.strictEqual(logs[1].msg, 'reset-test: 2')
    assert.strictEqual(logs[2].msg, 'reset-test: 1')
  })

  test('default counter label', () => {
    logs = []
    console.count()
    console.count()

    assert.strictEqual(logs.length, 2)
    assert.strictEqual(logs[0].msg, 'default: 1')
    assert.strictEqual(logs[1].msg, 'default: 2')
  })
})
