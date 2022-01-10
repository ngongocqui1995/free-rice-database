import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Menu } from '../modules/menus/entities/menu.entity';
import { Permission } from '../modules/permission/entities/permission.entity';
import { RoleToMenu } from '../modules/role-to-menu/entities/role-to-menu.entity';
import { Role } from '../modules/roles/entities/role.entity';
import { User } from '../modules/users/entities/user.entity';
import { ValidAddress } from '../modules/valid-address/entities/valid-address.entity';
import { Vocabulary } from '../modules/vocabulary/entities/vocabulary.entity';

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
      entities: [User, Role, ValidAddress, Vocabulary, RoleToMenu, Permission, Menu],
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
    },
  }
};
