import { Module } from '@nestjs/common';
import { SolanaAccountService } from '../../supplier/solana/solana.account';
import { SolanaNFTService } from '../../supplier/solana/solana.nft';

@Module({
  imports: [],
  providers: [SolanaAccountService, SolanaNFTService],
  exports: [SolanaAccountService, SolanaNFTService],
})
export class SolanaServiceModule {}
