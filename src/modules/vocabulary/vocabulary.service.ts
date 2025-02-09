import { HttpStatus, Injectable, Param, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest, CrudService, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import to from 'await-to-js';
import { I18nLang } from 'nestjs-i18n';
import { ENUM_MODEL } from '../../common';
import { BaseService } from '../../common/base.service';
import { Connection, Not } from 'typeorm';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { Vocabulary } from './entities/vocabulary.entity';

@Injectable()
export class VocabularyService extends TypeOrmCrudService<Vocabulary> {
  model_name: string = ENUM_MODEL.COMMENT;

  constructor(
    @InjectRepository(Vocabulary) repo, 
    private checkService: BaseService,
    private connection: Connection,
  ) {
    super(repo);
  }

  get base(): CrudService<Vocabulary> {
    return this;
  }

  async updateOneBase(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateVocabularyDto,
    @I18nLang() lang: string
  ) {
    const [err, res] = await to(
      this.updateOne(req, <Vocabulary>dto),
    );
    if (err) this.checkService.throwErrorSystem(err.message);
    return {
      data: res,
      message: 'Cập nhật thành công!'
    };
  }

  async replaceOneBase(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateVocabularyDto,
    @I18nLang() lang: string
  ) {
    const [err] = await to(
      this.replaceOne(req, <Vocabulary>dto),
    );
    if (err) this.checkService.throwErrorSystem(err.message);
    return {
      status: HttpStatus.OK,
      message: 'Cập nhật thành công!'
    };
  }

  async createOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateVocabularyDto,
    @I18nLang() lang: string
  ) {
    const [err] = await to(this.createOne(req, <Vocabulary>dto));
    if (err) this.checkService.throwErrorSystem(err.message);

    return {
      status: HttpStatus.OK,
      message: 'Tạo thành công!'
    };
  }

  async createBase(dto: Vocabulary) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.createQueryBuilder()
      .insert()
      .into(Vocabulary)
      .values([dto])
      .onConflict(`("question", "answer") DO UPDATE SET "answer" = excluded."answer"`)
      .execute();

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.checkService.throwErrorSystem(err.message);
    } finally {
      await queryRunner.release();
    }

    return {status: HttpStatus.OK}
  }

  async createManyBase(dto: Vocabulary[]) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.createQueryBuilder()
      .insert()
      .into(Vocabulary)
      .values(dto)
      .onConflict(`("question", "answer") DO UPDATE SET "answer" = excluded."answer"`)
      .execute();

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.checkService.throwErrorSystem(err.message);
    } finally {
      await queryRunner.release();
    }

    return {status: HttpStatus.OK}
  }

  async updateBase(id: string, dto: Vocabulary) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.createQueryBuilder()
      .update(Vocabulary)
      .set(dto)
      .where("id = :id", { id })
      .execute();

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.checkService.throwErrorSystem(err.message);
    } finally {
      await queryRunner.release();
    }

    return {status: HttpStatus.OK}
  }
}
