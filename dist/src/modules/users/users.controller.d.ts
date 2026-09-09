import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(role?: string, page?: string, limit?: string): Promise<any>;
    updateUser(id: string, data: any): Promise<{
        id: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        store: string | null;
        email: string;
        mobileNumber: string;
        password: string | null;
        role: string | null;
        posAccess: boolean;
    }>;
    deleteUser(id: string): Promise<{
        id: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        store: string | null;
        email: string;
        mobileNumber: string;
        password: string | null;
        role: string | null;
        posAccess: boolean;
    }>;
}
