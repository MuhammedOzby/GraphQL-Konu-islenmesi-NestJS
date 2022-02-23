import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'location' })
export class Location {
  //* Lokasyon kayıt id
  @Field(() => ID)
  id: number;
  //* Lokasyon kayıt adı
  @Field()
  name: string;
  //* Lokasyon kayıt açıklaması
  @Field({ nullable: true })
  desc: string;
  //* Lokasyon kordinat bilgisi (Boylam)
  @Field({ nullable: true })
  lat: number;
  //* Lokasyon kordinat bilgisi (Enlem)
  @Field({ nullable: true })
  lng: number;
}
