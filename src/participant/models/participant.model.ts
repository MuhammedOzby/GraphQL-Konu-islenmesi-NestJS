import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Event } from 'src/event/models/event.model';
import { User } from 'src/user/models/user.model';

@ObjectType({ description: 'paticipant' })
export class Participant {
  //* Katılımcı kayıt id
  @Field(() => ID)
  id: number;
  //* Katılımcı kullanıcı id
  @Field(() => ID)
  user_id: number;
  //* Katılımcı lokasyon id
  @Field(() => ID)
  event_id: number;
  //* Kullanıcı verileri. Yer tutucu ve gösterici olarak bulunmaktadır.
  @Field(() => User)
  user?: User;
  //* Event verileri. Yer tutucu ve gösterici olarak bulunmaktadır.
  @Field(() => Event)
  event?: Event;
}
