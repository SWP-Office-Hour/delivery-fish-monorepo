import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { PayosModule } from './payos/payos.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    ChatModule,
    PayosModule,
    PostsModule,
  ],
})
export class AppModule {}
