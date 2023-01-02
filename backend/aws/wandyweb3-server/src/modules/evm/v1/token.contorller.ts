import { Controller, Get, Query, Logger } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import Moralis from 'moralis';
import { chainToEvm } from 'src/common/utils/moralis.utils';
import { TokenAllowanceQuery } from 'src/model/evm/token/token.allowance.query';
import { TokenBalanceQuery } from 'src/model/evm/token/token.balance.query';
import { TokenMetadataQuery } from 'src/model/evm/token/token.metadata.query';
import { TokenMetadataSymbolQuery } from 'src/model/evm/token/token.metadata.symbol.query';
import { TokenPriceQuery } from 'src/model/evm/token/token.price.query';
import { TokenTransactionsContractQuery } from 'src/model/evm/token/token.transactions.contract.query';
import { TokenTransactionsWalletQuery } from 'src/model/evm/token/token.transactions.wallet.query';
import { Erc20MetadataDTO } from '../../../model/dto/moralis/token/erc20.metadata.dto';
import { Erc20PriceDTO } from '../../../model/dto/moralis/token/erc20.price.dto';
import { Erc20TokenBalanceDTO } from '../../../model/dto/moralis/token/erc20.token.balance.dto';
import { Erc20TransactionCollectionDTO } from '../../../model/dto/moralis/token/erc20.transaction.collection.dto';

@ApiTags('Token')
@Controller('evm/token/v1')
export class TokenController {
  @Get('getTokenPrice')
  @ApiResponse({
    status: 200,
    description:
      "Get the token price denominated in the blockchain's native token and USD.",
    type: [Erc20PriceDTO],
  })
  async getTokenPrice(
    @Query()
    options: TokenPriceQuery,
  ): Promise<Erc20PriceDTO> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.token.getTokenPrice({
        ...options,
        chain,
      });
    } catch (error) {
      Logger.error(`getTokenPrice error ${error.message} \n ${error.stack}`);
      return error.message;
    }

    return response?.raw;
  }

  @Get('getWalletTokenBalances')
  @ApiResponse({
    status: 200,
    description: 'Get token balances for a specific wallet address.',
    type: [Erc20TokenBalanceDTO],
  })
  async getWalletTokenBalances(
    @Query()
    options: TokenBalanceQuery,
  ): Promise<Array<Erc20TokenBalanceDTO>> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.token.getWalletTokenBalances({
        ...options,
        chain,
      });
    } catch (error) {
      Logger.error(`getTokenBalances error ${error.message} \n ${error.stack}`);
      return error.message;
    }

    return response?.raw;
  }

  @Get('getTokenAllowance')
  @ApiResponse({
    status: 200,
    description:
      'Get the amount which the spender is allowed to withdraw on behalf of the owner.',
  })
  async getTokenAllowance(
    @Query()
    options: TokenAllowanceQuery,
  ): Promise<string> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.token.getTokenAllowance({
        ...options,
        chain,
      });
    } catch (error) {
      Logger.error(
        `getTokenAllowance error ${error.message} \n ${error.stack}`,
      );
      return error.message;
    }

    return response?.raw;
  }

  @Get('getWalletTokenTransfers')
  @ApiResponse({
    status: 200,
    description:
      'Get ERC20 token transactions ordered by block number in descending order.',
    type: Erc20TransactionCollectionDTO,
  })
  async getWalletTokenTransfers(
    @Query()
    options: TokenTransactionsWalletQuery,
  ): Promise<Erc20TransactionCollectionDTO> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.token.getWalletTokenTransfers({
        ...options,
        chain,
      });
    } catch (error) {
      Logger.error(
        `getWalletTokenTransfers error ${error.message} \n ${error.stack}`,
      );
      return error.message;
    }

    return response?.raw;
  }

  @Get('getTokenTransfers')
  @ApiResponse({
    status: 200,
    description:
      'Get ERC20 token transactions from a contract ordered by block number in descending order.',
    type: Erc20TransactionCollectionDTO,
  })
  async getTokenTransfers(
    @Query()
    options: TokenTransactionsContractQuery,
  ): Promise<Erc20TransactionCollectionDTO> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.token.getTokenTransfers({
        ...options,
        chain,
      });
    } catch (error) {
      Logger.error(
        `getTokenTransfers error ${error.message} \n ${error.stack}`,
      );
      return error.message;
    }

    return response?.raw;
  }

  @Get('getTokenMetadata')
  @ApiResponse({
    status: 200,
    description:
      'Get the metadata for a given token contract address (name, symbol, decimals, logo).',
    type: [Erc20MetadataDTO],
  })
  async getTokenMetadata(
    @Query()
    options: TokenMetadataQuery,
  ): Promise<Array<Erc20MetadataDTO>> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.token.getTokenMetadata({
        ...options,
        chain,
      });
    } catch (error) {
      Logger.error(`getTokenMetadata error ${error.message} \n ${error.stack}`);
      return error.message;
    }

    return response?.raw;
  }

  @Get('getTokenMetadataBySymbol')
  @ApiResponse({
    status: 200,
    description:
      'Get the metadata for a list of token symbols (name, symbol, decimals, logo).',
    type: [Erc20MetadataDTO],
  })
  async getTokenMetadataBySymbol(
    @Query()
    options: TokenMetadataSymbolQuery,
  ): Promise<Array<Erc20MetadataDTO>> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.token.getTokenMetadataBySymbol({
        ...options,
        chain,
      });
    } catch (error) {
      Logger.error(
        `getTokenMetadataBySymbol error ${error.message} \n ${error.stack}`,
      );
      return error.message;
    }

    return response?.raw;
  }
}
