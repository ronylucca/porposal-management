import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { CostumerModule } from './modules/costumer/costumer.module';
import { ProposalModule } from './modules/proposal/proposal.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ProductModule,
    UserModule,
    CostumerModule,
    ProposalModule,
    AuthModule,
  ],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
