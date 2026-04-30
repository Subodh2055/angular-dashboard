import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = `User's Dashboard`;
  version = 0;
  date: Date = new Date();

  numners = [5, 8, 7, 9, 3, 7, 2]

  greaterNumner = [7, 4, 8, 13, 12, 7, 11];

  frequent = [1, 3, 4, 2, 4, 3, 2, 5, 4, 5];

  ngOnInit(): void {
    const filterData = this.numners.filter((f: any) => {
      return f === 7;
    });
    console.log(filterData);
    const greater = this.greaterNumner.find((f: any) => {
      if (f === 13) {
        return f;
      }
    });
    console.log('greater', greater);

    const frequentelement = this.frequent.forEach((f: any) => {
      if (f?.frequent) {
        return f;
      }
    });
    console.log('frequentelement', frequentelement);

  }


}
