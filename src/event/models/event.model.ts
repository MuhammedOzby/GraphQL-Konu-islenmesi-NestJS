import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Location } from 'src/location/models/location.model';
import { Participant } from 'src/participant/models/participant.model';
import { User } from 'src/user/models/user.model';

@ObjectType({ description: 'event' })
export class Event {
  //* Event ID alanı
  @Field(() => ID)
  id: number;
  //* Event title alanı
  @Field()
  title: string;
  //* Event desc alanı
  @Field({ nullable: true })
  desc: string;
  //* Event date alanı
  @Field({ nullable: true })
  date: string;
  //* Event from alanı
  @Field({ nullable: true })
  from: string;
  //* Event to alanı
  @Field({ nullable: true })
  to: string;
  //* Event location_id alanı
  @Field(() => ID, { nullable: true })
  location_id: number;
  //* Event user_id alanı
  @Field(() => ID, { nullable: true })
  user_id: number;
  //* Event altınakayıtlı kullanıcı yer tutucusu
  @Field(() => User, { nullable: true })
  user?: User;
  //* Event altındaki lokasyon yer tutucusu
  @Field(() => Location, { nullable: true })
  location?: Location;
  //* Event katılımcı listesi yer tutucusu
  @Field(() => [Participant], { nullable: true })
  participant?: Participant[];
}
