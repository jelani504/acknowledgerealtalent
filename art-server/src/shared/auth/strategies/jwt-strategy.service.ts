import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { ConfigService } from '../../config/config.service';
import { Strategy } from 'passport-strategy';
import { ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { Config } from '../../config/config.enum';
import { JwtPayload } from '../jwt-payload';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy, 'JwtStrategy') {
    constructor(
        private readonly _authService: AuthService,
        private readonly _configService: ConfigService,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _configService.get(Config.JWT_KEY),
        });
    }

    async validate(payload: JwtPayload, done: VerifiedCallback) {
        const user = await this._authService.validatePayload(payload);

        if (!user){
            return done(new HttpException({}, HttpStatus.UNAUTHORIZED), false);
        }
        return done(null, user, payload.iat);
    }
}
