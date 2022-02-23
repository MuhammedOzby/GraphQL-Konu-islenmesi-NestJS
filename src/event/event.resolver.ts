import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LocationService } from 'src/location/location.service';
import { Location } from 'src/location/models/location.model';
import { Participant } from 'src/participant/models/participant.model';
import { ParticipantService } from 'src/participant/participant.service';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';
import { NewEventInput } from './dto/new-event.model';
import { UpdateEventInput } from './dto/update-event.model';
import { EventService } from './event.service';
import { Event } from './models/event.model';

@Resolver(() => Event)
export class EventResolver {
  constructor(
    private readonly eventService: EventService,
    private readonly userService: UserService,
    private readonly locationService: LocationService,
    private readonly participantService: ParticipantService,
  ) {}
  /**
   * * Parent objesini içerisindeki event verisindeki user_id ile user
   * * içindeki id ilişkilendirerek getirilen relational veriler.
   * @Parent event: Event
   * @returns User
   */
  @ResolveField(() => User)
  async user(@Parent() event: Event): Promise<User> {
    return this.userService.findOne(event.user_id);
  }
  /**
   * * Parent objesini içerisindeki event verisindeki location_id ile Location
   * * içindeki id ilişkilendirerek getirilen relational veriler.
   * @Parent event: Event
   * @returns Location
   */
  @ResolveField(() => Location)
  async location(@Parent() event: Event): Promise<Location> {
    return this.locationService.findOne(event.location_id);
  }
  /**
   * * Parent objesini içerisindeki event verisindeki id ile Participant
   * * içindeki event_id ilişkilendirerek getirilen relational veriler.
   * @Parent event: Event
   * @returns Participant[]
   */
  @ResolveField(() => [Participant])
  async participant(@Parent() event: Event): Promise<Participant[]> {
    return this.participantService.findAllByEvent(event.id);
  }
  //* Tüm Eventleri getirme
  @Query(() => [Event])
  async getEvents(): Promise<Event[]> {
    return this.eventService.findAll();
  }
  //* id verilen Eventi getirme
  @Query(() => Event)
  async getEvent(id: number): Promise<Event> {
    return this.eventService.findOne(id);
  }
  //* Event Ekleme
  @Mutation(() => Event)
  async addEvent(@Args('data') data: NewEventInput): Promise<Event> {
    return this.eventService.addEvent(data);
  }
  //* Event güncelleme
  @Mutation(() => Event)
  async updateEvent(@Args('data') data: UpdateEventInput): Promise<Event> {
    return this.eventService.updateEvent(data);
  }
  //* Event silme
  @Mutation(() => Event)
  async deleteEvent(@Args('id') id: number) {
    return this.eventService.deleteEvent(id);
  }
  //* Tüm Eventları silme
  @Mutation(() => Boolean)
  async deleteAllEvents(@Args('interact') interact: string): Promise<boolean> {
    return this.eventService.deleteAllEvents(interact);
  }
}
