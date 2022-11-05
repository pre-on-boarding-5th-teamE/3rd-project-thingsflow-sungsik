import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Boards } from 'src/entities/Boards';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { WeatherService } from 'src/weather/weather.service';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Boards)
    private boardsRepository: Repository<Boards>,
    private weatherService: WeatherService,
  ) {}

  async getBoardList() {
    return await this.boardsRepository.find({
      order: { createdAt: 'DESC' },
      take: 20,
    });
  }

  async getBoardListByCursor(postId: number) {
    return await this.boardsRepository
      .createQueryBuilder()
      .where('id < :cursor', { cursor: postId })
      .orderBy('createdAt', 'DESC')
      .limit(20)
      .getMany();
  }

  async getBoardDetails(postId: number) {
    return await this.boardsRepository.findOne({ where: { id: postId } });
  }

  async createPost(
    userId: number,
    title: string,
    content: string,
    password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const getWeather = await this.weatherService.getWeatherInSeoul();
    const weather = getWeather.current.condition.text;

    return await this.boardsRepository.query(
      `INSERT INTO boards(
        title,
        content,
        password,
        weather,
        userId
      ) VALUES (?, ?, ?, ?, ?)
      `,
      [title, content, hashedPassword, weather, userId],
    );
  }

  async updatePost(
    postId: number,
    title: string,
    content: string,
    password: string,
  ) {
    const post = await this.boardsRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException();
    }
    const match = await bcrypt.compare(password, post.password);
    if (!match) {
      throw new UnauthorizedException();
    }
    return await this.boardsRepository
      .createQueryBuilder()
      .update(Boards)
      .set({ title: title, content: content, password: password })
      .where('id = :postId', { postId: postId })
      .execute();
  }

  async deletePost(postId: number, password: string) {
    const post = await this.boardsRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException();
    }
    const match = await bcrypt.compare(password, post.password);
    if (!match) {
      throw new UnauthorizedException();
    }
    return await this.boardsRepository
      .createQueryBuilder()
      .delete()
      .from(Boards)
      .where('id = :postId', { postId: postId })
      .execute();
  }
}
