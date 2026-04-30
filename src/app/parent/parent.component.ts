import {Component, OnInit} from '@angular/core';
import {ChildComponent} from "../child/child.component";
import {CComponent} from "../c/c.component";

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [
    ChildComponent,
    CComponent
  ],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss'
})
export class ParentComponent implements OnInit{
    ngOnInit(): void {
    }

    onClick(value: any) {

    }
}
