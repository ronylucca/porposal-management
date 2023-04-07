import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProposalController } from './proposal.controller';
import { ProposalService } from './proposal.service';
import { SendMailConsumerService } from './consumers/sendmail-consumer.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [BullModule.registerQueue({ name: 'sendMail-queue' })],
  controllers: [ProposalController],
  providers: [ProposalService, PrismaService, SendMailConsumerService],
})
export class ProposalModule {}
