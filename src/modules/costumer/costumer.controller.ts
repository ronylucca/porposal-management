import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Costumer } from '@prisma/client';
import { CreateCostumerDto } from './dto/create-costumer.dto';
import { CostumerService } from './costumer.service';

@Controller('costumer')
@ApiTags('costumers')
export class CostumerController {
  constructor(private readonly costumerService: CostumerService) {}

  @Get()
  @ApiBearerAuth()
  async getAll() {
    return await this.costumerService.getAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  async getCostumer(@Param('id') id: number): Promise<Costumer> {
    return this.costumerService.getById(Number(id));
  }

  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreateCostumerDto })
  async create(@Body() dto: CreateCostumerDto): Promise<Costumer> {
    return await this.costumerService.create(dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiBody({ type: CreateCostumerDto })
  async update(
    @Param('id') id: number,
    @Body() dto: CreateCostumerDto,
  ): Promise<Costumer> {
    console.log(id);
    return await this.costumerService.update(dto, Number(id));
  }
}
