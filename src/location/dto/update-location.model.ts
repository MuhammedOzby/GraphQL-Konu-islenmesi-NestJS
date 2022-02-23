import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateLocationInput {
  @Field(() => ID)
  id: number;
  @Field()
  name: string;
  @Field()
  desc: string;
  @Field()
  lat: number;
  @Field()
  lng: number;
}
