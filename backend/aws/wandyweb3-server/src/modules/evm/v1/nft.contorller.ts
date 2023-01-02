import { Controller, Get, Query, Logger, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { NFTContractQuery } from 'src/model/evm/nft/nft.contract.query';
import { NFTLowestPriceQuery } from 'src/model/evm/nft/nft.lowest.price.query';
import { NftQuery } from 'src/model/evm/nft/nft.query';
import { NftSearchQuery } from 'src/model/evm/nft/nft.search.query';
import { NFTradesQuery } from 'src/model/evm/nft/nft.trades.query';
import { NFTransfersBlockQuery } from 'src/model/evm/nft/nft.transfers.block.query';
import { NFTransfersQuery } from 'src/model/evm/nft/nft.transfers.query';

import { NFTOwnersTokenIdQuery } from 'src/model/evm/nft/nft.owners.tokenid.query';
import { NFTransfersTokenIdQuery } from 'src/model/evm/nft/nft.transfers.tokenid.query';
import { NftCollectionDTO } from '../../../model/dto/moralis/nft/nft.collection.dto';
import { NftContractMetadata } from '../../../model/dto/moralis/nft/nft.contract.metadata.dto';
import { NftDTO } from '../../../model/dto/moralis/nft/nft.dto';
import { NftMetadataCollectionDTO } from '../../../model/dto/moralis/nft/nft.metadata.collection.dto';
import { NftOwnerCollectionDTO } from '../../../model/dto/moralis/nft/nft.owner.collection.dto';
import { NftTransferCollectionDTO } from '../../../model/dto/moralis/nft/nft.transfer.collection.dto';
import { TradeDTO } from '../../../model/dto/moralis/nft/trade.dto';
import { TradeCollectionDTO } from '../../../model/dto/moralis/trade.collection.dto';

import Moralis from 'moralis';
import { chainToEvm } from 'src/common/utils/moralis.utils';
import { NFTransfersContractQuery } from 'src/model/evm/nft/nft.transfers.contract.query';
import { NFTransfersBlockHashQuery } from 'src/model/evm/nft/nft.transfers.block.hash.query';
import { NFTCollectionsWalletQuery } from 'src/model/evm/nft/nft.collections.wallet.query';
import { NFTCollectionsMetadataQuery } from 'src/model/evm/nft/nft.collections.metadata.query';
import { NFTOwnersContractQuery } from 'src/model/evm/nft/nft.owners.contract.query';
import { NFTMetadataTokenIdQuery } from 'src/model/evm/nft/nft.metadata.tokenid.query';
import { NFTMultipleQuery } from 'src/model/evm/nft/nft.multiple.query';

@ApiTags('NFT')
@Controller('evm/nft/v1')
export class NFTController {
  @Get('getNFTsByWallet')
  @ApiResponse({
    status: 200,
    description:
      'Get NFTs owned by a given address.\
    \n The response will include status [SYNCED/SYNCING] based on the contracts being indexed.\
    \n Use the token_address param to get results for a specific contract only\
    \n Note that results will include all indexed NFTs\
    \n Any request that includes the token_address param will start the indexing process for that NFT collection the very first time it is requested.',
    type: NftOwnerCollectionDTO,
  })
  async getWalletNFTs(
    @Query()
    options: NftQuery,
  ): Promise<NftOwnerCollectionDTO> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.nft.getWalletNFTs({ ...options, chain });
    } catch (error) {
      Logger.error(`getWalletNFTs error ${error.message} \n ${error.stack}`);
      return error.message;
    }
    const result = response?.result;
    const pagination = response?.pagination;
    pagination.result = result;
    return pagination;
  }

  @Get('getNFTsForContract')
  @ApiResponse({
    status: 200,
    description:
      'Get NFTs for a given contract address, including metadata for all NFTs (where available).\
    \n Results are limited to 100 per page by default\
    \n Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection.',
    type: NftCollectionDTO,
  })
  async getNFTsForContract(
    @Query()
    options: NFTContractQuery,
  ): Promise<NftOwnerCollectionDTO> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.nft.getContractNFTs({
        ...options,
        chain,
      });
      // result = await Moralis.Web3API.account.getNFTsForContract(options);
    } catch (error) {
      Logger.error(
        `getNFTsForContract error ${error.message} \n ${error.stack}`,
      );
      return error.message;
    }

    const result = response?.result;
    const pagination = response?.pagination;
    pagination.result = result;
    return pagination;
  }

  @Get('searchNFTs')
  @ApiResponse({
    status: 200,
    description: 'Gets NFTs that match a given metadata search.',
    type: NftMetadataCollectionDTO,
  })
  async searchNFTs(
    @Query()
    options: NftSearchQuery,
  ): Promise<NftMetadataCollectionDTO> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.nft.searchNFTs({
        ...options,
        chain,
      });
    } catch (error) {
      Logger.error(`searchNFTs error ${error.message} \n ${error.stack}`);
      return error.message;
    }

    return response?.raw;
  }

  @Post('getMultipleNFTs')
  @ApiResponse({
    status: 200,
    description:
      'Returns an array of NFTs specified in the request.\
    \n Note that results will include all indexed NFTs\
    \n Any request that includes the token_address param will start the indexing process for that NFT collection the very first time it is requested.\
    \n Only 25 NFTs can be fetched in one API call.',
    type: NftCollectionDTO,
  })
  async getMultipleNFTs(
    @Body()
    options: NFTMultipleQuery,
  ): Promise<NftCollectionDTO> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.nft.getMultipleNFTs({
        ...options,
        chain,
      });
    } catch (error) {
      Logger.error(`getMultipleNFTs error ${error.message} \n ${error.stack}`);
      return error.message;
    }

    return response?.raw;
  }

  @Get('getWalletNFTTransfers')
  @ApiResponse({
    status: 200,
    description:
      'Get transfers of NFTs given the wallet and other parameters..',
    type: NftTransferCollectionDTO,
  })
  async getWalletNFTTransfers(
    @Query()
    options: NFTransfersQuery,
  ): Promise<NftTransferCollectionDTO> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.nft.getWalletNFTTransfers({
        ...options,
        chain,
      });
      // result = await Moralis.Web3API.account.getNFTTransfers(options);
    } catch (error) {
      Logger.error(
        `getWalletNFTTransfers error ${error.message} \n ${error.stack}`,
      );
      return error.message;
    }

    return response?.raw;
  }

  @Get('getNFTContractTransfers')
  @ApiResponse({
    status: 200,
    description:
      'Get transfers of NFTs for a given contract and other parameters.',
    type: NftTransferCollectionDTO,
  })
  async getNFTContractTransfers(
    @Query()
    options: NFTransfersContractQuery,
  ): Promise<NftTransferCollectionDTO> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.nft.getNFTContractTransfers({
        ...options,
        chain,
      });
      // result = await Moralis.Web3API.token.getContractNFTTransfers(options);
    } catch (error) {
      Logger.error(
        `getNFTContractTransfers error ${error.message} \n ${error.stack}`,
      );
      return error.message;
    }

    return response?.raw;
  }

  @Get('getNFTTransfersFromToBlock')
  @ApiResponse({
    status: 200,
    description: 'Get transfers of NFTs from a block number to a block number.',
    type: NftTransferCollectionDTO,
  })
  async getNFTTransfersFromToBlock(
    @Query()
    options: NFTransfersBlockQuery,
  ): Promise<NftTransferCollectionDTO> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.nft.getNFTTransfersFromToBlock({
        ...options,
        chain,
      });
      // result = await Moralis.Web3API.token.getNftTransfersFromToBlock(options);
    } catch (error) {
      Logger.error(
        `getNftTransfersFromToBlock error ${error.message} \n ${error.stack}`,
      );
      return error.message;
    }

    return response?.raw;
  }

  @Get('getNFTTransfersByBlock')
  @ApiResponse({
    status: 200,
    description: 'Get transfers of NFTs given a block number or block hash.',
    type: NftTransferCollectionDTO,
  })
  async getNFTTransfersByBlock(
    @Query()
    options: NFTransfersBlockHashQuery,
  ): Promise<NftTransferCollectionDTO> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.nft.getNFTTransfersByBlock({
        ...options,
        chain,
      });
      // result = await Moralis.Web3API.native.getNFTTransfersByBlock(options);
    } catch (error) {
      Logger.error(
        `getNFTTransfersByBlock error ${error.message} \n ${error.stack}`,
      );
      return error.message;
    }

    return response?.raw;
  }

  @Get('getNFTTransfers')
  @ApiResponse({
    status: 200,
    description:
      'Get transfers of an NFT given a contract address and token ID.',
    type: NftTransferCollectionDTO,
  })
  async getNFTTransfers(
    @Query()
    options: NFTransfersTokenIdQuery,
  ): Promise<NftTransferCollectionDTO> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.nft.getNFTTransfers({
        ...options,
        chain,
      });
    } catch (error) {
      Logger.error(
        `getWalletTokenIdTransfers error ${error.message} \n ${error.stack}`,
      );
      return error.message;
    }

    return response?.raw;
  }

  @Get('getWalletNFTCollections')
  @ApiResponse({
    status: 200,
    description: 'Get NFT collections owned by a given wallet address.',
    type: NftContractMetadata,
  })
  async getWalletNFTCollections(
    @Query()
    options: NFTCollectionsWalletQuery,
  ): Promise<NftContractMetadata> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.nft.getWalletNFTCollections({
        ...options,
        chain,
      });
      // result = await Moralis.Web3API.token.getNFTMetadata(options);
    } catch (error) {
      Logger.error(
        `getWalletNFTCollections error ${error.message} \n ${error.stack}`,
      );
      return error.message;
    }

    return response?.raw;
  }

  @Get('getNFTContractMetadata')
  @ApiResponse({
    status: 200,
    description:
      'Get the collection / contract level metadata for a given contract (name, symbol, base token URI).\
    \n Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection',
    type: NftContractMetadata,
  })
  async getNFTContractMetadata(
    @Query()
    options: NFTCollectionsMetadataQuery,
  ): Promise<NftContractMetadata> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.nft.getNFTContractMetadata({
        ...options,
        chain,
      });
      // result = await Moralis.Web3API.token.getNFTMetadata(options);
    } catch (error) {
      Logger.error(
        `getNFTContractMetadata error ${error.message} \n ${error.stack}`,
      );
      return error.message;
    }

    return response?.raw;
  }

  @Get('getNFTOwners')
  @ApiResponse({
    status: 200,
    description:
      'Get owners of NFTs for a given contract.\
    \n Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection.',
    type: NftOwnerCollectionDTO,
  })
  async getNFTOwners(
    @Query()
    options: NFTOwnersContractQuery,
  ): Promise<NftOwnerCollectionDTO> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.nft.getNFTOwners({
        ...options,
        chain,
      });
      // result = await Moralis.Web3API.token.getNFTOwners(options);
    } catch (error) {
      Logger.error(`getNFTOwners error ${error.message} \n ${error.stack}`);
      return error.message;
    }

    return response?.raw;
  }

  @Get('getNFTTokenIdOwners')
  @ApiResponse({
    status: 200,
    description:
      'Get owners of a specific NFT given the contract address and token ID.\
    \n Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection',
    type: NftOwnerCollectionDTO,
  })
  async getNFTTokenIdOwners(
    @Query()
    options: NFTOwnersTokenIdQuery,
  ): Promise<NftOwnerCollectionDTO> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.nft.getNFTTokenIdOwners({
        ...options,
        chain,
      });
      // result = await Moralis.Web3API.token.getTokenIdOwners(options);
    } catch (error) {
      Logger.error(
        `getNFTTokenIdOwners error ${error.message} \n ${error.stack}`,
      );
      return error.message;
    }

    return response?.raw;
  }

  @Get('getNFTTrades')
  @ApiResponse({
    status: 200,
    description: 'Get trades of NFTs for a given contract and marketplace.',
    type: TradeCollectionDTO,
  })
  async getNFTTrades(
    @Query()
    options: NFTradesQuery,
  ): Promise<TradeCollectionDTO> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.nft.getNFTTrades({
        ...options,
        chain,
      });
      // result = await Moralis.Web3API.token.getNFTTrades(options);
    } catch (error) {
      Logger.error(`getNFTTrades error ${error.message} \n ${error.stack}`);
      return error.message;
    }

    return response?.raw;
  }

  @Get('getNFTLowestPrice')
  @ApiResponse({
    status: 200,
    description:
      'Get the lowest price found for a nft token contract for the last x days (only trades paid in ETH)',
    type: TradeDTO,
  })
  async getNFTLowestPrice(
    @Query()
    options: NFTLowestPriceQuery,
  ): Promise<TradeDTO> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.nft.getNFTLowestPrice({
        ...options,
        chain,
      });
      // result = await Moralis.Web3API.token.getNFTLowestPrice(options);
    } catch (error) {
      Logger.error(
        `getNFTLowestPrice error ${error.message} \n ${error.stack}`,
      );
      return error.message;
    }

    return response?.raw;
  }

  @Get('getNFTMetadata')
  @ApiResponse({
    status: 200,
    description: 'Gets NFTs that match a given metadata search.',
    type: NftDTO,
  })
  async getNFTMetadata(
    @Query()
    options: NFTMetadataTokenIdQuery,
  ): Promise<NftDTO> {
    let response: any;
    try {
      const chain = chainToEvm(options.chain);
      delete options.chain;
      response = await Moralis.EvmApi.nft.getNFTMetadata({
        ...options,
        chain,
      });
      // result = await Moralis.Web3API.token.getTokenIdMetadata(options);
    } catch (error) {
      Logger.error(`getNFTMetadata error ${error.message} \n ${error.stack}`);
      return error.message;
    }

    return response?.raw;
  }
}
