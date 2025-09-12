import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{
  constructor(private userService: UserService) {
  }
    ngOnInit(): void {
    this.getUserList();
    }

    getUserList() {
    this.userService.getAllUsers().subscribe({
      next: (response: any) => {
        console.log('response: ', response) ;
      },
      complete:() =>{

      }, error: (err: any) => {
        console.error(err?.error);
        console.error(err?.error?.message);
      }
    })
    }

}
