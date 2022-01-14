import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Index, PrimaryGeneratedColumn } from "typeorm";

export class Account extends BaseEntity {
  @ApiProperty({
    type: String,
    description: 'Id',
  })
  @PrimaryGeneratedColumn('uuid')
  @Index('pk_account_id', ['id'], { unique: true })
  id: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @Column({ type: 'varchar' })
  index: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @Column({ type: 'varchar' })
  username: string;

  @ApiProperty({
      type: String,
      required: true,
  })
  @Column({ type: 'varchar' })
  password: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @Column({ type: 'varchar' })
  server: string;
}
