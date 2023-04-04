import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [ProductModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
