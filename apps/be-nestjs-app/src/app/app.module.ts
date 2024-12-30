import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import {PayosModule} from "./payos/payos.module";
import {ConfigModule} from "@nestjs/config";


@Module({

  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),UserModule, ChatModule, PayosModule],
})
export class AppModule {}
