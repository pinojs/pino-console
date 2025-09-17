import { Logger } from 'pino';
import { InspectOptions } from 'util';

declare class Console {
  /**
   * Creates a new Console instance that uses the provided Pino logger.
   */
  constructor(logger: Logger);

  /**
   * Reference to the Console constructor for Node.js compatibility.
   */
  Console: typeof Console;

  // Core logging methods
  /**
   * Prints to stdout with newline. Equivalent to pino.info().
   */
  log(message?: any, ...optionalParams: any[]): void;

  /**
   * Prints to stdout with newline. Equivalent to pino.info().
   */
  info(message?: any, ...optionalParams: any[]): void;

  /**
   * Prints to stderr with newline. Equivalent to pino.warn().
   */
  warn(message?: any, ...optionalParams: any[]): void;

  /**
   * Prints to stderr with newline. Equivalent to pino.error().
   */
  error(message?: any, ...optionalParams: any[]): void;

  /**
   * Prints to stdout with newline. Equivalent to pino.debug().
   * Only outputs when logger level allows debug messages.
   */
  debug(message?: any, ...optionalParams: any[]): void;

  // Assertion methods
  /**
   * Writes a message if value is falsy. Output always starts with "Assertion failed".
   */
  assert(value: any, message?: string, ...optionalParams: any[]): void;

  // Timing methods
  /**
   * Starts a timer identified by a unique label.
   */
  time(label?: string): void;

  /**
   * Stops a timer and prints the result.
   */
  timeEnd(label?: string): void;

  /**
   * Prints elapsed time for a running timer.
   */
  timeLog(label?: string, ...data: any[]): void;

  // Counting methods
  /**
   * Maintains an internal counter and outputs the count.
   */
  count(label?: string): void;

  /**
   * Resets the internal counter.
   */
  countReset(label?: string): void;

  // Grouping methods
  /**
   * Increases indentation of subsequent lines.
   */
  group(...label: any[]): void;

  /**
   * Alias for group().
   */
  groupCollapsed(...label: any[]): void;

  /**
   * Decreases indentation level.
   */
  groupEnd(): void;

  // Display methods
  /**
   * Attempts to construct a table with the data.
   */
  table(tabularData: any, properties?: string[]): void;

  /**
   * Uses util.inspect() on obj and prints result.
   */
  dir(obj: any, options?: InspectOptions): void;

  /**
   * Calls log() passing the arguments. Does not produce XML formatting.
   */
  dirxml(...data: any[]): void;

  /**
   * Logs a clear indicator. Cannot actually clear in logging context.
   */
  clear(): void;

  // Stack trace
  /**
   * Prints stack trace to current position.
   */
  trace(message?: any, ...optionalParams: any[]): void;

  // Inspector methods (no-ops for Node.js Console compatibility)
  /**
   * No-op method for Node.js Console compatibility.
   * Inspector functionality not applicable in logging context.
   */
  profile(label?: string): void;

  /**
   * No-op method for Node.js Console compatibility.
   * Inspector functionality not applicable in logging context.
   */
  profileEnd(label?: string): void;

  /**
   * No-op method for Node.js Console compatibility.
   * Inspector functionality not applicable in logging context.
   */
  timeStamp(label?: string): void;
}

export = Console;