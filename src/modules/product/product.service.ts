import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  protected logger = new Logger(this.constructor.name);

  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.product.findMany({ include: { proposals: true } });
  }

  /**
   * @description Creates Product
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
        `Could not create product - ${error.message}`,
        error.stack,
      );
      throw new BadRequestException(
        'Product could not be crated. Check data request',
      );
    }
  }

  async getById(id: number): Promise<Product> {
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

  /**
   * @description Creates Product
   * @param CreateProductDto
   * @returns {Product}
   * @emits BadRequestException
   */
  async updateProduct(dto: CreateProductDto, id: number): Promise<Product> {
    try {
      return await this.prisma.product.update({
        where: { id: id },
        data: {
          ...dto,
        },
      });
    } catch (error) {
      this.logger.error(
        `Could not update product - ${error.message}`,
        error.stack,
      );
      throw new BadRequestException(
        'Product could not be updated. Check data request',
      );
    }
  }
}
