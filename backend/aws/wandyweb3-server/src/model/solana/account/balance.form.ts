import { ApiProperty } from '@nestjs/swagger';
import { Cluster } from '@solana/web3.js';
import { IsNotEmpty } from 'class-validator';

export class BalanceForm {
  @IsNotEmpty()
  @ApiProperty({
    example: 'c7A3dUKXEueqzoisnunfrYZ9ji5s5Uaqmxi2usLa2v1',
  })
  address: string;

  @ApiProperty({
    required: false,
    default: 'SOL',
    description: 'the value is "SOL" or sql token',
    example: 'SOL',
  })
  token?: string;

  @ApiProperty({
    required: false,
    default: 'devnet',
    description: 'the value is only "devnet" or "testnet" or "mainnet-beta"',
    example: 'devnet',
  })
  cluster?: Cluster;
}
