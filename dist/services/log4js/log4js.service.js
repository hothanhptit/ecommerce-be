"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogServices = void 0;
const common_1 = require("@nestjs/common");
const log4js_1 = require("log4js");
class DbLogger {
    constructor(logger) {
        this.logger = logger;
    }
    logQuery(query, parameters, queryRunner) {
        this.logger.debug(`query=${query}` +
            (parameters ? ` parameters: ${JSON.stringify(parameters)}` : ``));
    }
    logQueryError(error, query, parameters, queryRunner) {
        this.logger.error(`query=${query} parameters: ${JSON.stringify(parameters)}`);
    }
    logQuerySlow(time, query, parameters, queryRunner) {
        this.logger.warn(`time=${time} query=${query} parameters: ${JSON.stringify(parameters)}`);
    }
    logSchemaBuild(message, queryRunner) { }
    logMigration(message, queryRunner) { }
    log(level, message, queryRunner) {
        this.logger[level](message);
    }
}
let LogServices = class LogServices {
    constructor() {
        this.getLogger = log4js_1.getLogger;
        (0, log4js_1.configure)({
            appenders: {
                everything: {
                    type: 'dateFile',
                    filename: 'logs/log.log',
                    pattern: 'yyyy-MM-dd-hh',
                    compress: false,
                },
            },
            categories: {
                default: { appenders: ['everything'], level: 'debug' },
            },
        });
    }
    debugLogger(category) {
        const logger = this.getLogger(category);
        return {
            info: logger.info.bind(logger),
            debug: logger.debug.bind(logger),
            warn: logger.warn.bind(logger),
            error: logger.error.bind(logger),
        };
    }
    getDbLogger(category) {
        return new DbLogger(this.getLogger(category));
    }
};
LogServices = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LogServices);
exports.LogServices = LogServices;
//# sourceMappingURL=log4js.service.js.map