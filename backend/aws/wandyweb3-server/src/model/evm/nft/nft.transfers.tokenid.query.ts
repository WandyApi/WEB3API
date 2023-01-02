import { ApiProperty } from '@nestjs/swagger';
import { PageQuery } from '../page.query';

export class NFTransfersTokenIdQuery extends PageQuery {
  /** The format of the token id */
  @ApiProperty({
    required: false,
    example: 'decimal',
    description: 'The format of the token id,value is decimal or hex',
  })
  format?: 'decimal' | 'hex';

  /** The field(s) to order on and if it should be ordered in ascending or descending order. Specified by: fieldName1.order,fieldName2.order. Example 1: "block_number", "block_number.ASC", "block_number.DESC", Example 2: "block_number and contract_type", "block_number.ASC,contract_type.DESC" */
  // @ApiProperty({
  //   required: false,
  //   description:
  //     'The field(s) to order on and if it should be ordered in ascending or descending order. Specified by: fieldName1.order,fieldName2.order. Example 1: "block_number", "block_number.ASC", "block_number.DESC", Example 2: "block_number and contract_type", "block_number.ASC,contract_type.DESC',
  // })
  // order?: string;

  /** Address of the contract */
  @ApiProperty({
    example: '0xbd3531da5cf5857e7cfaa92426877b022e612cf8',
    description: 'Address of the contract',
  })
  address: string;

  /**The id of the tokens */
  @ApiProperty({ example: '865', description: 'The id of the token' })
  tokenId: string;
}
