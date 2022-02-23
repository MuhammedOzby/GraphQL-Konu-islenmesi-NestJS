import { Module } from '@nestjs/common';
import { EventService } from 'src/event/event.service';
import { UserService } from 'src/user/user.service';
import { ParticipantResolver } from './participant.resolver';
import { ParticipantService } from './participant.service';

@Module({
  providers: [
    ParticipantResolver,
    ParticipantService,
    UserService,
    EventService,
  ],
})
export class ParticipantModule {}
