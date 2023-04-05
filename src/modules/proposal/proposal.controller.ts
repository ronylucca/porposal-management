import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Proposal } from '@prisma/client';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { ProposalService } from './proposal.service';

@Controller('proposal')
@ApiTags('proposals')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Get()
  @ApiBearerAuth()
  async getAll() {
    return await this.proposalService.getAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  async getProposal(@Param('id') id: number): Promise<Proposal> {
    return this.proposalService.getById(Number(id));
  }

  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreateProposalDto })
  async create(@Body() dto: CreateProposalDto): Promise<Proposal> {
    return await this.proposalService.create(dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiBody({ type: CreateProposalDto })
  async update(
    @Param('id') id: number,
    @Body() dto: CreateProposalDto,
  ): Promise<Proposal> {
    return await this.proposalService.update(dto, Number(id));
  }

  @Post(':id/deliver')
  @ApiBearerAuth()
  async sendProposal(@Param('id') id: number) {
    return this.proposalService.sendProposal(Number(id));
  }
}
