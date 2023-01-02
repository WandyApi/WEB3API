import { ApiProperty } from '@nestjs/swagger';

export type Chain =
  | 'eth'
  | '0x1'
  | 'ropsten'
  | '0x3'
  | 'rinkeby'
  | '0x4'
  | 'goerli'
  | '0x5'
  | 'kovan'
  | '0x2a'
  | 'polygon'
  | '0x89'
  | 'mumbai'
  | '0x13881'
  | 'bsc'
  | '0x38'
  | 'bsc testnet'
  | '0x61'
  | 'avalanche'
  | '0xa86a'
  | 'avalanche testnet'
  | '0xa869'
  | 'fantom'
  | '0xfa'
  | 'cronos'
  | '0x19'
  | 'cronos testnet'
  | '0x152'
  | 'ethw';

export class ChainQuery {
  @ApiProperty({
    example: '0x1',
    default: 'eth',
    description:
      'The chain to query Available values : eth, 0x1, ropsten, 0x3, rinkeby, 0x4, goerli, 0x5, kovan, 0x2a, polygon, 0x89, mumbai, 0x13881, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, avalanche testnet, 0xa869, fantom, 0xfa, cronos, 0x19, cronos testnet, 0x152',
  })
  chain: Chain;
}
