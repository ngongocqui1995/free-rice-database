import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { Vocabulary } from './entities/vocabulary.entity';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles-guard';
import { ROLES } from '../roles/contants/contants';
import { RequireRoles } from '../../auth/decorator/roles.decorator';
import { I18nLang } from 'nestjs-i18n';
import { In } from 'typeorm';

@ApiTags('Vocabulary')
@Crud({
  model: {
    type: Vocabulary,
  },
  dto: {
    create: CreateVocabularyDto,
    update: UpdateVocabularyDto,
  },
  routes: {
    exclude: ['createManyBase', 'deleteOneBase']
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
  query: {
    cache: 86400000
  }
})
@Controller('vocabulary')
export class VocabularyController implements CrudController<Vocabulary> {
  constructor(
    public service: VocabularyService, 
  ) {}

  get base(): CrudController<Vocabulary> {
    return this;
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{token}}',
  })
  @Override()
  async getMany(
    @ParsedRequest() req: CrudRequest,
  ) {
    const filter = req.parsed.filter;
    const findQuestion = filter.find((it) => it.field === 'question');
    const findAnswer = filter.find((it) => it.field === 'answer');
    
    return this.service.find({ 
      where: { question: findQuestion.value, answer: In(findAnswer.value) },
      cache: {
        id: findQuestion.value,
        milliseconds: 86400000
      }
    });
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{token}}',
  })
  @Override('getOneBase')
  getOneAndDoStuff(
    @ParsedRequest() req: CrudRequest,
  ) {
    return this.base.getOneBase(req);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{token}}',
  })
  @Override('updateOneBase')
  coolFunction(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateVocabularyDto,
    @I18nLang() lang: string
  ) {
    return this.service.updateOneBase(id, req, dto, lang);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequireRoles(ROLES.ROLE_ADMIN)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{token}}',
  })
  @Override('replaceOneBase')
  awesomePUT(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateVocabularyDto,
    @I18nLang() lang: string
  ) {
    return this.service.replaceOneBase(id, req, dto, lang);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{token}}',
  })
  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateVocabularyDto,
    @I18nLang() lang: string
  ) {
    return this.service.createOneBase(req, dto, lang);
  }
}