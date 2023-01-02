import { ApiProperty } from '@nestjs/swagger';
import { Cluster } from '@solana/web3.js';

export class TransferDTO {
  @ApiProperty({ example: '2ASevJwBi9GdhZUbNH9w8GWMAvheg68un5Y1848JNccg' })
  transactionHash?: string | undefined;

  @ApiProperty({ example: '2ASevJwBi9GdhZUbNH9w8GWMAvheg68un5Y1848JNccg' })
  fromAddress: string;

  @ApiProperty({ example: '2ASevJwBi9GdhZUbNH9w8GWMAvheg68un5Y1848JNccg' })
  toAddress: string;

  @ApiProperty({ example: 5800.56 })
  amount: number;

  @ApiProperty({ example: 0 })
  gasPrice = 0;
  @ApiProperty({ example: 0 })
  gasUsed = 0;
  @ApiProperty({ example: 5000 })
  gasFee = 5000;

  @ApiProperty({ example: 'SOL|2ASevJwBi9GdhZUbNH9w8GWMAvheg68un5Y1848JNccg' })
  token?: string;

  @ApiProperty({ example: 'devnet | testnet | mainnet-beta' })
  cluster?: Cluster;
}
