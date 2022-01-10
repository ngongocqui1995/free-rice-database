import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/orm.config';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/i18n/exceptions-filter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CronjobModule } from './events/cronjob/cronjob.module';
import { ScheduleModule } from '@nestjs/schedule';
import { GlobalService } from './common/global.service';
import { VocabularyModule } from './modules/vocabulary/vocabulary.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { MenusModule } from './modules/menus/menus.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RoleToMenuModule } from './modules/role-to-menu/role-to-menu.module';
import { ValidAddressModule } from './modules/valid-address/valid-address.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(configuration().database),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    CronjobModule,
    UsersModule,
    RolesModule,
    AuthModule,
    MenusModule,
    PermissionModule,
    RoleToMenuModule,
    ValidAddressModule,
    VocabularyModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    GlobalService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
