import { Controller, Get, Query, Logger } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { generateMnemonic } from 'bip39';
import { BaseResult } from '../../../model/base.result';
import { TransactionReceipt } from '@ethersproject/providers';
import { EvmAccountService } from 'src/supplier/evm/evm.account';
import { BalanceQuery } from 'src/model/evm/account/balance.query';
import { TransferQuery } from 'src/model/evm/account/transfer.query';

@ApiTags('Account')
@Controller('evm/account/v1')
export class AccountController {
  constructor(private readonly accountService: EvmAccountService) {}

  @ApiResponse({
    status: 200,
    description: 'Returns wallet address',
    type: BaseResult<{
      address: string;
      privateKey: string;
      publicKey: string;
    }>,
  })
  @Get('createWallet')
  @ApiQuery({ name: 'mnemonic', type: 'string', example: generateMnemonic() })
  createWallet(
    @Query('mnemonic') mnemonic: string,
  ): BaseResult<{ address: string; privateKey: string; publicKey: string }> {
    const myWallet = this.accountService.getWallet(mnemonic);

    const addressResult = new BaseResult<{
      address: string;
      privateKey: string;
      publicKey: string;
    }>();
    addressResult.code = 0;
    addressResult.msg = 'success';
    addressResult.data = {
      address: myWallet.getAddressString(),
      privateKey: myWallet.getPrivateKeyString(),
      publicKey: myWallet.getPublicKeyString(),
    };

    return addressResult;
  }

  @ApiResponse({
    status: 200,
    description: 'Obtain the balance corresponding to the current address',
    type: BaseResult<number>,
  })
  @Get('getBalance')
  async getBalance(
    @Query()
    options: BalanceQuery,
  ) {
    const userResult = new BaseResult<number>();
    userResult.code = 0;
    userResult.msg = 'success';
    if (!options.address) {
      userResult.code = -1;
      userResult.msg = 'the address is null! ';
      return userResult;
    }
    //check address
    const isPass = this.accountService.checkAddress(options.address);
    if (!isPass) {
      userResult.code = -1;
      userResult.msg = 'the address is invalid! ';
      return userResult;
    }
    try {
      const balance = await this.accountService.getBalance(options);
      userResult.data = balance.toNumber();
    } catch (error) {
      Logger.error(`getBalance error ${error.message} \n ${error.stack}`);
      userResult.msg = error.message;
    }
    return userResult;
  }

  @ApiResponse({
    status: 200,
    description: 'account transfer',
    type: BaseResult<string>,
  })
  @Get('transfer')
  async transfer(
    @Query() options: TransferQuery,
  ): Promise<BaseResult<TransactionReceipt>> {
    const addressResult = new BaseResult<TransactionReceipt>();
    addressResult.code = 0;
    addressResult.msg = 'success';

    try {
      addressResult.data = await this.accountService.transfer(options);
    } catch (error) {
      Logger.error(`transfer error ${error.message} \n ${error.stack}`);
      addressResult.code = -1;
      addressResult.msg = error.message;
    }
    return addressResult;
  }
}
