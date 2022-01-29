let ssl_enable = false
let ssl_confs = null

if (process.env.ENVIROMENT == 'PROD') {
  ssl_enable = true
  ssl_confs = {
    extra: {
       ssl: {
        rejectUnauthorized: false,
      },
    }
  }
}
module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [process.env.ENTITIES_PATH],
  migrationsTableName: 'haf_migrations',
  cli: {
    migrationsDir: 'src/infra/db/postgres/migrations',
  },
  migrations: [
    process.env.MIGRATIONS_PATH,
  ],
  ssl: ssl_enable,
  extra: null
}

