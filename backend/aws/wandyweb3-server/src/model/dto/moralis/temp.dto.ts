import { ApiProperty } from '@nestjs/swagger';

export class LogCollectionDTO {
  /** @example 273 */
  @ApiProperty({ example: '', description: '' })
  log_index: string;
}
