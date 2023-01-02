import { Injectable, Logger } from '@nestjs/common';
import { EvmBaseService } from './evm.base';
import FormData from 'form-data';
import axios from 'axios';
import fs from 'fs';
import { ethers } from 'ethers';
import NFTABI from 'src/common/abi/NFT_ABI.json';
import { NftTransferDTO } from 'src/model/dto/moralis/nft/nft.transfer.dto';
import { ERC721MatedataForm } from 'src/model/form/nft/nft.metadata.form';
import {
  PINATA_API_KEY,
  PINATA_SECRET_API_KEY,
} from 'src/model/constant/token.constant';
import Wallet from 'ethereumjs-wallet';
import { NFTMintTokenQuery } from 'src/model/evm/nft/nft.mint.token.query';
import { NFTMintQuery } from 'src/model/evm/nft/nft.mint.query';

@Injectable()
export class EvmNFTService extends EvmBaseService {
  private readonly logger: Logger = new Logger(EvmNFTService.name);

  async uploadToPinata(filePath: string) {
    const data = new FormData();
    data.append('file', fs.createReadStream(filePath));
    data.append('pinataOptions', '{"cidVersion": 1}');

    const config = {
      method: 'post',
      maxContentLength: Infinity,
      url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
      headers: {
        pinata_api_key: '68f08f473c9f89e4cdfb',
        pinata_secret_api_key:
          '487ebb283253bbfd0da75bc23c618886d1ad91c5966d14ce158f1d7185b064ae',
        ...data.getHeaders(),
      },
      data: data,
    };

    try {
      const res = await axios(config);
      const fileIPFS = 'https://gateway.pinata.cloud/ipfs/' + res.data.IpfsHash;
      const metaIPFS = await this.uploadMate(fileIPFS);
      res.data.fileIPFS = fileIPFS;
      res.data.metaIPFS = metaIPFS;
      return res.data;
    } catch (error) {
      console.error(error);
      new Error(error);
    }
  }

  async uploadImg(filePath: string) {
    const data = new FormData();
    data.append('file', fs.createReadStream(filePath));
    data.append('pinataOptions', '{"cidVersion": 1}');

    const config = {
      method: 'post',
      maxContentLength: Infinity,
      url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
        ...data.getHeaders(),
      },
      data: data,
    };

    try {
      const res = await axios(config);
      const fileIPFS = 'https://gateway.pinata.cloud/ipfs/' + res.data.IpfsHash;
      res.data.fileIPFS = fileIPFS;
      return res.data;
    } catch (error) {
      Logger.error(error, EvmNFTService.name);
      new Error(error);
    }
  }

  async uploadMate(fileIPFS: string) {
    const nftName = 'WandyNFT' + Date.now();
    const metadata = {
      image: fileIPFS,
      name: nftName,
      description: nftName + ' Description',
      attributes: [
        { trait_type: 'color', value: 'brown' },
        { trait_type: 'background', value: 'white' },
      ],
    };
    const data = JSON.stringify({
      pinataOptions: {
        cidVersion: 1,
      },
      pinataMetadata: {
        name: nftName + '.json',
      },
      pinataContent: metadata,
    });

    const config = {
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      headers: {
        'Content-Type': 'application/json',
        pinata_api_key: '68f08f473c9f89e4cdfb',
        pinata_secret_api_key:
          '487ebb283253bbfd0da75bc23c618886d1ad91c5966d14ce158f1d7185b064ae',
      },
      data: data,
    };

    const jsonResponse = await axios(config);
    const { data: jsonData = {} } = jsonResponse;
    const { IpfsHash } = jsonData;
    const tokenURI = `https://gateway.pinata.cloud/ipfs/${IpfsHash}`;
    return tokenURI;
  }

  async uploadMatedata(matedate: ERC721MatedataForm) {
    const metadataName = matedate.name + ' #' + matedate.token_id;
    const metaData: any = {
      image: matedate.image_url,
      name: metadataName,
      description: matedate.description,
      attributes: matedate.attributes,
    };
    if (matedate.external_url) {
      metaData.external_url = matedate.external_url;
    }
    if (matedate.animation_url) {
      metaData.animation_url = matedate.animation_url;
    }

    const data = JSON.stringify({
      pinataOptions: {
        cidVersion: 1,
      },
      pinataMetadata: {
        name: metadataName + '.json',
      },
      pinataContent: metaData,
    });

    const config = {
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      headers: {
        'Content-Type': 'application/json',
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
      data: data,
    };

    const jsonResponse = await axios(config);
    const { data: jsonData = {} } = jsonResponse;
    const { IpfsHash } = jsonData;
    const tokenURI = `https://gateway.pinata.cloud/ipfs/${IpfsHash}`;
    return tokenURI;
  }

  async mintNFT(
    options: NFTMintQuery | NFTMintTokenQuery,
  ): Promise<NftTransferDTO> {
    const mnemonic = options.mnemonic;
    const contractAddress = options.contract_address;
    const tokenURI = options.token_uri;
    const token_id = options.token_id || Date.now();
    let privateKey = options.privateKey;
    let myWallet: Wallet;
    if (mnemonic) {
      myWallet = this.getWallet(mnemonic);

      privateKey = myWallet.getPrivateKeyString();
    } else {
      privateKey =
        privateKey.slice(0, 2) === '0x' ? privateKey.slice(2) : privateKey;
      const privateKeyBuffer = Buffer.from(privateKey, 'hex');
      myWallet = Wallet.fromPrivateKey(privateKeyBuffer);
    }
    const fromAddress = myWallet.getAddressString();
    const provider = this.getRPCurl(options.chain);
    const wallet = new ethers.Wallet(privateKey, provider);

    // Get latest nonce
    const nonce = await provider.getTransactionCount(fromAddress, 'latest');
    // Get gas price
    let gasPrice = await provider.getGasPrice();

    // gas add 40%
    const plus = Math.floor(gasPrice.toNumber() * Number(0.4));
    gasPrice = gasPrice.add(plus);
    // Get network
    const network = await provider.getNetwork();
    const { chainId } = network;

    this.logger.log('tokenURI = ' + tokenURI, EvmNFTService.name);
    const etherInterface = new ethers.utils.Interface(NFTABI);
    const mintData = etherInterface.encodeFunctionData('mint', [
      fromAddress,
      token_id,
      tokenURI,
    ]);

    //Transaction object
    const transaction = {
      from: fromAddress,
      to: contractAddress,
      nonce,
      chainId,
      gasPrice,
      data: mintData,
    };
    // //Estimate gas limit
    const estimatedGas = await provider.estimateGas(transaction);
    transaction['gasLimit'] = estimatedGas;

    //Sign & Send transaction
    const signedTx = await wallet.signTransaction(transaction);
    // const tx = await wallet.writeMethod(...);
    const transactionReceipt = await provider.sendTransaction(signedTx);
    await transactionReceipt.wait();
    const hash = transactionReceipt.hash;
    this.logger.log('Your Transaction Hash is:' + hash, EvmNFTService.name);
    // Get transaction receipt
    const receipt = await provider.getTransactionReceipt(hash);
    const { logs } = receipt;
    // Get token ID
    const tokenInBigNumber = ethers.BigNumber.from(logs[0].topics[3]);
    const tokenId = tokenInBigNumber.toNumber();
    this.logger.log('Token ID minted:' + tokenId, EvmNFTService.name);

    const nftDto = new NftTransferDTO();
    nftDto.token_id = String(tokenId);
    nftDto.transaction_hash = hash;
    return nftDto;
  }
}
