import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { SignOptions, sign } from 'jsonwebtoken';
import { UserService } from 'user/user.service';
import { ConfigService } from '../config/config.service';
import { Config } from '../config/config.enum';
import { JwtPayload } from './jwt-payload';
import { User } from 'user/models/user.model';

@Injectable()
export class AuthService {
    private readonly jwtOptions: SignOptions;
    private readonly jwtKey: string;

    constructor(
        @Inject(forwardRef(() => UserService))
        readonly _userService: UserService,
        private readonly _configService: ConfigService,
    ) {
        this.jwtOptions = { expiresIn: '12h'};
        this.jwtKey = _configService.get(Config.JWT_KEY);
    }

    async signPayload(payload: JwtPayload): Promise<string> {
        return sign(payload, this.jwtKey, this.jwtOptions);
    }

    async validatePayload(payload: JwtPayload): Promise<InstanceType<User | any>> {
        return this._userService.findOne({ username: payload.username.toLowerCase() });
    }
}
