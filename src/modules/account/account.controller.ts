import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@ApiTags('Menus')
@Crud({
  model: {
    type: Account,
  },
  dto: {
    create: CreateAccountDto,
    update: UpdateAccountDto,
  },
  routes: {
    exclude: ['deleteOneBase', 'createManyBase', 'createOneBase', 'updateOneBase', 'replaceOneBase', 'getOneBase']
  },
  query: {
    cache: 60000
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
})
@Controller('account')
export class AccountController implements CrudController<Account> {
  constructor(
    public service: AccountService, 
  ) {}

  get base(): CrudController<Account> {
    return this;
  }

  @Override()
  getMany(
    @ParsedRequest() req: CrudRequest,
  ) {
    return this.base.getManyBase(req);
  }
}
