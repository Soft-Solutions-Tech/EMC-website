module.exports = {
  apps: [
    {
      name: 'nextjs-app',
      script: 'npm',
      args: 'run start',
      cwd: '/var/www/nextjs',
      instances: 1,  // Single instance in fork mode
      exec_mode: 'fork',  // Explicitly fork (default, but good to specify)
      exp_backoff_restart_delay: 100,  // Exponential backoff on restarts
      max_restarts: 10,  // Prevent infinite restart loops on persistent errors
      autorestart: true,  // Auto-restart on crashes
      watch: false,  // No file watching (unnecessary for prod)
      error_file: '/var/log/nextjs-app.err.log',  // Stderr logs
      out_file: '/var/log/nextjs-app.out.log',    // Stdout logs
      log_date_format: 'YYYY-MM-DD HH:mm:ss',     // Timestamp format
      env_production: {
        NODE_ENV: 'production',
        // Add other critical env vars here if needed (e.g., from your .env):
        // SMTP_HOST: 'smtp.office365.com',
        // etc. But Next.js will load .env, so only add if overrides are required.
      },
    },
  ],
};
