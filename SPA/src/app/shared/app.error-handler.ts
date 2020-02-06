import { ErrorHandler, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export class AppErrorHandler implements ErrorHandler {
  constructor(@Inject(ToastrService) private toastr: ToastrService) { }

  handleError(error: any): void {
    this.toastr.error('An error occured!');
  }
}
