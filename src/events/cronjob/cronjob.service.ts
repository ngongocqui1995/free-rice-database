import { Injectable, Logger } from '@nestjs/common';
import { GlobalService } from '../../common/global.service';
import { Connection } from 'typeorm';
import { VocabularyService } from '../../modules/vocabulary/vocabulary.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AccountService } from 'src/modules/account/account.service';
import to from 'await-to-js';
import axios from 'axios';

const configPuppeterr: any = {
  args: ["--disable-gpu", "--no-sandbox", "--disable-setuid-sandbox", "--start-maximized"],
  // linux: yum install chromium
  // executablePath: "/usr/bin/chromium-browser",
  headless: true,
  ignoreHTTPSErrors: true,
  defaultViewport: null,
};

@Injectable()
export class CronjobService {
  private readonly logger = new Logger('Cronjob');

  constructor(
    private connection: Connection,
    private globalService: GlobalService,
    private vocabularyService: VocabularyService,
    private accountService: AccountService
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCallHeroku() {    
    const total = await this.accountService.count();
    for (let i=0; i<total; i++) {
      if (i === 0) await to(axios.get(`https://free-rice-api.herokuapp.com/job/${i}`));
      if (i !== 0) await to(axios.get(`https://free-rice-api-${i}.herokuapp.com/job/${i}`));
    }
  }
}
