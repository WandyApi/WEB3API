import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserForm {
  @ApiProperty({ example: 'Harry' })
  firstName: string;

  @ApiProperty({ example: 'Potter' })
  lastName: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'xxx@gmail.com' })
  email: string;

  @ApiProperty({ example: 'http://api.google.com/avatar.jpg' })
  avatar: string;

  @ApiProperty({ example: 'Clearn Master' })
  teamName: string;
}
