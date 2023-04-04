import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProposalDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  costumerId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  productId: number;
}
