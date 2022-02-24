import {
  Args,
  Mutation,
  Parent,
  Query,
  Resolver,
  ResolveField,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NewUserInput } from './dto/new-user.input';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { EventService } from 'src/event/event.service';
import { Event } from 'src/event/models/event.model';
import { UpdateUserInput } from './dto/update-user.input';

const pubSub = new PubSub();
/**
 * * User modülü resolver parçasıdır burada bulunan fonksiyonlar graphQL
 * * tarafından çağırılanlardır.
 * ! İşlemlerin hepsi service sınıfında olmaktadır.
 */
@Resolver(() => User)
//* User modülü resolver(çözücü) kısmı
export class UserResolver {
  constructor(
    //* Kullanıcı servisi
    private readonly userService: UserService,
    //* Event servisi
    private readonly eventService: EventService,
  ) {}
  /**
   * * Parent objesini içerisindeki user verisindeki data ile event
   * * içindeki user_id ilişkilendirerek getirilin relational veriler.
   * @param user: User
   * @returns Event[]
   */
  @ResolveField(() => [Event])
  async events(@Parent() user: User): Promise<Event[]> {
    return this.eventService.findAllByUserID(user.id);
  }
  //* Tüm kullanıcıları getiren Query
  @Query(() => [User])
  async getUsers() {
    return this.userService.findAll();
  }
  //* id`si verilen kullanıcıyı getirme
  @Query(() => User)
  async getUser(@Args('id') id: number) {
    return this.userService.findOne(id);
  }
  //* Kullanıcı Ekleme
  @Mutation(() => User)
  async addUser(@Args('data') data: NewUserInput): Promise<User> {
    const userData = this.userService.addUser(data);
    pubSub.publish('userCreated', { userCreated: userData });
    return userData;
  }
  //* Kullanıcı güncelleme
  @Mutation(() => User)
  async updateUser(@Args('data') data: UpdateUserInput): Promise<User> {
    return this.userService.updateUser(data);
  }
  //* Kullanıcı silme
  @Mutation(() => User)
  async deleteUser(@Args('id') id: number) {
    return this.userService.deleteUser(id);
  }
  //* Tüm kullanıcıları silme
  @Mutation(() => Boolean)
  async deleteAllUsers(@Args('interact') interact: string): Promise<boolean> {
    return this.userService.deleteAllUsers(interact);
  }
  //* Kullanıcı eklendiğinde çalışacak subscription
  @Subscription(() => User)
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }
  //* Sayaç subs test için vardı. Hoşuma gitti kalsın bu burada ☜(ﾟヮﾟ☜)
  @Subscription(() => Number)
  counter() {
    let i = 0;
    setInterval(() => {
      pubSub.publish('counter', { counter: i });
      i++;
    }, 1000);
    return pubSub.asyncIterator('counter');
  }
}
