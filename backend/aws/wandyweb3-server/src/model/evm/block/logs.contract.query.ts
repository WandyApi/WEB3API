import { ApiProperty } from '@nestjs/swagger';
import { BlockPageQuery } from './block.page.query';

export class LogsContractQuery extends BlockPageQuery {
  /**
   * The block number
   * * Provide the param 'block_numer' or ('from_block' and / or 'to_block')
   * * If 'block_numer' is provided in conbinaison with 'from_block' and / or 'to_block', 'block_number' will will be used
   */
  @ApiProperty({
    required: false,
    example: '1',
    description:
      "  The block number \
    1, Provide the param 'block_numer' or ('from_block' and / or 'to_block') \
    2, If 'block_numer' is provided in conbinaison with 'from_block' and / or 'to_block', 'block_number' will will be used",
  })
  block_number?: string;

  @ApiProperty({
    required: true,
    example: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
    description: 'address',
  })
  address: string;

  /** topic0 */
  @ApiProperty({
    required: false,
    example:
      '0x2caecd17d02f56fa897705dcc740da2d237c373f70686f4e0d9bd3bf0400ea7a',
    description: 'topic0',
  })
  topic0?: string;
  /** topic1 */
  @ApiProperty({
    required: false,
    example:
      '0x000000000000000000000000031002d15b0d0cd7c9129d6f644446368deae391',
    description: 'topic1',
  })
  topic1?: string;
  /** topic2 */
  @ApiProperty({
    required: false,
    example:
      '0x000000000000000000000000d25943be09f968ba740e0782a34e710100defae9',
    description: 'topic2',
  })
  topic2?: string;
  /** topic3 */
  @ApiProperty({ required: false, description: 'topic3' })
  topic3?: string;
}
