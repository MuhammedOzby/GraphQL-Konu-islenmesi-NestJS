import { Injectable } from '@nestjs/common';
import { v4 as uuid_v4 } from 'uuid';
import { locations } from '../../data/data.json';
import { NewLocationInput } from './dto/new-location.model';
import { UpdateLocationInput } from './dto/update-location.model';
import { Location } from './models/location.model';
@Injectable()
export class LocationService {
  private readonly locations: Array<Location> = locations;
  //* Tüm lokasyonları getirme
  findAll(): Location[] {
    return this.locations;
  }
  //* id bilgisi verilen lokasyonu getirme
  findOne(id: number): Location {
    return this.locations.find((location) => location.id == id);
  }
  //* Lokasyon ekleme
  addLocation(data: NewLocationInput): Location {
    const location: Location = {
      id: parseInt(uuid_v4().toString().replace('-', ''), 16),
      name: data.name,
      desc: data.desc,
      lat: data.lat,
      lng: data.lng,
    };
    locations.push(location);
    return location;
  }
  //* Lokasyon Güncelleme
  updateLocation(data: UpdateLocationInput): Location {
    const locationIndex = locations.findIndex((element) => {
      return element.id == data.id;
    });
    if (locationIndex == -1) {
      throw new Error('Location not defined!');
    }
    locations[locationIndex] = {
      ...locations[locationIndex],
      ...data,
    };
    return locations[locationIndex];
  }
  //* Lokasyon silme
  deleteLocation(id: number): Location {
    const locationIndex = locations.findIndex((element) => {
      return element.id == id;
    });
    if (locationIndex == -1) {
      throw new Error('Location not defined!');
    }
    const locationData = locations[locationIndex];
    locations.splice(locationIndex, 1);
    return locationData;
  }
  //* Tüm lokasyonları silme
  deleteAllLocation(interact: string): boolean {
    if (interact == 'i agree') {
      locations.splice(0, locations.length);
      return true;
    } else
      throw new Error(
        "You not agree all location delete! Please enter: 'i agree'.",
      );
  }
}
