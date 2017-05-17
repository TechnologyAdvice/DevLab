const instance = {
  exec: {
    services: [
      {
        name: 'mongodb',
        persist: false,
        stopTimeSecs: 10,
        args: [
          'run',
          '-d',
          '--rm',
          '--privileged',
          '-p',
          '27017:27017',
          '--name',
          'dl_mongodb_test',
          'mongo:3.0'
        ]
      }
    ],
    primary: {
      args: [
        'run',
        '--rm',
        '-it',
        '-v',
        '/tmp:/tmp',
        '-v',
        '/tmp:/tmp',
        '-w',
        '/tmp',
        '--privileged',
        '-p',
        '8080:8080',
        '--link',
        'dl_mongodb_test:mongodb',
        '--name',
        'dl_primary_test',
        'node:6',
        'sh',
        '/tmp/devlab.sh'
      ],
      cmd: '#!/bin/sh\nset -e;\necho "foo"'
    },
    rmOnShutdown: true
  },
  task: {
    services: [
      {
        name: 'mongodb',
        persist: false,
        stopTimeSecs: 10,
        args: [
          'run',
          '-d',
          '--rm',
          '--privileged',
          '-p',
          '27017:27017',
          '--name',
          'dl_mongodb_test',
          'mongo:3.0'
        ]
      }
    ],
    primary: {
      args: [
        'run',
        '--rm',
        '-it',
        '-v',
        '/tmp:/tmp',
        '-v',
        '/tmp:/tmp',
        '-w',
        '/tmp',
        '--privileged',
        '-p',
        '8080:8080',
        '--link',
        'dl_mongodb_test:mongodb',
        '--name',
        'dl_primary_test',
        'node:6',
        'sh',
        '/tmp/devlab.sh'
      ],
      cmd: '#!/bin/sh\nset -e;\nenv | sort'
    },
    rmOnShutdown: true
  }
}

module.exports = instance
