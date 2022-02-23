import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class NewEventInput {
  @Field()
  title: string;
  @Field({ nullable: true })
  desc: string;
  @Field({ nullable: true })
  date: string;
  @Field({ nullable: true })
  from: string;
  @Field({ nullable: true })
  to: string;
  @Field(() => ID, { nullable: true })
  location_id: number;
  @Field(() => ID, { nullable: true })
  user_id: number;
}
