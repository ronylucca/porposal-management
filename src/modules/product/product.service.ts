import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

export class ProductService {
  protected logger = new Logger(this.constructor.name);

  constructor(private readonly prisma: PrismaService) {}

  getProducts() {
    return this.prisma.product.findMany();
  }

  /**
   * @description request Product creation and persists data
   * @param CreateProductDto
   * @returns {Product}
   * @emits BadRequestException
   */
  async createProduct(dto: CreateProductDto): Promise<Product> {
    try {
      return await this.prisma.product.create({
        data: {
          ...dto,
        },
      });
    } catch (error) {
      this.logger.error(
        'Could not create product - ${error.message}',
        error.stack,
      );
      throw new BadRequestException(
        'Product could not be crated. Check data request',
      );
    }
  }

  async getProductsById(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }
}
