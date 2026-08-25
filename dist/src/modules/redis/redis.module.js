"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisModule = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let RedisModule = class RedisModule {
};
exports.RedisModule = RedisModule;
exports.RedisModule = RedisModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            {
                provide: 'REDIS_CLIENT',
                useFactory: () => {
                    const logger = new common_1.Logger('RedisModule');
                    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
                    const client = new ioredis_1.Redis(redisUrl, {
                        retryStrategy: (times) => {
                            if (times > 3) {
                                logger.error('❌ Redis connection failed. Please ensure Redis is running.', 'RedisModule');
                                return null;
                            }
                            return Math.min(times * 50, 2000);
                        },
                        maxRetriesPerRequest: 1,
                    });
                    client.on('error', (err) => {
                        logger.warn(`Redis error: ${err.message}`);
                    });
                    return client;
                },
            },
        ],
        exports: ['REDIS_CLIENT'],
    })
], RedisModule);
//# sourceMappingURL=redis.module.js.map