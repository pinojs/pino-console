import { expectType, expectAssignable } from 'tsd'
import pino from 'pino'
import Console from '../index.js'

const logger = pino()
const console = new Console(logger)

// Constructor tests
expectType<Console>(new Console(logger))

// Console compatibility
expectAssignable<Console>(console)

// Core logging methods
expectType<void>(console.log())
expectType<void>(console.log('message'))
expectType<void>(console.log('message', 'arg1', 'arg2'))
expectType<void>(console.log('format %s %d', 'string', 42))

expectType<void>(console.info())
expectType<void>(console.info('message'))
expectType<void>(console.info('message', 'arg1', 'arg2'))

expectType<void>(console.warn())
expectType<void>(console.warn('message'))
expectType<void>(console.warn('message', 'arg1', 'arg2'))

expectType<void>(console.error())
expectType<void>(console.error('message'))
expectType<void>(console.error('message', 'arg1', 'arg2'))

expectType<void>(console.debug())
expectType<void>(console.debug('message'))
expectType<void>(console.debug('message', 'arg1', 'arg2'))

// Assertion methods
expectType<void>(console.assert(true))
expectType<void>(console.assert(false, 'message'))
expectType<void>(console.assert(false, 'format %s', 'arg'))

// Timing methods
expectType<void>(console.time())
expectType<void>(console.time('label'))

expectType<void>(console.timeEnd())
expectType<void>(console.timeEnd('label'))

expectType<void>(console.timeLog())
expectType<void>(console.timeLog('label'))
expectType<void>(console.timeLog('label', 'data1', 'data2'))

// Counting methods
expectType<void>(console.count())
expectType<void>(console.count('label'))

expectType<void>(console.countReset())
expectType<void>(console.countReset('label'))

// Grouping methods
expectType<void>(console.group())
expectType<void>(console.group('label'))
expectType<void>(console.group('label', 'arg1', 'arg2'))

expectType<void>(console.groupCollapsed())
expectType<void>(console.groupCollapsed('label'))
expectType<void>(console.groupCollapsed('label', 'arg1', 'arg2'))

expectType<void>(console.groupEnd())

// Display methods
expectType<void>(console.table([{ a: 1 }, { a: 2 }]))
expectType<void>(console.table([{ a: 1, b: 2 }], ['a']))
expectType<void>(console.table({ key: 'value' }))

expectType<void>(console.dir({}))
expectType<void>(console.dir({}, { depth: 2 }))

expectType<void>(console.dirxml())
expectType<void>(console.dirxml({}))
expectType<void>(console.dirxml({}, 'arg'))

expectType<void>(console.clear())

// Stack trace methods
expectType<void>(console.trace())
expectType<void>(console.trace('message'))
expectType<void>(console.trace('message', 'arg1', 'arg2'))

// Inspector methods (no-ops)
expectType<void>(console.profile())
expectType<void>(console.profile('label'))

expectType<void>(console.profileEnd())
expectType<void>(console.profileEnd('label'))

expectType<void>(console.timeStamp())
expectType<void>(console.timeStamp('label'))

// Properties
expectType<typeof Console>(console.Console)