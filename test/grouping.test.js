'use strict'

const { test, describe } = require('node:test')
const assert = require('node:assert')
const pino = require('pino')
const Console = require('../index.js')

describe('grouping methods', () => {
  let logs = []
  const logger = pino({
    level: 'info'
  }, {
    write: (chunk) => {
      logs.push(JSON.parse(chunk))
    }
  })
  const console = new Console(logger)

  test('group() and groupEnd()', () => {
    logs = []
    console.group('test group')
    console.log('inside group')
    console.groupEnd()

    assert.strictEqual(logs.length, 3)
    assert.strictEqual(logs[0].msg, '▼ test group')
    assert.strictEqual(logs[1].msg, 'inside group')
    assert.strictEqual(logs[2].msg, '▲ test group')
  })

  test('groupCollapsed()', () => {
    logs = []
    console.groupCollapsed('collapsed group')
    console.groupEnd()

    assert.strictEqual(logs.length, 2)
    assert.strictEqual(logs[0].msg, '▶ collapsed group')
    assert.strictEqual(logs[1].msg, '▲ collapsed group')
  })

  test('nested groups', () => {
    logs = []
    console.group('outer')
    console.group('inner')
    console.groupEnd()
    console.groupEnd()

    assert.strictEqual(logs.length, 4)
    assert.strictEqual(logs[0].msg, '▼ outer')
    assert.strictEqual(logs[1].msg, '▼ inner')
    assert.strictEqual(logs[2].msg, '▲ inner')
    assert.strictEqual(logs[3].msg, '▲ outer')
  })

  test('groupEnd() without group does nothing', () => {
    logs = []
    console.groupEnd()

    assert.strictEqual(logs.length, 0)
  })
})
