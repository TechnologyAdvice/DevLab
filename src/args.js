'use strict'

const _ = require('redash')
const min = require('minimist')
const pkg = require('../package.json')
const utils = require('./utils')

/* istanbul ignore next */
const processArgs = process.argv[0] === 'node' ? 1 : 2

const args = {
  /**
   * @property {object} Arguments passed to the instance
   */
  raw: min(process.argv.slice(processArgs)),
  /**
   * @property {object} Available run-time flags
   * - @property {string} action - the method to call when parsing
   * - @property {string} prop - the prop to set when parsing
   * - @property {string} help - the help text to display to the user
   */
  available: {
    'h': { action: 'showHelp', help: 'Displays help and usage' },
    'v': { action: 'showVersion', help: 'Displays the current installed version' },
    'e': { prop: 'exec', help: 'Run a custom command instead of defined task' },
    'f': { prop: 'from', help: 'Run with specified docker image' },
    'c': { prop: 'configPath', help: 'Run with custom config file path' },
    'tasks': { action: 'tasks', help: 'List all available tasks' },
    'cleanup': { action: 'cleanupDL', help: 'Stops and removes any non-persisted Devlab containers' },
    'cleanup-all': { action: 'cleanupAll', help: 'Stops and removes ALL docker containers' }
  },
  /**
   * List all available tasks
   */
  tasks: () => {
    utils.tasks()
    process.exit(0)
  },
  /**
   * Displays the help and usage message
   */
  showHelp: () => {
    let help = ''
    help += `  ${pkg.name} v.${pkg.version}\n\n`
    help += `  Usage: [${_.keys(pkg.bin).join('|')}] task [options]\n\n`
    help += _.pipe([_.toPairs, _.map(([k, v]) => `  -${k} -- ${v.help}`), _.join('\n')])(args.available)
    console.log(`${help}\n`)
    process.exit(0)
  },
  /**
   * Displays the current version
   */
  showVersion: () => {
    console.log(pkg.version)
    process.exit(0)
  },
  /**
   * Calls the cleanup process for Devlab containers and exits
   */
  cleanupDL: () => {
    utils.cleanup()
    process.exit(0)
  },
  /**
   * Calls the cleanup process for ALL containers and exits
   */
  cleanupAll: () => {
    utils.cleanup(true)
    process.exit(0)
  },
  /**
   * Ensures argument is valid or outputs an error
   * @param {string} arg The argument to check
   * @returns {boolean}
   */
  isArg: (arg) => {
    if (args.available[arg]) return true
    throw new Error(`Invalid argument '${arg}', please see documentation`)
  },
  /**
   * Gets the task elements and returns joined string
   * @returns {string}
   */
  getTask: () => _.has('_', args.raw) ? args.raw._ : '',
  /**
   * Parse arguments and call (action) or append to config (prop)
   * @returns {object}
   */
  parse: () => _.pipe([
    _.omit(['_']),
    _.keys,
    _.filter(args.isArg),
    _.reduce((acc, key) => {
      const arg = args.available[key]
      // Accumulate property
      if (arg.prop) acc[arg.prop] = args.raw[key]
      // Apply action
      if (arg.action) args[arg.action].call(null, args.raw[key])
      return acc
    }, {}),
    _.merge({ run: args.getTask() })
  ])(args.raw)
}

module.exports = args
