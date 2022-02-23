import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';
import { LocationModule } from './location/location.module';
import { ParticipantModule } from './participant/participant.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    //* Kullanıcı modülünün ana module import edilmesi.
    UserModule,
    //* Event modülünün ana module import edilmesi.
    EventModule,
    //* Lokasyon modülünün ana module import edilmesi.
    LocationModule,
    //* Katılımcı modülünün ana module import edilmesi.
    ParticipantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
