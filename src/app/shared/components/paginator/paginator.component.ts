import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from '../../../../environments/environment.development';
@Component({
  selector: 'agb-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent {
  @Output() onChangePage: EventEmitter<number> = new EventEmitter<number>();
  @Input() length!: number;
  @Input() currentPage: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = environment.PAGE_SIZE;

  changePage(event: any) {
    this.currentPage = event.pageIndex ?? event.value;
    this.paginator.pageIndex = this.currentPage;
    this.onChangePage.emit(this.currentPage);
  }
}
