import { Injectable } from '@nestjs/common';
import { v4 as uuid_v4 } from 'uuid';
import { participants } from '../../data/data.json';
import { NewParticipantInput } from './dto/new-participant.model';
import { UpdateParticipantInput } from './dto/update-participant.model';
import { Participant } from './models/participant.model';

@Injectable()
export class ParticipantService {
  protected readonly participants: Array<Participant> = participants;
  //* Tüm katılımcı listesini getirir
  findAll(): Participant[] {
    return this.participants;
  }
  //* id verilen katılımcı verisini getirir
  findOne(id: number): Participant {
    return participants.find((participant) => participant.id == id);
  }
  //* event id ile katılımcı listesini getirir.
  findAllByEvent(event_id: number): Participant[] {
    return participants.filter(
      (participant) => participant.event_id == event_id,
    );
  }
  //* Katılımcı ekleme servisi
  addParticipant(data: NewParticipantInput): Participant {
    const participant = {
      id: parseInt(uuid_v4().toString().replace('-', ''), 16),
      user_id: data.user_id,
      event_id: data.event_id,
    };
    participants.push(participant);
    return participant;
  }
  //* Katılımcı güncelleyen servisimiz.
  updateParticipant(data: UpdateParticipantInput): Participant {
    const participantIndex = participants.findIndex((element) => {
      return element.id == data.id;
    });
    if (participantIndex == -1) {
      throw new Error('Participant not defined!');
    }
    participants[participantIndex] = {
      ...participants[participantIndex],
      ...data,
    };
    return participants[participantIndex];
  }
  //* id verilen katılımcıyı silme
  deleteParticipant(id: number): Participant {
    const participantIndex = participants.findIndex((element) => {
      return element.id == id;
    });
    if (participantIndex == -1) {
      throw new Error('Participant not defined!');
    }
    const participantData = participants[participantIndex];
    participants.splice(participantIndex, 1);
    return participantData;
  }
  //* Tüm katılımcı listesini silme
  deleteAllParticipants(interact: string): boolean {
    if (interact == 'i agree') {
      participants.splice(0, participants.length);
      return true;
    } else
      throw new Error(
        "You not agree all participant delete! Please enter: 'i agree'.",
      );
  }
}
