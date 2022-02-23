import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Event } from 'src/event/models/event.model';

@ObjectType({ description: 'user' })
export class User {
  //* Kullanıcı ID alanı
  @Field(() => ID)
  id: number;
  //* Kullanıcı adı alanı
  @Field()
  username: string;
  //* Email alanı
  @Field({ nullable: true })
  email: string;
  //* Kullanıcı events verileri Yer tutucu ve gösterici olarak bulunmaktadır.
  @Field(() => [Event], { nullable: true })
  events?: Event[];
}
