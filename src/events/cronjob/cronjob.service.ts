import { Injectable, Logger } from '@nestjs/common';
import { GlobalService } from '../../common/global.service';
import { Connection } from 'typeorm';
import { VocabularyService } from '../../modules/vocabulary/vocabulary.service';

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
    private vocabularyService: VocabularyService
  ) {}
}
