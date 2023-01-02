import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { NormalizedMetadataAttributeDTO } from './nft.normalized.metadata.attribute';

export class NormalizedMetadataDTO {
  /**
   * @description The name or title of the NFT
   * @example Moralis Mug
   */
  @ApiProperty({
    example: 'Moralis Mug',
    description: 'The name or title of the NFT',
  })
  name?: string;

  /**
   * @description A detailed description of the NFT
   * @example Moralis Coffee nug 3D Asset that can be used in 3D worldspaces. This NFT is presented as a flat PNG, a Unity3D Prefab and a standard fbx.
   */
  @ApiProperty({
    example:
      'This NFT is presented as a flat PNG, a Unity3D Prefab and a standard fbx.',
    description: 'A detailed description of the NFT',
  })
  description?: string;

  /**
   * @description The URL of the NFT's image
   * @example https://arw2wxg84h6b.moralishost.com:2053/server/files/tNJatzsHirx4V2VAep6sc923OYGxvkpBeJttR7Ks/de504bbadadcbe30c86278342fcf2560_moralismug.png
   */
  @ApiProperty({
    example:
      'https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xe004bdfd2850774b24de32185e09cb4100d1b7f9da29fb631ee9171f8656eae1/image',
    description: "The URL of the NFT's image",
  })
  image?: string;

  /**
   * @description A link to additional information
   * @example https://giphy.com/gifs/loop-recursion-ting-aaODAv1iuQdgI
   */
  @ApiProperty({
    example: 'https://giphy.com/gifs/loop-recursion-ting-aaODAv1iuQdgI',
    description: 'A link to additional information',
  })
  external_link?: string;

  /**
   * @description An animated version of the NFT's image
   * @example https://giphy.com/gifs/food-design-donuts-o9ngTPVYW4qo8
   */
  @ApiProperty({
    example: 'https://giphy.com/gifs/food-design-donuts-o9ngTPVYW4qo8',
    description: "An animated version of the NFT's image",
  })
  animation_url?: string;

  @ApiProperty({
    example: '06b293e847a4eabfe02db5a44675adf960f35461',
    description: 'dna',
  })
  dna?: string;
  @ApiProperty({
    example: '946',
    description: 'edition',
  })
  edition?: number;
  @ApiProperty({
    example: '1653326553107',
    description: 'date',
  })
  date?: number;

  /** @description A normalized metadata version of the NFT's metadata. */
  @ApiProperty({
    description:
      "A normalized metadata version of the NFT's metadata attribute.",
    type: [NormalizedMetadataAttributeDTO],
    oneOf: [{ $ref: getSchemaPath(NormalizedMetadataAttributeDTO) }],
  })
  attributes?: NormalizedMetadataAttributeDTO[];
}
