import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll() {
    return await this.productService.getAll();
  }

  @Get(':id')
  async getProduct(@Param('id') id: number): Promise<Product> {
    return this.productService.getById(Number(id));
  }

  @Post()
  @ApiBody({ type: CreateProductDto })
  async create(@Body() dto: CreateProductDto): Promise<Product> {
    return await this.productService.createProduct(dto);
  }

  @Patch(':id')
  @ApiBody({ type: CreateProductDto })
  async update(
    @Param('id') id: number,
    @Body() dto: CreateProductDto,
  ): Promise<Product> {
    console.log(id);
    return await this.productService.updateProduct(dto, Number(id));
  }
}
