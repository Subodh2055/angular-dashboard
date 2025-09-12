import { Component, EventEmitter, Input, Output } from '@angular/core';
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  standalone: true,
  imports: [
    NgbPagination,
    NgIf
  ],
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() page: number = 1;
  @Input() pageSize: number = 10;
  @Input() collectionSize: number = 0;
  @Input() maxSize: number = 5;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.collectionSize / this.pageSize);
  }

  onPageChange(newPage: number) {
    this.pageChange.emit(newPage);
  }
}
