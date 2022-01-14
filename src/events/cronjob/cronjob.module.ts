import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from '../../modules/account/account.service';
import { BaseController } from '../../common/base.controller';
import { BaseService } from '../../common/base.service';
import { GlobalService } from '../../common/global.service';
import { Vocabulary } from '../../modules/vocabulary/entities/vocabulary.entity';
import { VocabularyService } from '../../modules/vocabulary/vocabulary.service';
import { CronjobService } from './cronjob.service';
import { Account } from '../../modules/account/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vocabulary, Account])],
  controllers: [],
  providers: [CronjobService, BaseService, GlobalService, BaseController, VocabularyService, AccountService]
})
export class CronjobModule {}
