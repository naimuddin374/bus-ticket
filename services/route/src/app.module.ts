import * as dotenv from 'dotenv';
dotenv.config(); // This loads the environment variables from the .env file

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { RouteModule } from './route/route.module';


const dbConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
}
console.log(dbConfig)

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available across all modules without needing to re-import it
    }),
    TypeOrmModule.forRoot({
      ...dbConfig,
      entities: [join(__dirname, "**", "*.entity.{ts,js}")],
      autoLoadEntities: true, // Automatically load all entities registered through the TypeOrmModule.forFeature() method
      synchronize: true, // Ensure you turn this off in production!
    }),
    RouteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  // public configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .exclude(
  //       { path: "main/docs/(.*)", method: RequestMethod.GET },
  //       { path: "main/public/(.*)", method: RequestMethod.ALL },
  //       { path: "main/webhooks/(.*)", method: RequestMethod.ALL },
  //       { path: "main/docs-json", method: RequestMethod.GET }
  //     )
  //     // need to make sure we don't include OPTIONS otherwise preflight CORs requests will have require authentication
  //     .forRoutes(
  //       { path: "/*", method: RequestMethod.POST },
  //       { path: "/*", method: RequestMethod.PUT },
  //       { path: "/*", method: RequestMethod.GET },
  //       { path: "/*", method: RequestMethod.DELETE }
  //     );
  // }
}
