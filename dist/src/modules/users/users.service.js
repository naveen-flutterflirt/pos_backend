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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const ioredis_1 = require("ioredis");
const bcrypt = require("bcrypt");
const CACHE_TTL = 60;
let UsersService = class UsersService {
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    async findByMobile(mobileNumber) {
        return this.prisma.user.findUnique({
            where: { mobileNumber },
        });
    }
    async create(data) {
        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                mobileNumber: data.mobileNumber,
                password: data.password,
                role: data.role || 'CASHIER',
                store: data.store || null,
            },
        });
        await this.invalidateCache('users:all*').catch(() => { });
        return user;
    }
    async findAll(role, page = 1, limit = 50) {
        const cacheKey = role ? `users:all:${role}:page:${page}:limit:${limit}` : `users:all:page:${page}:limit:${limit}`;
        try {
            const cached = await this.redis.get(cacheKey);
            if (cached) {
                return JSON.parse(cached);
            }
        }
        catch {
        }
        const whereClause = role ? { role } : {};
        const skip = (page - 1) * limit;
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where: whereClause,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            this.prisma.user.count({ where: whereClause })
        ]);
        const result = {
            data: users,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
        };
        this.redis
            .setex(cacheKey, CACHE_TTL, JSON.stringify(result))
            .catch(() => { });
        return result;
    }
    async update(id, data) {
        const updateData = {
            ...(data.posAccess !== undefined && { posAccess: data.posAccess }),
            ...(data.name && { name: data.name }),
            ...(data.mobileNumber && { mobileNumber: data.mobileNumber }),
            ...(data.email && { email: data.email }),
        };
        if (data.password && data.password.trim() !== '' && data.password !== '********') {
            updateData.password = await bcrypt.hash(data.password, 10);
        }
        const user = await this.prisma.user.update({
            where: { id },
            data: updateData,
        });
        await this.invalidateCache('users:all*').catch(() => { });
        return user;
    }
    async delete(id) {
        try {
            const user = await this.prisma.user.delete({
                where: { id },
            });
            await this.invalidateCache('users:all*').catch(() => { });
            return user;
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException('User not found');
            }
            throw error;
        }
    }
    async invalidateCache(pattern) {
        const keys = await this.redis.keys(pattern);
        if (keys.length > 0) {
            await this.redis.del(...keys);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('REDIS_CLIENT')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ioredis_1.Redis])
], UsersService);
//# sourceMappingURL=users.service.js.map