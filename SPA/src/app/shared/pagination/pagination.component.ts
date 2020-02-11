import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input('total-items') totalItems: number;
  @Input('page-size') pageSize: number;
  @Output('page') page = new EventEmitter<number>();

  currentPage = 1;
  pageCount = 0;

  ngOnChanges() {
    this.pageCount = Math.ceil(this.totalItems / this.pageSize);
    console.log(this.pageCount);
  }

  previousPage() {
    if (this.currentPage !== 1) {
      this.currentPage--;
      this.emitCurrentPage();
    }
  }
  
  nextPage() {
    if (this.currentPage < this.pageCount) {
      this.currentPage++;
      this.emitCurrentPage();
    }
  }

  private emitCurrentPage() {
    this.page.next(this.currentPage);
  }
}
