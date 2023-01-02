import { Module } from '@nestjs/common';
import { EvmAccountService } from './evm.account';
import { EvmNFTService } from './evm.nft';

@Module({
  imports: [],
  providers: [EvmAccountService, EvmNFTService],
  exports: [EvmAccountService, EvmNFTService],
})
export class EvmServiceModule {}
