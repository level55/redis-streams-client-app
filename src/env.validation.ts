import { IsNumber, IsString } from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  REDIS_URL!: string;

  @IsNumber()
  REDIS_MAX_BLOCK_TIME_MS!: number;

  @IsString()
  REDIS_CONSUMER!: string;

  @IsString()
  REDIS_CONSUMER_GROUP!: string;
}
