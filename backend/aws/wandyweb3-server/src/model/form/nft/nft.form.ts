import { ApiProperty } from '@nestjs/swagger';
import { Cluster } from '@solana/web3.js';
import { IsNotEmpty } from 'class-validator';

export class SolanaNFTForm {
  @IsNotEmpty()
  @ApiProperty({ example: '0x47cEb7f2e0af3a1ffF78baCeD6A1B58Ad143531b' })
  address: string;

  @ApiProperty({ example: 'SOL|0x47cEb7f2e0af3a1ffF78baCeD6A1B58Ad143531b' })
  token?: string;

  @ApiProperty({ example: 'devnet | testnet | mainnet-beta' })
  cluster?: Cluster;
}
