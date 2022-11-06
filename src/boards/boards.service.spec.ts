import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../entities/Users';
import { Boards } from '../entities/Boards';
import { BoardsService } from './boards.service';
import { WeatherService } from '../weather/weather.service';
import { HttpModule } from '@nestjs/axios';

class MockBoardsRepository {
  #data = [
    { id: 1, createdAt: '2022-11-04T14:58:55.524Z' },
    { id: 2, createdAt: '2022-11-04T14:58:56.703Z' },
    { id: 3, createdAt: '2022-11-04T14:58:57.429Z' },
  ];
  find() {
    const data = this.#data.reverse();
    return data;
  }
  findOne({ where: postId }) {
    const data = this.#data.find((v) => (v.id = postId));
    if (data) {
      return data;
    }
    return null;
  }
}

class MockUsersRepository {
  #data = [{ id: 1, email: 'walter811@naver.com' }];
  findOne({ where: userId }) {
    const data = this.#data.find((v) => (v.id = userId));
    if (data) {
      return data;
    }
    return null;
  }
}

describe('BoardsService', () => {
  let boardsService: BoardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        BoardsService,
        WeatherService,
        {
          provide: getRepositoryToken(Boards),
          useClass: MockBoardsRepository,
        },
        {
          provide: getRepositoryToken(Users),
          useClass: MockUsersRepository,
        },
      ],
    }).compile();

    boardsService = module.get<BoardsService>(BoardsService);
  });

  it('should be defined', () => {
    expect(boardsService).toBeDefined();
  });

  it('getBoardList는 게시물 리스트 객체의 배열을 반환해야 함', () => {
    expect(boardsService.getBoardList()).resolves.toStrictEqual([
      { id: 3, createdAt: '2022-11-04T14:58:57.429Z' },
      { id: 2, createdAt: '2022-11-04T14:58:56.703Z' },
      { id: 1, createdAt: '2022-11-04T14:58:55.524Z' },
    ]);
  });

  it('getBoardDetails는 postId에 맞는 게시물을 반환해야 함', () => {
    expect(boardsService.getBoardDetails(2)).resolves.toStrictEqual({
      id: 2,
      createdAt: '2022-11-04T14:58:56.703Z',
    });
  });

  it('getBoardDetails는 게시물을 못 찾으면 null을 반환해야 함', () => {
    expect(boardsService.getBoardDetails(4)).resolves.toBe(null);
  });

  it('createPost는 userId에 맞는 user 데이터를 반환해야 함', () => {
    expect(
      boardsService.createPost(1, 'title', 'content', 'password'),
    ).resolves.toStrictEqual({ id: 1, email: 'walter811@naver.com' });
  });

  it('createPost는 user를 못 찾으면 null을 반환해야 함', () => {
    expect(
      boardsService.createPost(10, 'title', 'content', 'password'),
    ).resolves.toBe(null);
  });

  it('updatePost는 게시물 유무 판단 시 postId에 맞는 게시물을 반환해야 함', () => {
    expect(
      boardsService.updatePost(2, 'title', 'content', 'password'),
    ).resolves.toStrictEqual({
      id: 2,
      createdAt: '2022-11-04T14:58:56.703Z',
    });
  });

  it('updatePost는 게시물 유무 판단 시 게시물을 못 찾으면 null을 반환해야 함', () => {
    expect(
      boardsService.updatePost(4, 'title', 'content', 'password'),
    ).resolves.toBe(null);
  });

  it('deletePost는 게시물 유무 판단 시 postId에 맞는 게시물을 반환해야 함', () => {
    expect(boardsService.deletePost(2, 'password')).resolves.toStrictEqual({
      id: 2,
      createdAt: '2022-11-04T14:58:56.703Z',
    });
  });

  it('deletePost는 게시물 유무 판단 시 게시물을 못 찾으면 null을 반환해야 함', () => {
    expect(boardsService.deletePost(4, 'password')).resolves.toBe(null);
  });
});
