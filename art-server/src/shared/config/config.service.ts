import { Injectable } from '@nestjs/common';
import { Config } from './config.enum';
import { get } from 'config';

@Injectable()
export class ConfigService {
    static connectionString: string = process.env[Config.MONGO_URI] || get(Config.MONGO_URI);
    private enviromentHosting: string = process.env.NODE_ENV || 'development';

    get(name: string): string {
        return process.env[name] || get(name);
    }

    get isDevelopment(): boolean {
        return this.enviromentHosting === 'development';
    }
}
