import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { MapperService } from './mapper/mapper.service';
import { AuthService } from './auth/auth.service';
import { JwtStrategyService } from './auth/strategies/jwt-strategy.service';
import { UserModule } from 'user/user.module';

@Global()
@Module({
  providers: [ConfigService, MapperService, AuthService, JwtStrategyService],
  exports: [ConfigService, MapperService, AuthService],
  imports: [UserModule],
})
export class SharedModule {}
