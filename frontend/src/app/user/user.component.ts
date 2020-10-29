import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { UserPrivilage, User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() name: string = '';
  @Input() password: string = '';
  @Input() passwordConfirm: string = '';
  @Input() email: string = '';
  @Input() privilage: number = 0;

  user: User;
  users: User[];
  showLogin: boolean;
  showDetails: boolean;
  error: string;

  constructor(private userService: UserService) {
    this.beginLogin();
  }

  ngOnInit(): void {
  }

  // FLOW CONTROL METHODS

  doLogout() {
    this.user = null;
    this.beginLogin();
  }

  beginLogin() {
    this.resetInputCredentials();
    this.showLogin = true;
  }

  doLogin() {
    if(this.name.length == 0) {
      this.error = 'Cannot log in without a name';
    }
    else if(this.password.length == 0) {
      this.error = 'Cannot log in without a password';
    }
    else {
      this.error = null;
      this.getUser();
      this.hideUserDetails();
    }
  }

  beginRegistration() {
    this.showLogin = false;
    this.resetInputCredentials();
  }

  doRegistration() {
    if(this.name.length < 4) {
      this.error = 'You must have a username at least 4 characters long';
    }
    else if(this.password.length < 8) {
      this.error = 'You must have a password at least 8 characters long';
    }
    else if(this.password !== this.passwordConfirm) {
      this.error = 'Your passwords must match';
    }
    else if(this.email.length == 0) {
      this.error = 'You must have a valid email address';
    }
    else {
      this.error = null;
      this.addUser();
      this.beginLogin()
    }
  }

  showUserDetails() {
    this.resetInputCredentials();
    this.showDetails = true;
    this.name = this.user.name;
    this.email = this.user.email;
  }

  hideUserDetails() {
    this.resetInputCredentials();
    this.showDetails = false;
  }

  isAdmin(): boolean {
    return this.user.privilage === UserPrivilage.Admin;
  }

  // ADMIN ONLY CRUD METHODS

  getUsers(): void {
    if(this.user.privilage === UserPrivilage.Admin)
      this.userService.getUsers()
        .subscribe(users => this.users = users);
  }

  deleteUser(id: number): void {
    if(this.user.privilage === UserPrivilage.Admin) {
      this.userService.deleteUser(id).subscribe();
      this.getUsers();
    }
  }

  // GENERAL CRUD METHODS

  getUser(): void {
    this.userService.getUserByNameAndPassword(this.name, this.password)
      .subscribe(user => {
        this.user = user;
        this.getUsers();
      });
  }

  updateUser(): void {
    if(this.password !== this.passwordConfirm)
      this.error = 'Your passwords must match';
    else {
      this.error = null;
      this.user.name = this.name;
      this.user.password = this.password;
      this.user.email = this.email;
      this.userService.updateUser(this.user).subscribe();
      this.error = 'Update successful';
    }
  }

  addUser(): void {
    let user = new User(-1, this.name, this.password, this.email, this.privilage);
    // this.userService.getUserIdByName(this.name).subscribe((id: number) => {
    //   if(id < 0) {
    //     this.userService.addUser(new User(-1,
    //                                       this.name,
    //                                       this.password,
    //                                       this.email,
    //                                       this.privilage))
    //     .subscribe(() => this.getUsers());
        
    //   }
    //   else {
    //     console.log(this.name + ' exists with id ' + id);
    //     this.error = 'Name is already in use';
    //   }
    // });

    this.userService.addUser(new User(-1,
                                          this.name,
                                          this.password,
                                          this.email,
                                          this.privilage))
        .subscribe(() => this.getUsers());
  }

  deleteSelf(): void {
    this.userService.deleteUser(this.user.id).subscribe(() => {this.doLogout();});
  }

  // PRIVATE METHODS

  resetInputCredentials() {
    this.name = '';
    this.password = '';
    this.passwordConfirm = '';
    this.email = '';
    this.error = null;
    this.privilage = UserPrivilage.Standard;
  }
}
