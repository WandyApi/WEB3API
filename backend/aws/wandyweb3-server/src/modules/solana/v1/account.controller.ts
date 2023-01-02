import { Controller, Get, Post, Body, Query, Logger } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { generateMnemonic } from 'bip39';
import { SolanaAccountService } from '../../../supplier/solana/solana.account';
import { BaseResult } from '../../../model/base.result';
import { TransferForm } from '../../../model/form/transfer.form';
import { BalanceForm } from '../../../model/solana/account/balance.form';
import { AccountBaseForm } from 'src/model/solana/account/account.base.form';
import { AccountDTO } from 'src/model/dto/solana/account.dto';

import {
  BlockResponse,
  ConfirmedSignatureInfo,
  TransactionResponse,
} from '@solana/web3.js';
import { BlockForm } from 'src/model/solana/account/block.form';
import { TransactionForm } from 'src/model/solana/account/transaction.form';
import { TransactionsForm } from 'src/model/solana/account/transactions.form';

@ApiTags('Solana Account')
@Controller('solana/account/v1')
export class SolanaAccountController {
  constructor(private readonly solanaService: SolanaAccountService) {}
  @ApiQuery({ name: 'mnemonic', type: 'string', example: generateMnemonic() })
  @Get('createWallet')
  createWallet(@Query('mnemonic') mnemonic: string) {
    return this.solanaService.createWallet(mnemonic);
  }

  @Get('getTokenAccountsByOwner')
  async getTokenAccountsByOwner(
    @Query()
    options: AccountBaseForm,
  ) {
    let userResult = new BaseResult<Array<AccountDTO>>();
    userResult.code = 0;
    userResult.msg = 'success';
    if (!options.address) {
      userResult.code = -1;
      userResult.msg = 'the address is null! ';
      return userResult;
    }
    //check address
    const isPass = this.solanaService.checkAddress(options.address);
    if (!isPass) {
      userResult.code = -1;
      userResult.msg = 'the address is invalid! ';
      return userResult;
    }
    userResult = await this.solanaService.getTokenAccountsByOwner(options);
    return userResult;
  }

  @Get('getBalance')
  async getBalance(
    @Query()
    options: BalanceForm,
  ) {
    let userResult = new BaseResult<number>();
    userResult.code = 0;
    userResult.msg = 'success';
    if (!options.address) {
      userResult.code = -1;
      userResult.msg = 'the address is null! ';
      return userResult;
    }
    //check address
    const isPass = this.solanaService.checkAddress(options.address);
    if (!isPass) {
      userResult.code = -1;
      userResult.msg = 'the address is invalid! ';
      return userResult;
    }
    try {
      userResult = await this.solanaService.getBalance(options);
    } catch (error) {
      Logger.error(`getBalance error ${error.message} \n ${error.stack}`);
      userResult.msg = error.message;
    }
    return userResult;
  }

  @Get('getBlock')
  async getBlock(
    @Query()
    options: BlockForm,
  ) {
    const userResult = new BaseResult<BlockResponse>();
    userResult.code = 0;
    userResult.msg = 'success';
    if (!options.slot) {
      userResult.code = -1;
      userResult.msg = 'the slot is null! ';
      return userResult;
    }
    try {
      userResult.data = await this.solanaService.getBlock(options);
    } catch (error) {
      Logger.error(`getBlock error ${error.message} \n ${error.stack}`);
      userResult.msg = error.message;
    }
    return userResult;
  }

  @Get('getTransaction')
  async getTransaction(
    @Query()
    options: TransactionForm,
  ) {
    const userResult = new BaseResult<TransactionResponse>();
    userResult.code = 0;
    userResult.msg = 'success';
    if (!options.signature) {
      userResult.code = -1;
      userResult.msg = 'the signature is null! ';
      return userResult;
    }
    try {
      userResult.data = await this.solanaService.getTransaction(options);
    } catch (error) {
      Logger.error(`getBlock error ${error.message} \n ${error.stack}`);
      userResult.msg = error.message;
    }
    return userResult;
  }

  @Get('getTransactions')
  async getTransactions(
    @Query()
    options: TransactionsForm,
  ) {
    const userResult = new BaseResult<Array<ConfirmedSignatureInfo>>();
    userResult.code = 0;
    userResult.msg = 'success';
    if (!options.address) {
      userResult.code = -1;
      userResult.msg = 'the address is null! ';
      return userResult;
    }
    try {
      userResult.data = await this.solanaService.getTransactions(options);
    } catch (error) {
      Logger.error(`getBlock error ${error.message} \n ${error.stack}`);
      userResult.msg = error.message;
    }
    return userResult;
  }

  @Post('transfer')
  async transfer(@Body() transferForm: TransferForm) {
    return this.solanaService.transfer(transferForm);
  }
}
