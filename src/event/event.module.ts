import { Module } from '@nestjs/common';
import { LocationService } from 'src/location/location.service';
import { ParticipantService } from 'src/participant/participant.service';
import { UserService } from 'src/user/user.service';
import { EventResolver } from './event.resolver';
import { EventService } from './event.service';

@Module({
  providers: [
    EventResolver,
    EventService,
    LocationService,
    ParticipantService,
    UserService,
  ],
})
export class EventModule {}
