import { Injectable } from '@nestjs/common';
import { v4 as uuid_v4 } from 'uuid';
import { users } from '../../data/data.json';
import { NewUserInput } from './dto/new-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  private readonly users: Array<User> = users;
  //* Tüm kullanıcıları bulan servisimiz.
  findAll(): User[] {
    return this.users;
  }
  //* id verilen kullanıcıyı bulan servisimiz.
  findOne(id: number): User {
    return users.find((user) => user.id == id);
  }
  //* Kullanıcı ekleten servisimiz.
  addUser(data: NewUserInput): User {
    const user = <User>{
      id: parseInt(uuid_v4().toString().replace('-', ''), 16),
      username: data.username,
      email: data.email,
    };
    users.push(user);
    return user;
  }
  //* Kullanıcı güncelleyen servisimiz.
  updateUser(data: UpdateUserInput): User {
    const userIndex: number = users.findIndex((element) => {
      return element.id == data.id;
    });
    if (userIndex == -1) {
      throw new Error('User not defined!');
    }
    users[userIndex] = {
      ...users[userIndex],
      ...data,
    };
    return users[userIndex];
  }
  //* id verilen kullanıcıyı silme
  deleteUser(id: number): User {
    const userIndex = users.findIndex((element) => {
      return element.id == id;
    });
    if (userIndex == -1) {
      throw new Error('User not defined!');
    }
    const userData = users[userIndex];
    users.splice(userIndex, 1);
    return userData;
  }
  //* tüm kullanıcıları silme
  deleteAllUsers(interact: string): boolean {
    if (interact == 'i agree') {
      users.splice(0, users.length);
      return true;
    } else
      throw new Error(
        "You not agree all user delete! Please enter: 'i agree'.",
      );
  }
}
