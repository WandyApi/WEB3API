// import { EvmAbiItem } from '@moralisweb3/evm-utils';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { BlockPageQuery } from './block.page.query';

export class EvmAbiItemVariable {
  @ApiProperty({ required: false, example: '', description: '' })
  name?: string;
  @ApiProperty({ required: false, example: false, description: '' })
  indexed?: boolean;
  @ApiProperty({ required: false, example: '', description: '' })
  type?: string;
  @ApiProperty({ required: false, example: '', description: '' })
  internalType?: string;
  @ApiProperty({
    required: false,
    isArray: true,
    type: EvmAbiItemVariable,
    oneOf: [{ $ref: getSchemaPath(EvmAbiItemVariable) }],
    description: '',
  })
  components?: EvmAbiItemVariable[];
}

export class EvmAbiItem {
  @ApiProperty({ required: false, example: '', description: '' })
  name?: string;
  @ApiProperty({ required: false, example: '', description: '' })
  type?: string;
  @ApiProperty({ required: false, example: false, description: '' })
  anonymous?: boolean;
  @ApiProperty({ required: false, example: false, description: '' })
  payable?: boolean;
  @ApiProperty({ required: false, example: false, description: '' })
  constant?: boolean;
  @ApiProperty({ required: false, example: '', description: '' })
  stateMutability?: string;
  @ApiProperty({
    required: false,
    isArray: true,
    type: EvmAbiItemVariable,
    oneOf: [{ $ref: getSchemaPath(EvmAbiItemVariable) }],
    description: '',
  })
  inputs?: EvmAbiItemVariable[];
  @ApiProperty({
    required: false,
    isArray: true,
    type: EvmAbiItemVariable,
    oneOf: [{ $ref: getSchemaPath(EvmAbiItemVariable) }],
    description: '',
  })
  outputs?: EvmAbiItemVariable[];
  @ApiProperty({ required: false, example: 1, description: '' })
  gas?: number;
}

export class ContractEventsQuery extends BlockPageQuery {
  /** The topic of the event */
  @ApiProperty({
    example:
      '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    description: 'The topic of the event',
  })
  topic: string;

  /** offset */
  @ApiProperty({ required: false, example: 100, description: 'offset' })
  offset?: number;

  @ApiProperty({
    required: true,
    example: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    description: 'address',
  })
  address: string;

  @ApiProperty({
    description: 'Transaction result ',
    type: EvmAbiItem,
    oneOf: [{ $ref: getSchemaPath(EvmAbiItem) }],
  })
  abi: EvmAbiItem;
}
