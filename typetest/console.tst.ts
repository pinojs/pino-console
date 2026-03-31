import pino from 'pino'
import { expect, test } from 'tstyche'

import Console from '../index.js'

const logger = pino()
const console = new Console(logger)

test('Console constructor', () => {
  expect(new Console(logger)).type.toBe<Console>()
  expect(console).type.toBeAssignableTo<Console>()
})

test('core logging methods', () => {
  expect(console.log()).type.toBe<void>()
  expect(console.log('message')).type.toBe<void>()
  expect(console.log('message', 'arg1', 'arg2')).type.toBe<void>()
  expect(console.log('format %s %d', 'string', 42)).type.toBe<void>()

  expect(console.info()).type.toBe<void>()
  expect(console.info('message')).type.toBe<void>()
  expect(console.info('message', 'arg1', 'arg2')).type.toBe<void>()

  expect(console.warn()).type.toBe<void>()
  expect(console.warn('message')).type.toBe<void>()
  expect(console.warn('message', 'arg1', 'arg2')).type.toBe<void>()

  expect(console.error()).type.toBe<void>()
  expect(console.error('message')).type.toBe<void>()
  expect(console.error('message', 'arg1', 'arg2')).type.toBe<void>()

  expect(console.debug()).type.toBe<void>()
  expect(console.debug('message')).type.toBe<void>()
  expect(console.debug('message', 'arg1', 'arg2')).type.toBe<void>()
})

test('assertion methods', () => {
  expect(console.assert(true)).type.toBe<void>()
  expect(console.assert(false, 'message')).type.toBe<void>()
  expect(console.assert(false, 'format %s', 'arg')).type.toBe<void>()
})

test('timing methods', () => {
  expect(console.time()).type.toBe<void>()
  expect(console.time('label')).type.toBe<void>()

  expect(console.timeEnd()).type.toBe<void>()
  expect(console.timeEnd('label')).type.toBe<void>()

  expect(console.timeLog()).type.toBe<void>()
  expect(console.timeLog('label')).type.toBe<void>()
  expect(console.timeLog('label', 'data1', 'data2')).type.toBe<void>()
})

test('counting methods', () => {
  expect(console.count()).type.toBe<void>()
  expect(console.count('label')).type.toBe<void>()

  expect(console.countReset()).type.toBe<void>()
  expect(console.countReset('label')).type.toBe<void>()
})

test('grouping methods', () => {
  expect(console.group()).type.toBe<void>()
  expect(console.group('label')).type.toBe<void>()
  expect(console.group('label', 'arg1', 'arg2')).type.toBe<void>()

  expect(console.groupCollapsed()).type.toBe<void>()
  expect(console.groupCollapsed('label')).type.toBe<void>()
  expect(console.groupCollapsed('label', 'arg1', 'arg2')).type.toBe<void>()

  expect(console.groupEnd()).type.toBe<void>()
})

test('display methods', () => {
  expect(console.table([{ a: 1 }, { a: 2 }])).type.toBe<void>()
  expect(console.table([{ a: 1, b: 2 }], ['a'])).type.toBe<void>()
  expect(console.table({ key: 'value' })).type.toBe<void>()

  expect(console.dir({})).type.toBe<void>()
  expect(console.dir({}, { depth: 2 })).type.toBe<void>()

  expect(console.dirxml()).type.toBe<void>()
  expect(console.dirxml({})).type.toBe<void>()
  expect(console.dirxml({}, 'arg')).type.toBe<void>()

  expect(console.clear()).type.toBe<void>()
})

test('trace methods', () => {
  expect(console.trace()).type.toBe<void>()
  expect(console.trace('message')).type.toBe<void>()
  expect(console.trace('message', 'arg1', 'arg2')).type.toBe<void>()
})

test('inspector methods (no-ops)', () => {
  expect(console.profile()).type.toBe<void>()
  expect(console.profile('label')).type.toBe<void>()

  expect(console.profileEnd()).type.toBe<void>()
  expect(console.profileEnd('label')).type.toBe<void>()

  expect(console.timeStamp()).type.toBe<void>()
  expect(console.timeStamp('label')).type.toBe<void>()
})

test('properties', () => {
  expect(console.Console).type.toBe(Console)
})
