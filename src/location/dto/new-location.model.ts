import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewLocationInput {
  @Field()
  name: string;
  @Field()
  desc: string;
  @Field()
  lat: number;
  @Field()
  lng: number;
}
