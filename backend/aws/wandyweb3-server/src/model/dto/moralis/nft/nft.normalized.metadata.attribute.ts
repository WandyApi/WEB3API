import { ApiProperty } from '@nestjs/swagger';

export class NormalizedMetadataAttributeDTO {
  /**
   * @description The trait title or descriptor
   * @example Eye Color
   */
  @ApiProperty({
    example: 'Eye Color',
    description: 'The trait title or descriptor',
  })
  trait_type?: string;

  /**
   * @description The value of the attribute
   * @example hazel
   */
  @ApiProperty({
    example: 'hazel',
    description: 'The value of the attribute',
  })
  value?: {
    [key: string]: unknown;
  };

  /**
   * @description The type the attribute value should be displayed as
   * @example string
   */
  @ApiProperty({
    example: 'The type the attribute value should be displayed as',
    description: 'number',
  })
  display_type?: string;

  /**
   * @description For numeric values, the upper range
   * @example 100
   */
  @ApiProperty({
    example: 'For numeric values, the upper range',
    description: '100',
  })
  max_value?: number;

  /**
   * @description The number of possible values for this trait
   * @example 7
   */
  @ApiProperty({
    example: '7',
    description: 'The number of possible values for this trait',
  })
  trait_count?: number;

  /**
   * @description Order the trait should appear in the attribute list.
   * @example 1
   */
  @ApiProperty({
    example: '1',
    description: 'Order the trait should appear in the attribute list.',
  })
  order?: number;
}
