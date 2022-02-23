import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;
}
