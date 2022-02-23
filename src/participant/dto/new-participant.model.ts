import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class NewParticipantInput {
  //* Katılımcı kullanıcı id
  @Field(() => ID)
  user_id: number;
  //* Katılımcı lokasyon id
  @Field(() => ID)
  event_id: number;
}
