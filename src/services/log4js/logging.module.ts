import { Global, Module } from '@nestjs/common';
import { Log4js } from './log4js.service';

@Global()
@Module({ providers: [Log4js], exports: [Log4js] })
export class LoggingModule {}
