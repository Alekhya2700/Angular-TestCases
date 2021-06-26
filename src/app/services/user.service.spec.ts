import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {User} from '../models/user';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all user when getUsersFormData is called', () => {
    const usersFromData = service.getUsersFromData();
    expect(usersFromData.length).toBe(2);
  });

  it('should add the user when add user is called ', () => {
    const user: User = {
      firstName: ' firstName',
      lastName: 'lastName',
      id: 2
    };
    service.addUser(user);
    const usersFromData = service.getUsersFromData();
    expect(usersFromData.length).toBe(3);
  });

  it('should delete the user when delete user is called', () => {
    const user: User = {
      id: 1,
      firstName: 'Durgesh',
      lastName: 'Pal'
    };
    service.deleteUser(user);
    const usersFromData = service.getUsersFromData();
    expect(usersFromData.length).toBe(1);
  });

  it('should update user details when update user is called ', () => {
    const user: User = {
      id: 1,
      firstName: 'Pal',
      lastName: 'Durgesh'
    };
    service.updateUser(user);
    const usersFromData = service.getUsersFromData();
    expect(usersFromData.length).toBe(2);
    const index = usersFromData.findIndex(u => 1 === u.id);
    expect(usersFromData[index].firstName).toBe('Pal');
    expect(usersFromData[index].lastName).toBe('Durgesh');
  });
});
