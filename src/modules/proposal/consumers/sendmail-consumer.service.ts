import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import {
  BadRequestException,
  Inject,
  Logger,
  forwardRef,
} from '@nestjs/common';
import { Job } from 'bull';
import { ProposalService } from 'src/modules/proposal/proposal.service';
import { SendMail } from '../interfaces/sendmail';

@Processor('sendMail-queue')
export class SendMailConsumerService {
  private logger = new Logger(SendMailConsumerService.name);

  constructor(
    @Inject(forwardRef(() => MailerService))
    private mailerService: MailerService,
    private proposalService: ProposalService,
  ) {}
  @Process('sendMail-job')
  async sendProposalMail(job: Job<SendMail>) {
    const { data } = job;
    try {
      this.logger.log(
        `Preparing to send a proposal by mail to ${data.costumerName}`,
      );
      await this.mailerService.sendMail({
        to: data.to,
        from: process.env.MAIL_COMERCIAL,
        subject: process.env.MAIL_SUBJECT,
        html: `<h3 style="color: #0E77AC">Caro cliente ${data.costumerName}, o serviço ${data.productName}
        está disponível e pronto para início. Vamos fechar em R$\ ${data.proposalPrice}?</h3>`,
      });
    } catch (error) {
      throw new BadRequestException('Please, verify application credentials');
    }
    await this.proposalService.markProposalAsSent(data.proposalId);
    this.logger.log('proposal has been updated as sent');
  }
}
