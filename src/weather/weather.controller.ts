import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WeatherService } from './weather.service';

@ApiTags('WEATHER')
@Controller('api/weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}
  @ApiOperation({ summary: '현재 날씨 가져오기' })
  @Get()
  getWeatherInSeoul() {
    return this.weatherService.getWeatherInSeoul();
  }
}
