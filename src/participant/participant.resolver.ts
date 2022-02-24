import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { EventService } from 'src/event/event.service';
import { Event } from 'src/event/models/event.model';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';
import { NewParticipantInput } from './dto/new-participant.model';
import { UpdateParticipantInput } from './dto/update-participant.model';
import { Participant } from './models/participant.model';
import { ParticipantService } from './participant.service';

const pubSub = new PubSub();
/**
 * * Katılımcı modülü resolver parçasıdır burada bulunan fonksiyonlar graphQL
 * * tarafından çağırılanlardır.
 * ! İşlemlerin hepsi service sınıfında olmaktadır.
 */
@Resolver(() => Participant)
export class ParticipantResolver {
  constructor(
    //* Katılımcı servisi
    private readonly participantService: ParticipantService,
    //* Kullanıcı servisi
    private readonly userService: UserService,
    //* Event servisi
    private readonly eventService: EventService,
  ) {}
  /**
   * * Parent objesini içerisindeki user_id verisindeki data ile user
   * * içindeki id ilişkilendirerek getirilen relational veriler.
   * @param participant: Participant
   * @returns User
   */
  @ResolveField(() => User)
  async user(@Parent() participant: Participant): Promise<User> {
    return this.userService.findOne(participant.user_id);
  }
  /**
   * * Parent objesini içerisindeki event_id verisindeki data ile event
   * * içindeki id ilişkilendirerek getirilen relational veriler.
   * @param participant: Participant
   * @returns Event
   */
  @ResolveField(() => Event)
  async event(@Parent() participant: Participant): Promise<Event> {
    return this.eventService.findOne(participant.event_id);
  }
  //* Tüm kullanıcıları getiren Query
  @Query(() => [Participant])
  async getParticipants() {
    return this.participantService.findAll();
  }
  //* id verilen katılımcı verisini getiren Query
  @Query(() => Participant)
  async getParticipant(@Args('id') id: number) {
    return this.participantService.findOne(id);
  }
  //* Katılımcı ekleme
  @Mutation(() => Participant)
  async addParticipant(
    @Args('data') data: NewParticipantInput,
  ): Promise<Participant> {
    const participantData = this.participantService.addParticipant(data);
    pubSub.publish('participantAdded', { participantAdded: participantData });
    return participantData;
  }
  //* Katılımcı güncelleme
  @Mutation(() => Participant)
  async updateParticipant(
    @Args('data') data: UpdateParticipantInput,
  ): Promise<Participant> {
    return this.participantService.updateParticipant(data);
  }
  //* Katılımcı silme
  @Mutation(() => Participant)
  async deleteParticipant(@Args('id') id: number): Promise<Participant> {
    return this.participantService.deleteParticipant(id);
  }
  //* Tüm katılımcıları silme
  @Mutation(() => Boolean)
  async deleteAllParticipant(
    @Args('interact') interact: string,
  ): Promise<boolean> {
    return this.participantService.deleteAllParticipants(interact);
  }
  //* Katılımcı eklendiğinde çalışacak subscription
  @Subscription(() => Participant)
  participantAdded() {
    return pubSub.asyncIterator('participantAdded');
  }
}
