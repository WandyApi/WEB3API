import { Controller, Get, Query, Logger, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import Moralis from 'moralis';

import { BlockDateDTO } from '../../../model/dto/moralis/block/block.date.dto';
import { BlockDTO } from '../../../model/dto/moralis/block/block.dto';
import { BlockTransactionDTO } from '../../../model/dto/moralis/block/block.transaction.dto';
import { LogCollectionDTO } from '../../../model/dto/moralis/log.collection.dto';
import { LogEventDTO } from '../../../model/dto/moralis/log.event.dto';
import { Body } from '@nestjs/common';
import { BlockNumberHashQuery } from 'src/model/evm/block/block.number.hash.query';
import { BlockDateQuery } from 'src/model/evm/block/block.date.query';
import { LogsContractQuery } from 'src/model/evm/block/logs.contract.query';
import { ContractEventsQuery } from 'src/model/evm/block/contract.events.query';
import { TransactionHashQuery } from 'src/model/evm/block/transaction.hash.query';
import { ContractFunctionQuery } from 'src/model/evm/block/contract.function.query';
import { chainToEvm } from 'src/common/utils/moralis.utils';
import { TransactionWalletQuery } from 'src/model/evm/block/transaction.wallet.query';

@ApiTags('Block')
@ApiResponse({ status: 403, description: 'Forbidden' })
@Controller('evm/block/v1')
export class BlockController {
  @Get('getBlock')
  @ApiResponse({
    status: 200,
    description: 'Get the contents of a block given the block hash.',
    type: BlockDTO,
  })
  async getBlock(
    @Query()
    options: BlockNumberHashQuery,
  ): Promise<BlockDTO> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.block.getBlock({
        ...options,
        chain,
      });
    } catch (error) {
      Logger.error(`getBlock error ${error.message} \n ${error.stack}`);
      return error.message;
    }

    return response?.raw;
  }

  @Get('getDateToBlock')
  @ApiResponse({
    status: 200,
    description: 'Get the closest block given the date.',
    type: BlockDateDTO,
  })
  async getDateToBlock(
    @Query()
    options: BlockDateQuery,
  ): Promise<BlockDateDTO> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.block.getDateToBlock({
        ...options,
        chain,
      });
    } catch (error) {
      Logger.error(`getDateToBlock error ${error.message} \n ${error.stack}`);
      return error.message;
    }

    return response?.raw;
  }

  @Get('getContractLogs')
  @ApiResponse({
    status: 200,
    description: 'Returns the contents of a block',
    type: BlockDateDTO,
  })
  async getContractLogs(
    @Query()
    options: LogsContractQuery,
  ): Promise<LogCollectionDTO> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.events.getContractLogs({
        ...options,
        chain,
      });
    } catch (error) {
      Logger.error(`getContractLogs error ${error.message} \n ${error.stack}`);
      return error.message;
    }

    return response?.raw;
  }

  @Post('getContractEvents')
  @ApiResponse({
    status: 200,
    description: 'Returns the contents of a block',
    type: [LogEventDTO],
  })
  async getContractEvents(
    @Body()
    options: ContractEventsQuery,
  ): Promise<LogEventDTO[]> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.events.getContractEvents({
        ...options,
        chain,
      });
    } catch (error) {
      Logger.error(
        `getContractEvents error ${error.message} \n ${error.stack}`,
      );
      return error.message;
    }
    return response?.raw;
  }

  @Get('getWalletTransactions')
  @ApiResponse({
    status: 200,
    description:
      'Get native transactions ordered by block number in descending order.',
    type: BlockTransactionDTO,
  })
  async getWalletTransactions(
    @Query()
    options: TransactionWalletQuery,
  ): Promise<BlockTransactionDTO> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.transaction.getWalletTransactions({
        ...options,
        chain,
      });
    } catch (error) {
      Logger.error(
        `getWalletTransactions error ${error.message} \n ${error.stack}`,
      );
      return error.message;
    }

    return response?.raw;
  }

  @Get('getWalletTransactionsVerbose')
  @ApiResponse({
    status: 200,
    description:
      'Get native transactions and logs ordered by block number in descending order.',
    type: BlockTransactionDTO,
  })
  async getWalletTransactionsVerbose(
    @Query()
    options: TransactionWalletQuery,
  ): Promise<BlockTransactionDTO> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.transaction.getWalletTransactionsVerbose({
        ...options,
        chain,
      });
      // result = await Moralis.Web3API.native.getTransaction(options);
    } catch (error) {
      Logger.error(
        `getWalletTransactionsVerbose error ${error.message} \n ${error.stack}`,
      );
      return error.message;
    }

    return response?.raw;
  }

  @Get('getTransaction')
  @ApiResponse({
    status: 200,
    description:
      'Get the contents of a transaction by the given transaction hash.',
    type: BlockTransactionDTO,
  })
  async getTransaction(
    @Query()
    options: TransactionHashQuery,
  ): Promise<BlockTransactionDTO> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.transaction.getTransaction({
        ...options,
        chain,
      });
      // result = await Moralis.Web3API.native.getTransaction(options);
    } catch (error) {
      Logger.error(`getTransaction error ${error.message} \n ${error.stack}`);
      return error.message;
    }

    return response?.raw;
  }

  @Post('runContractFunction')
  @ApiResponse({
    status: 200,
    description:
      'Run a given function of a contract ABI and retrieve readonly data.',
  })
  async runContractFunction(
    @Body()
    options: ContractFunctionQuery,
  ): Promise<string> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.utils.runContractFunction({
        ...options,
        chain,
      });
    } catch (error) {
      Logger.error(
        `runContractFunction error ${error.message} \n ${error.stack}`,
      );
      return error.message;
    }

    return response?.raw;
  }
}
