import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProposalController } from './proposal.controller';
import { ProposalService } from './proposal.service';

@Module({
  controllers: [ProposalController],
  providers: [ProposalService, PrismaService],
})
export class ProposalModule {}
