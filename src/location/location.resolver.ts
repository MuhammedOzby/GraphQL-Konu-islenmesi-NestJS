import { Query, Args, Resolver, Mutation } from '@nestjs/graphql';
import { NewLocationInput } from './dto/new-location.model';
import { UpdateLocationInput } from './dto/update-location.model';
import { LocationService } from './location.service';
import { Location } from './models/location.model';

/**
 * * Location modülü resolver parçasıdır burada bulunan fonksiyonlar graphQL
 * * tarafından çağırılanlardır.
 * ! İşlemlerin hepsi service sınıfında olmaktadır.
 */
@Resolver()
export class LocationResolver {
  constructor(private readonly locationService: LocationService) {}
  //* Tüm lokasyonları getirme
  @Query(() => [Location])
  async getLocations() {
    return this.locationService.findAll();
  }
  //* id verilen lokasyonu getirme
  @Query(() => Location)
  async getLocation(@Args('id') id: number): Promise<Location> {
    return this.locationService.findOne(id);
  }
  //* Lokasyon Ekleme
  @Mutation(() => Location)
  async addLocation(@Args('data') data: NewLocationInput): Promise<Location> {
    return this.locationService.addLocation(data);
  }
  //* Lokasyon Güncelleme
  @Mutation(() => Location)
  async updateLocation(
    @Args('data') data: UpdateLocationInput,
  ): Promise<Location> {
    return this.locationService.updateLocation(data);
  }
  //* Lokasyon Silme
  @Mutation(() => Location)
  async deleteLocation(@Args('id') id: number): Promise<Location> {
    return this.locationService.deleteLocation(id);
  }
  //* Tüm lokasyonları silme
  @Mutation(() => Location)
  async deletaAllLocation(
    @Args('interact') interact: string,
  ): Promise<boolean> {
    return this.locationService.deleteAllLocation(interact);
  }
}
