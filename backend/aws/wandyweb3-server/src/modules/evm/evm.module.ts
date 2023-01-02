import { forwardRef, Module } from '@nestjs/common';
import { EvmServiceModule } from '../../supplier/evm/evm.service.module';
import { AccountController as V1_AccountController } from './v1/account.contorller';
import { BlockController as V1_BlockController } from './v1/block.contorller';
import { NFTController as V1_NFTController } from './v1/nft.contorller';
import { TokenController as V1_TokenController } from './v1/token.contorller';

@Module({
  imports: [forwardRef(() => EvmServiceModule)],
  providers: [],
  exports: [],
  controllers: [
    V1_AccountController,
    V1_BlockController,
    V1_NFTController,
    V1_TokenController,
  ],
})
export class EVMModule {}
