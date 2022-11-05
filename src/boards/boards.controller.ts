import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BoardsService } from './boards.service';
import { CreatePostDto } from './dto/createPost.request.dto';

@ApiTags('BOARDS')
@Controller('api/boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiOperation({ summary: '첫 요청 시: 게시물 리스트 가져오기 (limit: 20)' })
  @Get('all')
  async getBoardList() {
    return await this.boardsService.getBoardList();
  }

  @ApiOperation({ summary: '이후 요청 시: 게시물 리스트 가져오기 (limit: 20)' })
  @Get('all/:postId/')
  async getBoardListByCursor(@Param('postId', ParseIntPipe) postId: number) {
    return await this.boardsService.getBoardListByCursor(postId);
  }

  @ApiOperation({ summary: '특정 게시물의 상세 정보 가져오기' })
  @Get('detail/:postId')
  async getBoardDetails(@Param('postId', ParseIntPipe) postId: number) {
    return await this.boardsService.getBoardDetails(postId);
  }

  @ApiOperation({ summary: '게시물 생성하기' })
  @Post(':userId')
  async createPost(
    @Param('userId') userId: number,
    @Body() data: CreatePostDto,
  ) {
    return await this.boardsService.createPost(
      userId,
      data.title,
      data.content,
      data.password,
    );
  }

  @ApiOperation({ summary: '특정 게시물 수정하기' })
  @Patch(':postId')
  async updatePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() data: CreatePostDto,
  ) {
    return await this.boardsService.updatePost(
      postId,
      data.title,
      data.content,
      data.password,
    );
  }

  @ApiOperation({ summary: '특정 게시물 삭제하기' })
  @Delete(':postId')
  async deletePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Query('password') password: string,
  ) {
    return await this.boardsService.deletePost(postId, password);
  }
}
