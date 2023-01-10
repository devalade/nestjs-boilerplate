import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nService } from 'nestjs-i18n';
import { Message } from './message.service';
import * as fs from 'fs';
import * as path from 'path';
import * as mjml from 'mjml';
import * as process from 'process';

@Injectable()
export class MailService extends Message {
  constructor(
    public i18n: I18nService,
    public mailerService: MailerService,
    public configService: ConfigService,
  ) {
    super();
  }
  public render(template: string) {
    const MJML_EXT = '.mjml';
    const HANDLEBAR_EXT = '.hbs';

    let fileContent;

    fileContent = fs.readFileSync(
      path.join(
        process.cwd(),
        'src/mail/mjml-mail-templates',
        template + MJML_EXT,
      ),
    );
    fileContent = mjml(fileContent.toString());
    const hbs = path.join(
      process.cwd(),
      'src/mail/mail-templates/' + template + HANDLEBAR_EXT,
    );
    fs.writeFileSync(hbs, fileContent.html);

    return hbs;
  }
}
