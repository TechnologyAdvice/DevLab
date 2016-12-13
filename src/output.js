const chalk = require('chalk')
const ora = require('ora')
const logSymbols = require('log-symbols')

const output = {
  /**
   * @property {boolean} enable/disable application messaging
   */
  quiet: false,
  /**
   * Starts a spinner
   * @param {string} m Spinner message
   */
  spinner: m => ora(m).start(),
  /**
   * Output success message
   * @param {string} m Output message
   */
  success: m => console.log(`${chalk.green(logSymbols.success)} ${m}`),
  /**
   * Output error message
   * @param {string} m Output message
   */
  error: m => console.log(`${chalk.red(logSymbols.error)} ${m}`)
}

module.exports = output
