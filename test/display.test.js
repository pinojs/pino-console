'use strict'

const { test, describe } = require('node:test')
const assert = require('node:assert')
const pino = require('pino')
const Console = require('../index.js')

describe('display methods', () => {
  let logs = []
  const logger = pino({
    level: 'info'
  }, {
    write: (chunk) => {
      logs.push(JSON.parse(chunk))
    }
  })
  const console = new Console(logger)

  test('table() with array of objects', () => {
    logs = []
    const data = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 }
    ]
    console.table(data)

    assert.strictEqual(logs.length, 1)
    assert.ok(logs[0].msg.includes('Table:'))
    assert.ok(logs[0].msg.includes('Alice'))
    assert.ok(logs[0].msg.includes('Bob'))
  })

  test('table() with object', () => {
    logs = []
    console.table({ a: 1, b: 2 })

    assert.strictEqual(logs.length, 1)
    assert.ok(logs[0].msg.includes('Table:'))
  })

  test('table() with primitive', () => {
    logs = []
    console.table('simple string')

    assert.strictEqual(logs.length, 1)
    assert.strictEqual(logs[0].msg, 'Table: simple string')
  })

  test('dir() inspects object', () => {
    logs = []
    console.dir({ name: 'test', value: 123 })

    assert.strictEqual(logs.length, 1)
    assert.ok(logs[0].msg.includes('name'))
    assert.ok(logs[0].msg.includes('test'))
  })

  test('dir() with options', () => {
    logs = []
    console.dir({ deep: { nested: 'value' } }, { depth: 1 })

    assert.strictEqual(logs.length, 1)
    assert.ok(logs[0].msg.includes('deep'))
  })

  test('dirxml() calls dir()', () => {
    logs = []
    console.dirxml({ xml: 'like' }, { more: 'data' })

    assert.strictEqual(logs.length, 2)
    assert.ok(logs[0].msg.includes('xml'))
    assert.ok(logs[1].msg.includes('more'))
  })

  test('clear() logs clear indicator', () => {
    logs = []
    console.clear()

    assert.strictEqual(logs.length, 1)
    assert.strictEqual(logs[0].msg, '--- Console Clear ---')
  })
})
