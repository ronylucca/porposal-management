import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Proposal } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateProposalDto } from './dto/create-proposal.dto';

@Injectable()
export class ProposalService {
  protected logger = new Logger(this.constructor.name);

  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.proposal.findMany();
  }

  /**
   * @description Creates User
   * @param CreateUserDto
   * @returns {Proposal}
   * @emits BadRequestException
   */
  async create(dto: CreateProposalDto): Promise<Proposal> {
    try {
      return await this.prisma.proposal.create({
        data: {
          ...dto,
          delivered: false,
        },
      });
    } catch (error) {
      this.logger.error(
        `Could not create user - ${error.message}`,
        error.stack,
      );
      throw new BadRequestException(
        'User could not be crated. Check data request',
      );
    }
  }

  async getById(id: number): Promise<Proposal> {
    const proposal = await this.prisma.proposal.findUnique({
      where: {
        id,
      },
    });
    if (!proposal) {
      throw new NotFoundException();
    }
    return proposal;
  }

  /**
   * @description Creates Product
   * @param CreateProposalDto
   * @returns {Proposal}
   * @emits BadRequestException
   */
  async update(
    dto: CreateProposalDto,
    id: number,
    delivered = false,
  ): Promise<Proposal> {
    try {
      return await this.prisma.proposal.update({
        where: { id: id },
        data: { delivered: delivered, ...dto },
      });
    } catch (error) {
      this.logger.error(
        `Could not update proposal - ${error.message}`,
        error.stack,
      );
      throw new BadRequestException(
        'User could not be updated. Check data request',
      );
    }
  }
}
