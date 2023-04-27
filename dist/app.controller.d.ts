import { AppService } from './app.services';
import { MailerService } from '@nestjs-modules/mailer/dist';
export declare class AppController {
    private readonly appService;
    private readonly mailerService;
    constructor(appService: AppService, mailerService: MailerService);
}
