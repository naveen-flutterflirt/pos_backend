import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(role?: string): Promise<{
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        store: string | null;
        email: string;
        mobileNumber: string;
        password: string | null;
        role: string | null;
        posAccess: boolean;
    }[]>;
    updateUser(id: string, data: any): Promise<{
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        store: string | null;
        email: string;
        mobileNumber: string;
        password: string | null;
        role: string | null;
        posAccess: boolean;
    }>;
}
