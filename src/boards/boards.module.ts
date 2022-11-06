import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boards } from 'src/entities/Boards';
import { Users } from 'src/entities/Users';
import { WeatherModule } from 'src/weather/weather.module';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports: [WeatherModule, TypeOrmModule.forFeature([Boards, Users])],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: [BoardsService, TypeOrmModule.forFeature([Boards, Users])],
})
export class BoardsModule {}
