import { forwardRef, Module } from '@nestjs/common';
import { SolanaServiceModule } from '../../supplier/solana/solana.service.module';

import { SolanaAccountController as V1_SolanaAccountController } from './v1/account.controller';

@Module({
  imports: [forwardRef(() => SolanaServiceModule)],
  providers: [],
  exports: [],
  controllers: [V1_SolanaAccountController],
})
export class SolanaModule {}
