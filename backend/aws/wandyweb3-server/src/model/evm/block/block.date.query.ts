import { ApiProperty } from '@nestjs/swagger';
import { ChainQuery } from '../../evm/chain.query';

export class BlockDateQuery extends ChainQuery {
  @ApiProperty({
    example: '2021-09-29T13:09:15+00:00',
    description:
      'nix date in miliseconds or a datestring (any format that is accepted by momentjs).',
  })
  date: string;
}
