import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { ConfigService } from 'shared/config/config.service';
import { Config } from './shared/config/config.enum';

@Module({
  imports: [SharedModule, MongooseModule.forRoot(ConfigService.connectionString, { useNewUrlParser: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static host: string;
  static port: number | string;
  static isDev: boolean;

  constructor(private readonly _configService: ConfigService){
    AppModule.port = AppModule.normalizePort(_configService.get(Config.PORT));
    AppModule.host = _configService.get(Config.HOST);
    AppModule.isDev = _configService.isDevelopment;
  }

  private static normalizePort(param: number | string): number | string {
    const portNumber: number = typeof param === 'string' ? parseInt(param, 10) : param;
    if (isNaN(portNumber)) return param;
    else if ( portNumber >= 0) return portNumber;
  }
}
