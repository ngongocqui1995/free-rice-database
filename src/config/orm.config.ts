import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface ConfigState {
  database: TypeOrmModuleOptions;
}

export default (): ConfigState => {
  const environment = process.env.ENVIRONMENT;
  return {
    database: {
      type: 'postgres',
      username: process.env.USER_POSTGRES,
      password: process.env.PASS_POSTGRES,
      port: +process.env.PORT_POSTGRES,
      host: process.env.HOST_POSTGRES,
      database: process.env.DB_POSTGRES,
      subscribers: ['dist/**/*.subscriber{.ts,.js}'],
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/**/*.migration{.ts,.js}'],
      cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
      },
      synchronize: true,
      logging: true,
      // ssl: {
      //   rejectUnauthorized: false,
      // },
      cache: {
        type: "redis",
        options: {
          host: process.env.HOST_REDIS,
          port: process.env.PORT_REDIS,
          password: process.env.PASS_REDIS,
          // url: process.env.URL_REDIS,
          // tls: {
          //   rejectUnauthorized: false
          // }s
        },
        ignoreErrors: true
      },
    },
  }
};
