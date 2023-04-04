import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CostumerController } from './costumer.controller';
import { CostumerService } from './costumer.service';

@Module({
  controllers: [CostumerController],
  providers: [CostumerService, PrismaService],
})
export class CostumerModule {}
