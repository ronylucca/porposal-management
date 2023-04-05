import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProposalController } from './proposal.controller';
import { ProposalService } from './proposal.service';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailgun.org',
        secure: false,
        port: 587,
        auth: {
          user: 'seu-usuario',
          pass: 'sua-senha',
        },
        ignoreTLS: true,
      },
      defaults: {
        from: '"',
      },
    }),
  ],
  controllers: [ProposalController],
  providers: [ProposalService, PrismaService],
})
export class ProposalModule {}
