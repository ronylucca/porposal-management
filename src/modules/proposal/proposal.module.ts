import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProposalController } from './proposal.controller';
import { ProposalService } from './proposal.service';
import { ProposalMailService } from './proposal.mail.service';

@Module({
  imports: [],
  controllers: [ProposalController],
  providers: [ProposalService, PrismaService, ProposalMailService],
})
export class ProposalModule {}
