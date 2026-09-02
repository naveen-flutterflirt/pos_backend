import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: string;
            name: string;
            email: string;
            mobileNumber: string;
            role: string | null;
            posAccess: boolean;
        };
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            name: string;
            email: string;
            mobileNumber: string;
            role: string | null;
            posAccess: boolean;
        };
    }>;
}
