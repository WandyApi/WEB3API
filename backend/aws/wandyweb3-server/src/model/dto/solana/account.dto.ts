import { ApiProperty } from '@nestjs/swagger';
import { AccountState } from '@solana/spl-token';

export class AccountDTO {
  /**
   * @description Token Address
   * @example 4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU
   */
  @ApiProperty({
    example: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
    description: 'Mint associated with the account ',
  })
  mint: string;

  @ApiProperty({
    example: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
    description: 'Owner of the account',
  })
  owner: string;

  @ApiProperty({
    example: 58462,
    description: 'Number of tokens the account holds',
  })
  amount: number;

  @ApiProperty({
    example: 0,
    description: 'delegate option',
  })
  delegateOption: 1 | 0;

  @ApiProperty({
    example: ' ',
    description: 'Authority that can transfer tokens from the account',
  })
  delegate: string;
  @ApiProperty({
    example: '1',
    description: 'True if the account is frozen',
  })
  state: AccountState;
  @ApiProperty({
    example: 1,
    description: 'True if the account is a native token account',
  })
  isNativeOption: 1 | 0;
  @ApiProperty({
    example: 1,
    description: 'True if the account is a native token account',
  })
  isNative: number;
  @ApiProperty({
    example: 465423,
    description: 'Number of tokens the delegate is authorized to transfer',
  })
  delegatedAmount: number;
  @ApiProperty({
    example: 0,
    description: 'Optional authority to close the account ',
  })
  closeAuthorityOption: 1 | 0;
  @ApiProperty({
    example: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
    description: 'Optional authority to close the account ',
  })
  closeAuthority: string;
}
