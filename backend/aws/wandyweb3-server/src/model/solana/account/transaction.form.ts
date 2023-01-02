import { ApiProperty } from '@nestjs/swagger';
import { Cluster } from '@solana/web3.js';

export class TransactionForm {
  @ApiProperty({
    required: false,
    default: 'devnet',
    description: 'the value is only "devnet" or "testnet" or "mainnet-beta"',
    example: 'devnet',
  })
  cluster?: Cluster;

  @ApiProperty({
    example:
      '5W8FiR3eAUPpNTq5gdL3oD8n1i3CpTE8yqxDAgdU9dqsGS5hPbCwoxqQSHzSHmM1XTXAYeiKMfBFQyQN4SNfrhx4',
  })
  signature: string;
}
