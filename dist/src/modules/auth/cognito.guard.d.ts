import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class CognitoAuthGuard implements CanActivate {
    private verifier;
    constructor();
    canActivate(context: ExecutionContext): Promise<boolean>;
}
