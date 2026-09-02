import { StoreService } from './store.service';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    create(data: {
        name: string;
        code: string;
        address: string;
        state?: string;
    }): Promise<{
        id: number;
        code: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        address: string;
        state: string | null;
    }>;
    findAll(): Promise<{
        id: number;
        code: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        address: string;
        state: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        code: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        address: string;
        state: string | null;
    }>;
    update(id: number, data: {
        name?: string;
        code?: string;
        address?: string;
        state?: string;
    }): Promise<{
        id: number;
        code: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        address: string;
        state: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        code: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        address: string;
        state: string | null;
    }>;
}
