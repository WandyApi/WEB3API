import { ApiProperty } from '@nestjs/swagger';
import { AccountBaseForm } from './account.base.form';

export class TransactionsForm extends AccountBaseForm {
  @ApiProperty({
    required: false,
    default: 1000,
    example: 5,
  })
  limit: number;

  @ApiProperty({
    required: false,
    example: '',
    description:
      'The cursor returned in the last response (for getting the next page)',
  })
  cursor: string;
}
