import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteEntity } from './entities/route.entity';
import { RouteRepository } from './entities/route.repository';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RouteEntity]),
  ],
  controllers: [RouteController],
  providers: [RouteService, RouteRepository],
})
export class RouteModule { }
