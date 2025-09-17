# pino-console

A [WHATWG Console API](https://console.spec.whatwg.org/) adapter for Pino loggers that provides full Node.js Console interface compatibility with structured JSON logging.

[![npm version](https://img.shields.io/npm/v/pino-console.svg)](https://www.npmjs.com/package/pino-console)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/pino-console.svg)](https://nodejs.org/)

## Quick Start

```bash
npm install pino-console pino
```

```javascript
import pino from 'pino'
import Console from 'pino-console'

const logger = pino()
const console = new Console(logger)

console.log('Hello, structured logging!')
// Output: {"level":30,"time":1234567890,"pid":1234,"hostname":"host","msg":"Hello, structured logging!"}
```

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [TypeScript Support](#typescript-support)
- [Examples](#examples)
- [Performance](#performance)
- [Contributing](#contributing)

## Installation

```bash
npm install pino-console pino
```

For pretty development output:
```bash
npm install pino-pretty
```

## Usage

### Basic Setup

```javascript
import pino from 'pino'
import Console from 'pino-console'

// Create a Pino logger
const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty' // For development
  }
})

// Create a Console adapter
const console = new Console(logger)

// Use console methods as usual
console.log('Application starting...')
console.info('This is an info message')
console.warn('This is a warning')
console.error('This is an error')
```

### Migration from Standard Console

Replace your console usage:

```javascript
// Before
console.log('User logged in:', userId)

// After
import { console } from './logger.js' // Your pino-console instance
console.log('User logged in:', userId) // Now outputs structured JSON
```

### Log Level Control

```javascript
import pino from 'pino'
import Console from 'pino-console'

// Only log warnings and errors
const logger = pino({ level: 'warn' })
const console = new Console(logger)

console.debug('Not logged')  // Filtered out
console.log('Not logged')    // Filtered out
console.warn('Logged')       // Shown
console.error('Logged')      // Shown
```

Level mapping:
- `console.debug()` → `pino.debug()` (level 20)
- `console.log()/info()` → `pino.info()` (level 30)
- `console.warn()` → `pino.warn()` (level 40)
- `console.error()` → `pino.error()` (level 50)

## API Reference

### Constructor

#### `new Console(logger)`

Creates a new Console instance.

- **Parameters:** `logger` (Pino Logger) - A Pino logger instance
- **Throws:** `TypeError` if logger is invalid
- **Returns:** Console instance

### Core Logging Methods

- `console.log(message?, ...optionalParams)` - Info level logging
- `console.info(message?, ...optionalParams)` - Info level logging
- `console.warn(message?, ...optionalParams)` - Warn level logging
- `console.error(message?, ...optionalParams)` - Error level logging
- `console.debug(message?, ...optionalParams)` - Debug level logging

### Format Specifiers

All logging methods support standard format specifiers:

| Specifier | Description | Example |
|-----------|-------------|---------|
| `%s` | String | `console.log('Hello %s', 'world')` |
| `%d`, `%i` | Integer | `console.log('Count: %d', 42)` |
| `%o` | Object (shallow) | `console.log('Data: %o', obj)` |
| `%O` | Object (deep) | `console.log('Data: %O', obj)` |
| `%%` | Literal % | `console.log('100%% complete')` |

### Additional Methods

- **Timing:** `time(label?)`, `timeEnd(label?)`, `timeLog(label?, ...data)`
- **Counting:** `count(label?)`, `countReset(label?)`
- **Grouping:** `group(...label)`, `groupCollapsed(...label)`, `groupEnd()`
- **Display:** `table(tabularData, properties?)`, `dir(obj, options?)`, `dirxml(...data)`, `clear()`
- **Debugging:** `assert(value, message?, ...params)`, `trace(message?, ...params)`
- **Inspector:** `profile(label?)`, `profileEnd(label?)`, `timeStamp(label?)` (no-ops)

## TypeScript Support

Full TypeScript support is included:

```typescript
import pino from 'pino'
import Console from 'pino-console'

const logger = pino({ level: 'info' })
export const console = new Console(logger)

// All methods are fully typed
console.log('Message with %s and %d', 'string', 42)
console.time('operation')
console.table([{ name: 'Alice' }, { name: 'Bob' }])
console.timeEnd('operation')
```

## Examples

See [example.mjs](example.mjs) for a comprehensive demonstration of all features.

## Performance

pino-console includes performance optimizations:

- **Level-enabled checks:** Disabled log levels have minimal overhead
- **Lazy evaluation:** Format specifiers only processed when needed
- **Structured output:** Enables efficient log parsing and analysis

```javascript
import pino from 'pino'
import Console from 'pino-console'

// Level filtering prevents unnecessary work
const logger = pino({ level: 'warn' })
const console = new Console(logger)

// These have near-zero cost when filtered
console.debug('Debug info', expensiveOperation()) // Skipped entirely
console.info('Info message', largeObject)         // Skipped entirely

// These are processed
console.warn('Warning')  // Processed
console.error('Error')   // Processed
```

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Related

- [Pino](https://github.com/pinojs/pino) - Super fast, all natural JSON logger
- [WHATWG Console Standard](https://console.spec.whatwg.org/) - Console API specification
- [pino-pretty](https://github.com/pinojs/pino-pretty) - Pretty print Pino logs