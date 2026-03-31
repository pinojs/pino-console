import pino from 'pino'
import { expect, test } from 'tstyche'

import type Console from '../index.js'
import ConsoleDefault from '../index.js'
import ConsoleCjsImport = require('../index.js')

const logger = pino()

test('exports', () => {
  expect(new ConsoleDefault(logger)).type.toBe<Console>()
  expect(new ConsoleCjsImport(logger)).type.toBe<Console>()
})
