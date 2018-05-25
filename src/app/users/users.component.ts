import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: []
})
export class UsersComponent implements OnInit {
  users: User[];
  user: User;
  first_name: String;
  last_name: String;
  phone_number: String;

  constructor(private userService: UserService) { }

  // add user function
  addUser() {
    const newUser = {
      first_name: this.first_name,
      last_name: this.last_name,
      phone_number: this.phone_number
    };
    this.first_name = null;
    this.last_name = null;
    this.phone_number = null;
    this.userService.addUser(newUser)
      .subscribe(user => {
        this.users.push(user);
        this.userService.getUsers()
          .subscribe(users =>
          this.users = users);
      });
  }

  // delete user function
  deleteUser(id: any) {
    const users = this.users;
    this.userService.deleteUser(id)
      .subscribe(data => {
        if (data.n === 1) {
          for (let i = 0; i < users.length; i++) {
            if (users[i]._id === id) {
              users.splice(i, 1);
            }
          }
        }
      this.userService.getUsers()
      // tslint:disable-next-line:no-shadowed-variable
      .subscribe(users =>
      this.users = users);
      });
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(users =>
      this.users = users);
  }

}
