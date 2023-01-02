import { ApiProperty } from '@nestjs/swagger';
import { ERC721MatedataForm } from 'src/model/form/nft/nft.metadata.form';
import { ChainQuery } from '../../evm/chain.query';

export class NFTMintQuery extends ChainQuery {
  @ApiProperty({
    required: false,
    example:
      'liquid raven much pitch setup shallow base coconut lucky degree ancient voyage',
    description: 'The mnemonic of the payer',
  })
  mnemonic: string;

  @ApiProperty({
    required: false,
    example:
      '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d',
    description: 'The private key of the payer',
  })
  privateKey: string;

  @ApiProperty({
    example: '0x831C2c7891fBB3d4fE09934252098C7Eb9e2fdc0',
    description: 'This is a nft contract_address',
  })
  contract_address: string;

  @ApiProperty({
    required: false,
    example:
      'https://gateway.pinata.cloud/ipfs/bafkreib35zyojlkzryenrgc3toyogwt4f5t5ezj2antgq5ujanf6wnv63y',
    description: 'token_uri',
  })
  token_uri: string;

  @ApiProperty({ required: false, description: 'NFT token matedate.' })
  matedate: ERC721MatedataForm;

  @ApiProperty({ required: false, description: 'NFT token id.', example: 1122 })
  token_id: number;
}
