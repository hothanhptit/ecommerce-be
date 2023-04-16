import { getLogger, Logger as FourLogger } from 'log4js';
import { Logger, QueryRunner } from 'typeorm';
declare class DbLogger implements Logger {
    private logger;
    constructor(logger: FourLogger);
    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any;
    logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): any;
    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any;
    logSchemaBuild(message: string, queryRunner?: QueryRunner): any;
    logMigration(message: string, queryRunner?: QueryRunner): any;
    log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner): any;
}
export declare class LogServices {
    constructor();
    getLogger: typeof getLogger;
    debugLogger(category: string): {
        info: any;
        debug: any;
        warn: any;
        error: any;
    };
    getDbLogger(category: string): DbLogger;
}
export {};
