import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(role?: string, page?: string, limit?: string): Promise<any>;
    updateUser(id: string, data: any): Promise<{
        name: string;
        id: string;
        email: string;
        mobileNumber: string;
        password: string | null;
        role: string | null;
        store: string | null;
        posAccess: boolean;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteUser(id: string): Promise<{
        name: string;
        id: string;
        email: string;
        mobileNumber: string;
        password: string | null;
        role: string | null;
        store: string | null;
        posAccess: boolean;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
