import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Account } from './entities/account.entity';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Account])],
  exports: [TypeOrmModule],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}
