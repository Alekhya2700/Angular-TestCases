import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {UserService} from './services/user.service';
import {User} from './models/user';
import {By} from '@angular/platform-browser';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [UserService]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should call delete method on user service when called remove user', () => {
    const userService: UserService = fixture.debugElement.injector.get(UserService);
    const user: User = {
      firstName: 'firstName',
      id: 1,
      lastName: 'lastName'
    };
    spyOn(userService, 'deleteUser');
    app.removeUser(user);
    expect(userService.deleteUser).toHaveBeenCalledOnceWith(user);
  });

  it('should call delete method on user service when called update user', () => {
    const userService: UserService = fixture.debugElement.injector.get(UserService);
    const user: User = {
      firstName: 'firstName',
      id: 1,
      lastName: 'lastName'
    };
    spyOn(userService, 'updateUser');
    app.editedUser = user;
    app.updateUser();
    expect(userService.updateUser).toHaveBeenCalledOnceWith(user);
  });

  it('should call add method on user service when added a new user', () => {
    const userService: UserService = fixture.debugElement.injector.get(UserService);
    const user: User = {
      firstName: 'firstName',
      id: 1,
      lastName: 'lastName'
    };
    app.isNewUser = true;
    spyOn(userService, 'addUser');
    app.saveUser(user);
    expect(userService.addUser).toHaveBeenCalledOnceWith(user);
  });

  it('should call getUsersForm data on user service when getUsers called', () => {
    const userService: UserService = fixture.debugElement.injector.get(UserService);
    spyOn(userService, 'getUsersFromData');
    app.getUsers();
    expect(userService.getUsersFromData).toHaveBeenCalledTimes(1);
  });

  it('should show new user form when showAddUserForm is called', () => {
    app.showAddUserForm();
    fixture.detectChanges();
    const newUserForm = fixture.debugElement.query(By.css('#newUserForm'));
    expect(newUserForm).toBeTruthy();
  });

  it('should show edit user form when showEditUserForm is called', () => {
    const user: User = {
      firstName: 'firstName',
      id: 1,
      lastName: 'lastName'
    };
    app.showEditUserForm(user);
    fixture.detectChanges();
    const editUserForm = fixture.debugElement.query(By.css('#editUserForm'));
    expect(editUserForm).toBeTruthy();
  });

  it('should close edit user form when clicked on cancel edit', () => {
    const user: User = {
      firstName: 'firstName',
      id: 1,
      lastName: 'lastName'
    };
    app.showEditUserForm(user);
    fixture.detectChanges();
    let editUserForm = fixture.debugElement.query(By.css('#editUserForm'));
    expect(editUserForm).toBeTruthy();
    app.cancelEdits();
    fixture.detectChanges();
    editUserForm = fixture.debugElement.query(By.css('#editUserForm'));
    expect(editUserForm).toBeNull();
  });

  it('should close new user form when clicked on cancel add user', () => {
    app.showAddUserForm();
    fixture.detectChanges();
    let newUserForm = fixture.debugElement.query(By.css('#newUserForm'));
    expect(newUserForm).toBeTruthy();
    app.cancelNewUser();
    fixture.detectChanges();
    newUserForm = fixture.debugElement.query(By.css('#newUserForm'));
    expect(newUserForm).toBeNull();
  });
});