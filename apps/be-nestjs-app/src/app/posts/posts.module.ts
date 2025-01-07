import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {DatabaseService} from "../database/database.service";

@Module({
  controllers: [PostsController],
  providers: [PostsService, DatabaseService],
})
export class PostsModule {}
