import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { PayosModule } from './payos/payos.module';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './address/address.module';
import { FishModule } from './fish/fish.module';
import { PostModule } from './post/post.module';
import { OrderModule } from './order/order.module';
import { TeamModule } from './team/team.module';
import { JwtUtilsService } from './utils/jwt/jwtUtils.service';
import { JwtUtilsModule } from './utils/jwt/jwtUtils.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    ChatModule,
    PayosModule,
    // FishModule,
    AddressModule,
    // PostModule,
    OrderModule,
    FileModule,
    // TeamModule,
  ],
  providers: [],
})
export class AppModule {}
