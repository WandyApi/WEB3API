import { ApiProperty } from '@nestjs/swagger';
import { Cluster } from '@solana/web3.js';
import { IsNotEmpty } from 'class-validator';

export class BlockForm {
  @IsNotEmpty()
  @ApiProperty({
    example: 1424681,
  })
  slot: number;

  @ApiProperty({
    required: false,
    default: 'devnet',
    description: 'the value is only "devnet" or "testnet" or "mainnet-beta"',
    example: 'devnet',
  })
  cluster?: Cluster;
}
