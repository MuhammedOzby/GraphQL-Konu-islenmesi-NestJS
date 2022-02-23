import { Injectable } from '@nestjs/common';
import { v4 as uuid_v4 } from 'uuid';
import { events } from '../../data/data.json';
import { NewEventInput } from './dto/new-event.model';
import { UpdateEventInput } from './dto/update-event.model';
import { Event } from './models/event.model';

@Injectable()
export class EventService {
  private readonly events: Array<Event> = events;
  //* Tüm eventleri getirme
  findAll(): Event[] {
    return this.events;
  }
  //* Verilen kullanıcı idsine sahip eventleri getirme
  findAllByUserID(id: number): Event[] {
    return events.filter((event) => event.user_id == id);
  }
  //* id verilen etkinliği getirir.
  findOne(id: number): Event {
    return events.find((event) => event.id == id);
  }
  //* event ekleme
  addEvent(data: NewEventInput): Event {
    const event = {
      id: parseInt(uuid_v4().toString().replace('-', ''), 16),
      title: data.title,
      desc: data.desc,
      date: data.date,
      from: data.from,
      to: data.to,
      location_id: data.location_id,
      user_id: data.user_id,
    };
    events.push(event);
    return event;
  }
  //* event güncelleme
  updateEvent(data: UpdateEventInput): Event {
    const eventIndex = events.findIndex((element) => {
      return element.id == data.id;
    });
    if (eventIndex == -1) {
      throw new Error('Event not defined!');
    }
    events[eventIndex] = {
      ...events[eventIndex],
      ...data,
    };
    return events[eventIndex];
  }
  //* event silme
  deleteEvent(id: number): Event {
    const eventIndex = events.findIndex((element) => {
      return element.id == id;
    });
    if (eventIndex == -1) {
      throw new Error('Event not defined!');
    }
    const eventData = events[eventIndex];
    events.splice(eventIndex, 1);
    return eventData;
  }
  //* Tüm eventleri silme
  deleteAllEvents(interact: string): boolean {
    if (interact == 'i agree') {
      events.splice(0, events.length);
      return true;
    } else
      throw new Error(
        "You not agree all event delete! Please enter: 'i agree'.",
      );
  }
}
