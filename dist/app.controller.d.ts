import { AppService } from './app.service';
import { AuthService, UserAuthenticatedJWTPayload } from './auth/auth.service';
import { LoginUserDto } from './user/dto/login-user-dto';
export declare class AppController {
    private readonly appService;
    private authService;
    constructor(appService: AppService, authService: AuthService);
    login(loginUserDto: LoginUserDto): Promise<UserAuthenticatedJWTPayload>;
}
