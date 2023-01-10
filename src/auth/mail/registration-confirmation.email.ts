import { User } from 'src/users/entities/user.entity';
import { MailData } from '../../mail/interfaces/mail-data.interface';
import { MailService } from '../../mail/mail.service';
import { AppConfigEnum } from '../../config/app.config';

// TODO: Implements
export class RegistrationConfirmationEmail extends MailService {
  private user: User;
  private readonly mailDirectory = this.configService.get<string>(
    'app.' + AppConfigEnum.mailDirectory,
  );
  // constructor(user: User) {
  //   super();
  //   this.user = user;
  // }

  async registrationConfirmationEmail(mailData: MailData<{ hash: string }>) {
    await this.mailerService.sendMail({
      to: mailData.to,
      subject: await this.i18n.t('common.confirmEmail'),
      text: `${this.configService.get('app.frontendDomain')}/confirm-email/${
        mailData.data.hash
      } ${await this.i18n.t('common.confirmEmail')}`,
      template: this.mailDirectory + '/activation',
      context: {
        title: await this.i18n.t('common.confirmEmail'),
        url: `${this.configService.get('app.frontendDomain')}/confirm-email/${
          mailData.data.hash
        }`,
        actionTitle: await this.i18n.t('common.confirmEmail'),
        app_name: this.configService.get('app.name'),
        text1: await this.i18n.t('confirm-email.text1'),
        text2: await this.i18n.t('confirm-email.text2'),
        text3: await this.i18n.t('confirm-email.text3'),
      },
    });
  }
}
