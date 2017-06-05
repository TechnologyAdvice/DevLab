const chai = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const pchai = require('chai-as-promised')
const dchai = require('dirty-chai')
const schai = require('sinon-chai')
const mod = require('module')
const path = require('path')
global.sinon = sinon
global.expect = chai.expect
global.proxyquire = proxyquire
chai.use(dchai)
chai.use(pchai)
chai.use(schai)

global.cwd = process.cwd()

global.instanceId = 'test'

process.env.BC_TEST_RUN = true
process.env.NO_UPDATE_NOTIFIER = true

process.env.NODE_PATH = path.join(__dirname, '..') + path.delimiter + (process.env.NODE_PATH || '')
mod._initPaths()
