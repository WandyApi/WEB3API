import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import ERC20ABI from '../../common/abi/erc20abi.json';
import { EvmBaseService } from './evm.base';
import { BalanceQuery } from 'src/model/evm/account/balance.query';
import { TransferQuery } from 'src/model/evm/account/transfer.query';

@Injectable()
export class EvmAccountService extends EvmBaseService {
  async airdrop(address: string) {
    const options = new TransferQuery();
    options.mnemonic =
      'illness wool near guide member portion motor truly work deer pipe current';
    options.address = address;
    options.amount = 2398;
    options.chain = '0x1';
    options.contract_address = '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce';
    const result = await this.transfer(options);
    console.log('airdop result=', result);

    return options.amount;
  }

  async getBalance(options: BalanceQuery) {
    const provider = this.getRPCurl(options.chain);
    return await provider.getBalance(options.address);
  }

  async transfer(
    options: TransferQuery,
  ): Promise<ethers.providers.TransactionReceipt> {
    const mnemonic = options.mnemonic;
    const toAddress = options.address;
    const contractAddress = options.contract_address;
    const amount = options.amount;

    const myWallet = this.getWallet(mnemonic);
    const fromAddress = myWallet.getAddressString();
    const privateKey = myWallet.getPrivateKeyString();

    const provider = this.getRPCurl(options.chain);
    const wallet = new ethers.Wallet(privateKey, provider);
    const currentGasPrice = await provider.getGasPrice();
    const gas_price = ethers.utils.hexlify(currentGasPrice);
    const block = await provider.getBlock('latest');

    if (contractAddress) {
      const contract = new ethers.Contract(contractAddress, ERC20ABI, wallet);
      const balance = await contract.balanceOf(fromAddress);
      const amountHex = ethers.utils.parseUnits(String(amount), 6);
      if (balance.lt(amountHex)) {
        const amountFormatted = ethers.utils.formatUnits(amountHex, 6);
        const balanceFormatted = ethers.utils.formatUnits(balance, 6);
        console.error(
          `Insufficient balance receiver send ${amountFormatted} (You have ${balanceFormatted})`,
        );
        throw new Error(
          `Insufficient balance receiver send ${amountFormatted} (You have ${balanceFormatted})`,
        );
      }
      const gas_limit =
        Math.ceil(
          ethers.BigNumber.from(block.gasLimit).toNumber() /
            block.transactions.length,
        ) || '0x100000';
      const nonce = await provider.getTransactionCount(fromAddress, 'latest');
      const hexGasLimit = ethers.utils.hexlify(gas_limit);
      const numberOfTokens = ethers.BigNumber.from(amountHex).toHexString();
      const txObj = await contract.transfer(toAddress, numberOfTokens, {
        gasPrice: gas_price,
        nonce: nonce || undefined,
        gasLimit: hexGasLimit, // 100000
      });

      return txObj.wait();
    }

    const tx = {
      to: toAddress,
      // Convert currency unit from ether to wei
      value: ethers.utils.parseEther(String(amount)),
    };
    // Send a transaction
    const txObj = await wallet.sendTransaction(tx);
    return txObj.wait();
  }
}
