import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ProposalMailService {
  protected logger = new Logger(this.constructor.name);

  constructor(private mailerService: MailerService) {}

  async sendProposalMail(
    to: string,
    costumerName: string,
    productName: string,
    proposalPrice: number,
  ) {
    try {
      await this.mailerService.sendMail({
        to: to,
        from: process.env.MAIL_COMERCIAL,
        subject: process.env.MAIL_SUBJECT,
        html: `<h3 style="color: #0E77AC">Caro cliente ${costumerName}, o serviço ${productName}
        está disponível e pronto para início. Vamos fechar em R$\ ${proposalPrice}?</h3>`,
      });
    } catch (error) {
      throw new BadRequestException('Please, verify application credentials');
    }
  }
}
