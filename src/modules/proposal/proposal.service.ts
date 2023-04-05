import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Proposal } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { ProposalMailService } from './proposal.mail.service';

@Injectable()
export class ProposalService {
  protected logger = new Logger(this.constructor.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly proposalMailService: ProposalMailService,
  ) {}

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
        },
      });
    } catch (error) {
      this.logger.error(
        `Could not create proposal - ${error.message}`,
        error.stack,
      );
      throw new BadRequestException(
        'Proposal could not be crated. Check data request',
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
  async update(dto: CreateProposalDto, id: number): Promise<Proposal> {
    try {
      return await this.prisma.proposal.update({
        where: { id: id },
        data: { ...dto },
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

  async sendProposal(id: number) {
    const proposal = await this.prisma.proposal.findUnique({
      where: { id },
      include: { costumer: true, product: true },
    });
    if (!proposal) {
      throw new NotFoundException('Proposal does not exist for requested Id');
    }
    const { costumer, product } = proposal;

    try {
      await this.proposalMailService.sendProposalMail(
        costumer.email,
        costumer.name,
        product.name,
        Number(proposal.price),
      );
    } catch (error) {
      throw new BadRequestException(
        'An error ocurred sending Costumer proposal',
      );
    }
    await this.markProposalAsSent(proposal.id);
  }

  async markProposalAsSent(id: number) {
    try {
      await this.prisma.proposal.update({
        where: { id },
        data: { sentAt: new Date() },
      });
    } catch (error) {
      this.logger.error(
        `Could not update proposal - ${error.message}`,
        error.stack,
      );
      throw new BadRequestException(
        'Proposal could not be updated. Check data request',
      );
    }
  }
}
