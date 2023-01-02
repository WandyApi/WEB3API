import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { BlockTransactionDTO } from './block.transaction.dto';

export class BlockDTO {
  /**
   * @description The block timestamp
   * @example 2021-05-07T11:08:35.000Z
   */
  @ApiProperty({
    example: '2021-05-07T11:08:35.000Z',
    description: 'The block timestamp',
  })
  timestamp: string;
  /**
   * @description The block number
   * @example 12386788
   */
  @ApiProperty({ example: '12386788', description: 'The block number' })
  number: string;
  /**
   * @description The block hash
   * @example 0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171
   */
  @ApiProperty({
    example:
      '0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171',
    description: 'The block hash',
  })
  hash: string;
  /**
   * @description The block hash of the parent block
   * @example 0x011d1fc45839de975cc55d758943f9f1d204f80a90eb631f3bf064b80d53e045
   */
  @ApiProperty({
    example:
      '0x011d1fc45839de975cc55d758943f9f1d204f80a90eb631f3bf064b80d53e045',
    description: 'The block hash of the parent block',
  })
  parent_hash: string;
  /**
   * @description The nonce
   * @example 0xedeb2d8fd2b2bdec
   */
  @ApiProperty({ example: '0xedeb2d8fd2b2bdec', description: 'The nonce' })
  nonce: string;
  /** @example 0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347 */
  @ApiProperty({
    example:
      '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
    description: '',
  })
  sha3_uncles: string;
  /** @example 0xdde5fc46c5d8bcbd58207bc9f267bf43298e23791a326ff02661e99790da9996b3e0dd912c0b8202d389d282c56e4d11eb2dec4898a32b6b165f1f4cae6aa0079498eab50293f3b8defbf6af11bb75f0408a563ddfc26a3323d1ff5f9849e95d5f034d88a757ddea032c75c00708c9ff34d2207f997cc7d93fd1fa160a6bfaf62a54e31f9fe67ab95752106ba9d185bfdc9b6dc3e17427f844ee74e5c09b17b83ad6e8fc7360f5c7c3e4e1939e77a6374bee57d1fa6b2322b11ad56ad0398302de9b26d6fbfe414aa416bff141fad9d4af6aea19322e47595e342cd377403f417dfd396ab5f151095a5535f51cbc34a40ce9648927b7d1d72ab9daf253e31daf */
  @ApiProperty({
    example:
      '0xdde5fc46c5d8bcbd58207bc9f267bf43298e23791a326ff02661e99790da9996b3e0dd912c0b8202d389d282c56e4d11eb2dec4898a32b6b165f1f4cae6aa0079498eab50293f3b8defbf6af11bb75f0408a563ddfc26a3323d1ff5f9849e95d5f034d88a757ddea032c75c00708c9ff34d2207f997cc7d93fd1fa160a6bfaf62a54e31f9fe67ab95752106ba9d185bfdc9b6dc3e17427f844ee74e5c09b17b83ad6e8fc7360f5c7c3e4e1939e77a6374bee57d1fa6b2322b11ad56ad0398302de9b26d6fbfe414aa416bff141fad9d4af6aea19322e47595e342cd377403f417dfd396ab5f151095a5535f51cbc34a40ce9648927b7d1d72ab9daf253e31daf',
    description: '',
  })
  logs_bloom: string;
  /** @example 0xe4c7bf3aff7ad07f9e80d57f7189f0252592fee6321c2a9bd9b09b6ce0690d27 */
  @ApiProperty({
    example:
      '0xe4c7bf3aff7ad07f9e80d57f7189f0252592fee6321c2a9bd9b09b6ce0690d27',
    description: '',
  })
  transactions_root: string;
  /** @example 0x49e3bfe7b618e27fde8fa08884803a8458b502c6534af69873a3cc926a7c724b */
  @ApiProperty({
    example:
      '0x49e3bfe7b618e27fde8fa08884803a8458b502c6534af69873a3cc926a7c724b',
    description: '',
  })
  state_root: string;
  /** @example 0x7cf43d7e837284f036cf92c56973f5e27bdd253ca46168fa195a6b07fa719f23 */
  @ApiProperty({
    example:
      '0x7cf43d7e837284f036cf92c56973f5e27bdd253ca46168fa195a6b07fa719f23',
    description: '',
  })
  receipts_root: string;
  /**
   * @description The address of the miner
   * @example 0xea674fdde714fd979de3edf0f56aa9716b898ec8
   */
  @ApiProperty({
    example: '0xea674fdde714fd979de3edf0f56aa9716b898ec8',
    description: 'The address of the miner',
  })
  miner: string;
  /**
   * @description The difficulty of the block
   * @example 7253857437305950
   */
  @ApiProperty({
    example: '7253857437305950',
    description: 'The difficulty of the block',
  })
  difficulty: string;
  /**
   * @description The total difficulty
   * @example 24325637817906576196890
   */
  @ApiProperty({
    example: '24325637817906576196890',
    description: 'The total difficulty',
  })
  total_difficulty: string;
  /**
   * @description The block size
   * @example 61271
   */
  @ApiProperty({ example: '61271', description: 'The block size' })
  size: string;
  /** @example 0x65746865726d696e652d6575726f70652d7765737433 */
  @ApiProperty({
    example: '0x65746865726d696e652d6575726f70652d7765737433',
    description: '',
  })
  extra_data: string;
  /**
   * @description The gas limit
   * @example 14977947
   */
  @ApiProperty({ example: '14977947', description: 'The gas limit' })
  gas_limit: string;
  /**
   * @description The gas used
   * @example 14964688
   */
  @ApiProperty({ example: '14964688', description: 'The gas used' })
  gas_used: string;
  /**
   * @description The number of transactions in the block
   * @example 252
   */
  @ApiProperty({
    example: '252',
    description: 'The number of transactions in the block',
  })
  transaction_count: string;
  /** @description The transactions in the block */
  @ApiProperty({
    description: 'The transactions in the block',
    type: [BlockTransactionDTO],
    oneOf: [{ $ref: getSchemaPath(BlockTransactionDTO) }],
  })
  transactions: BlockTransactionDTO[];
}
