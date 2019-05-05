module.exports = {
  apps : [{
    name: 'upload',
    script: 'index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    output: './logs/out.log',
    error: './logs/error.log'
  }],
  deploy: {
    production: {
      key: '~/.ssh/id_rsa',
      user: 'root',
      host: ['118.24.204.202'],
      ssh_options: "StrictHostKeyChecking=no",
      ref: "origin/master",
      repo: "https://github.com/zhaosaisai/upload.git",
      path: '/root/projects/upload',
      'post-setup': "ls -la",
      'post-deploy': "yarn run prod"
    }
  }
};
