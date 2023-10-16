import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisStreamClientModule } from '@tamimaj/nestjs-redis-streams';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentVariables } from './env.validation';
import { makeValidatorForClass } from './validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: makeValidatorForClass(EnvironmentVariables),
      isGlobal: true,
      ignoreEnvFile: true,
    }),
    RedisStreamClientModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService<EnvironmentVariables, true>,
      ) => {
        console.log('config service:');
        console.log(configService);

        return {
          connection: {
            url: configService.get('REDIS_URL'),
          },
          streams: {
            consumer: configService.get('REDIS_CONSUMER'),
            consumerGroup: configService.get('REDIS_CONSUMER_GROUP'),
            block: configService.get('REDIS_MAX_BLOCK_TIME_MS'),
          },
          responseStreams: [],
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
