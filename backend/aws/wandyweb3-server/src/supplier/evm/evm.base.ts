import { Injectable } from '@nestjs/common';
import { mnemonicToSeedSync } from 'bip39';
import { hdkey } from 'ethereumjs-wallet';
import Wallet from 'ethereumjs-wallet';
import { Chain } from '../../model/evm/chain.query';

import { ethers } from 'ethers';
import { ETHERSCAN_API_KEY } from '../../model/constant/apikey.constant';

@Injectable()
export class EvmBaseService {
  getWallet(mnemonic: string): Wallet {
    const seedPhrase = mnemonicToSeedSync(mnemonic);
    const account = hdkey.fromMasterSeed(seedPhrase);
    return account.derivePath("m/44'/60'/0'/0/0").getWallet();
  }

  checkAddress(address: string): boolean {
    return ethers.utils.isAddress(address);
  }

  //| 'eth'
  // | '0x1'
  // | 'ropsten'
  // | '0x3'
  // | 'rinkeby'
  // | '0x4'
  // | 'goerli'
  // | '0x5'
  // | 'kovan'
  // | '0x2a'
  // | 'polygon'
  // | '0x89'
  // | 'mumbai'
  // | '0x13881'
  // | 'bsc'
  // | '0x38'
  // | 'bsc testnet'
  // | '0x61'
  // | 'avalanche'
  // | '0xa86a'
  // | 'avalanche testnet'
  // | '0xa869'
  // | 'fantom'
  // | '0xfa'
  // | 'cronos'
  // | '0x19'
  // | 'cronos testnet'
  // | '0x152';
  getRPCurl(chain: Chain) {
    let network: string = chain;
    if (chain === 'eth' || chain === '0x1') {
      network = null;
    } else if (chain === 'bsc' || chain === '0x38') {
      network = 'https://bsc-dataseed1.binance.org:443';
    } else if (chain === 'ethw') {
      network = 'https://mainnet.ethereumpow.org';
    }

    return ethers.getDefaultProvider(network, { etherscan: ETHERSCAN_API_KEY });
  }
}
