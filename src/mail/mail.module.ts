import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  // providers: [MailService],
  // exports: [MailService],
})
export class MailModule {}
