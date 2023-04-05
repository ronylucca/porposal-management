import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class CreateProposalDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  costumerId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty({ example: '10000' })
  @IsNumberString()
  price: string;
}
