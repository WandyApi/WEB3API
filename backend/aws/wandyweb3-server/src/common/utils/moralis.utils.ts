import { EvmChain } from '@moralisweb3/evm-utils';
import { Chain } from 'src/model/evm/chain.query';

export const chainToEvm = (chain: Chain): EvmChain => {
  if (chain === 'eth' || chain === '0x1') {
    return EvmChain.ETHEREUM;
  }
  new Error('the chain value is error');
};
