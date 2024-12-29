import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ChatModule } from '../chat/chat.module';
import {PayosModule} from "../payos/payos.module";


@Module({
  imports: [UserModule, ChatModule, PayosModule],
})
export class AppModule {}
