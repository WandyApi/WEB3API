import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class ERC721MatedataForm {
  @IsNotEmpty()
  @ApiProperty({ description: 'Name of the item.', example: 'Black Cat' })
  name: string;

  @ApiProperty({ description: 'NFT token id.', example: 1122 })
  token_id: number;

  @ApiProperty({
    description:
      'This is the URL to the image of the item. Can be just about any type of image \
      (including SVGs, which will be cached into PNGs by OpenSea), and can be IPFS URLs or paths.\
      We recommend using a 350 x 350 image.',
    example:
      'https://gateway.pinata.cloud/ipfs/bafybeibry725dichmr5n6aju4lifkf4wnkqz6v2nbbw2bfprtq3zearifa',
  })
  image_url?: string;

  @ApiProperty({
    required: false,
    description:
      'A human readable description of the item. Markdown is supported.',
    example: 'This is Black Cat nft!',
  })
  description?: string;

  @ApiProperty({
    required: false,
    description:
      'This is the URL that will appear below the asset is image on OpenSea and will allow users \
      to leave OpenSea and view the item on your site.',
    example: 'https://www.wandyapi.xyz',
  })
  external_url?: string;

  @ApiProperty({
    required: false,
    description:
      'A URL to a multi-media attachment for the item. The file extensions GLTF,\
       GLB, WEBM, MP4, M4V, OGV, and OGG are supported, along with the audio-only extensions MP3, \
       WAV, and OGA. Animation_url also supports HTML pages, allowing you to build rich experiences \
       and interactive NFTs using JavaScript canvas, WebGL, and more. Scripts and relative paths within \
       the HTML page are now supported. However, access to browser extensions is not supported.',
    example: 'https://www.wandyapi.xyz',
  })
  animation_url?: string;

  @ApiProperty({
    required: false,
    description: '',
    example: [{ trait_type: 'color', value: 'black' }],
  })
  attributes?: Array<Attri>;
}

type Attri = {
  display_type?: string;
  trait_type: string;
  value: string | number;
};
