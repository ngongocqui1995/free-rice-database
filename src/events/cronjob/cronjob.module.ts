import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseController } from '../../common/base.controller';
import { BaseService } from '../../common/base.service';
import { GlobalService } from '../../common/global.service';
import { Vocabulary } from '../../modules/vocabulary/entities/vocabulary.entity';
import { VocabularyService } from '../../modules/vocabulary/vocabulary.service';
import { CronjobService } from './cronjob.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vocabulary])],
  controllers: [],
  providers: [CronjobService, BaseService, GlobalService, BaseController, VocabularyService]
})
export class CronjobModule {}
