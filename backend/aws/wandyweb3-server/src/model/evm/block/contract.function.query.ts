import { ApiProperty } from '@nestjs/swagger';
import { ChainQuery } from '../../evm/chain.query';

export class ContractFunctionQuery extends ChainQuery {
  /** The topic of the event */
  @ApiProperty({ example: 'balanceOf', description: 'The function name' })
  functionName: string;

  @ApiProperty({ required: true, description: 'address' })
  address: string;

  /**
   * @description The contract abi
   * @example
   */
  @ApiProperty({
    required: true,
    isArray: true,
    description: 'The contract abi',
  })
  abi: { [key: string]: unknown };
  /**
   * @description The params for the given function
   * @example [object Object]
   */
  @ApiProperty({
    required: false,
    isArray: true,
    description: 'The params for the given function',
  })
  params?: { [key: string]: unknown };
}
