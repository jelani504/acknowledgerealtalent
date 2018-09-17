import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { MapperService } from './mapper/mapper.service';
import { AuthService } from './auth/auth.service';
import { JwtStrategyService } from './auth/strategies/jwt-strategy.service';

@Global()
@Module({
  providers: [ConfigService, MapperService, AuthService, JwtStrategyService],
  exports: [ConfigService, MapperService],
})
export class SharedModule {}
