'use strict'

const { test, describe } = require('node:test')
const assert = require('node:assert')
const pino = require('pino')
const Console = require('../index.js')

describe('inspector methods (no-ops)', () => {
  const logger = pino({ level: 'silent' })
  const console = new Console(logger)

  test('profile() is no-op', () => {
    // Should not throw
    console.profile()
    console.profile('test-profile')
    assert.ok(true)
  })

  test('profileEnd() is no-op', () => {
    // Should not throw
    console.profileEnd()
    console.profileEnd('test-profile')
    assert.ok(true)
  })

  test('timeStamp() is no-op', () => {
    // Should not throw
    console.timeStamp()
    console.timeStamp('test-timestamp')
    assert.ok(true)
  })
})
