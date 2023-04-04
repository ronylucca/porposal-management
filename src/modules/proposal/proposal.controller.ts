import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Proposal } from '@prisma/client';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { ProposalService } from './proposal.service';

@Controller('proposal')
@ApiTags('proposals')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Get()
  async getAll() {
    return await this.proposalService.getAll();
  }

  @Get(':id')
  async getProposal(@Param('id') id: number): Promise<Proposal> {
    return this.proposalService.getById(Number(id));
  }

  @Post()
  @ApiBody({ type: CreateProposalDto })
  async create(@Body() dto: CreateProposalDto): Promise<Proposal> {
    return await this.proposalService.create(dto);
  }

  @Patch(':id')
  @ApiBody({ type: CreateProposalDto })
  async update(
    @Param('id') id: number,
    @Body() dto: CreateProposalDto,
  ): Promise<Proposal> {
    return await this.proposalService.update(dto, Number(id));
  }
}
