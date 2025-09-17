import pino from 'pino'
import Console from './index.js'

// Create a pretty logger for development
const logger = pino({
  level: 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard'
    }
  }
})

const console = new Console(logger)

console.log('🚀 Starting pino-console feature demonstration...')

// Core logging methods
console.log('\n📝 Core Logging Methods:')
console.log('This is a log message')
console.info('This is an info message')
console.warn('This is a warning message')
console.error('This is an error message')
console.debug('This is a debug message')

// Format specifiers
console.log('\n🎨 Format Specifiers:')
console.log('String formatting: Hello %s!', 'World')
console.log('Number formatting: Count is %d', 42)
console.log('Integer formatting: Value is %i', 3.14)
console.log('Object formatting (shallow): %o', { name: 'Alice', age: 30 })
console.log('Object formatting (deep): %O', { user: { profile: { settings: { theme: 'dark' } } } })
console.log('Literal percent: Progress at 75%%')

// Timing operations
console.log('\n⏱️ Timing Operations:')
console.time('database-operation')
console.time('api-call')

setTimeout(() => {
  console.timeLog('database-operation', 'Query in progress...')
  setTimeout(() => {
    console.timeEnd('database-operation')
    console.timeEnd('api-call')
  }, 100)
}, 200)

// Counting operations
console.log('\n🔢 Counting Operations:')
for (let i = 0; i < 3; i++) {
  console.count('requests')
  console.count('user-actions')
}
console.countReset('requests')
console.count('requests') // Starts from 1 again

// Grouping
console.log('\n📂 Grouping Operations:')
console.group('User Registration Process')
console.log('Step 1: Validate email format')
console.log('Step 2: Check if email exists')

console.group('Database Operations')
console.log('Creating user record...')
console.log('Setting up user preferences...')
console.groupEnd()

console.log('Step 3: Send welcome email')
console.groupEnd()

console.groupCollapsed('Collapsed Group Example')
console.log('This is inside a collapsed group')
console.groupEnd()

// Assertions
console.log('\n✅ Assertion Testing:')
console.assert(true, 'This assertion passes - no output')
console.assert(false, 'This assertion fails and will be logged')
console.assert(2 + 2 === 5, 'Math is broken: 2 + 2 = %d', 2 + 2)

// Table display
console.log('\n📊 Table Display:')
const users = [
  { id: 1, name: 'Alice Johnson', role: 'admin', active: true },
  { id: 2, name: 'Bob Smith', role: 'user', active: true },
  { id: 3, name: 'Charlie Brown', role: 'user', active: false }
]

console.table(users)
console.table(users, ['name', 'role']) // Only show specific columns

const stats = {
  totalUsers: 1250,
  activeUsers: 1180,
  premiumUsers: 340,
  freeUsers: 910
}
console.table(stats)

// Object inspection
console.log('\n🔍 Object Inspection:')
const complexObject = {
  config: {
    database: {
      host: 'localhost',
      port: 5432,
      ssl: { enabled: true, cert: 'path/to/cert' }
    },
    cache: { ttl: 3600, maxSize: 1000 }
  },
  metadata: new Date()
}

console.dir(complexObject)
console.dir(complexObject, { depth: 1 }) // Shallow inspection
console.dirxml(complexObject) // Same as dir for non-DOM

// Stack traces
console.log('\n🔍 Stack Tracing:')
function level3 () {
  console.trace('Trace from level 3 function')
}

function level2 () {
  level3()
}

function level1 () {
  level2()
}

level1()

// Clear (logs indicator)
console.log('\n🧹 Clear Operation:')
console.clear()

// Inspector methods (no-ops but included for compatibility)
console.log('\n🔧 Inspector Methods (no-ops):')
console.profile('performance-test')
console.profileEnd('performance-test')
console.timeStamp('checkpoint')

// Multiple arguments and complex formatting
console.log('\n🎯 Complex Examples:')
const user = { id: 123, name: 'Alice', preferences: { theme: 'dark', lang: 'en' } }
const errorObj = new Error('Sample error for demonstration')

console.log('User %s (ID: %d) logged in with preferences: %o', user.name, user.id, user.preferences)
console.error('Application error occurred: %s\nStack: %s', errorObj.message, errorObj.stack)

// Demonstrate level filtering
console.log('\n🎚️ Level Filtering Demo:')
console.log('Creating a logger with warn level only...')

const warnLogger = pino({
  level: 'warn',
  transport: {
    target: 'pino-pretty',
    options: { colorize: true }
  }
})
const warnConsole = new Console(warnLogger)

console.log('These messages will be filtered out with warn-level logger:')
warnConsole.debug('Debug message - filtered')
warnConsole.log('Log message - filtered')
warnConsole.info('Info message - filtered')

console.log('These messages will be shown:')
warnConsole.warn('Warning message - shown')
warnConsole.error('Error message - shown')

console.log('\n✨ Demo complete! Check the structured JSON output above.')
