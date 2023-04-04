import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Costumer } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateCostumerDto } from './dto/create-costumer.dto';

@Injectable()
export class CostumerService {
  protected logger = new Logger(this.constructor.name);

  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.costumer.findMany();
  }

  /**
   * @description Creates User
   * @param CreateCostumerDto
   * @returns {Costumer}
   * @emits BadRequestException
   */
  async create(dto: CreateCostumerDto): Promise<Costumer> {
    try {
      return await this.prisma.costumer.create({
        data: {
          ...dto,
        },
      });
    } catch (error) {
      this.logger.error(
        `Could not create costumer - ${error.message}`,
        error.stack,
      );
      throw new BadRequestException(
        'Costumer could not be crated. Check data request',
      );
    }
  }

  async getById(id: number): Promise<Costumer> {
    const costumer = await this.prisma.costumer.findUnique({
      where: {
        id,
      },
    });
    if (!costumer) {
      throw new NotFoundException();
    }
    return costumer;
  }

  /**
   * @description Creates Costumer
   * @param CreateCostumerDto
   * @returns {Costumer}
   * @emits BadRequestException
   */
  async update(dto: CreateCostumerDto, id: number): Promise<Costumer> {
    try {
      return await this.prisma.costumer.update({
        where: { id: id },
        data: {
          ...dto,
        },
      });
    } catch (error) {
      this.logger.error(
        `Could not update costumer - ${error.message}`,
        error.stack,
      );
      throw new BadRequestException(
        'Costumer could not be updated. Check data request',
      );
    }
  }
}
