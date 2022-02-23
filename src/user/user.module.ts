import { Module } from '@nestjs/common';
import { EventService } from 'src/event/event.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserResolver, UserService, EventService],
})
export class UserModule {}
