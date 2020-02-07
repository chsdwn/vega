import { ErrorHandler, Inject, NgZone, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AppErrorHandler implements ErrorHandler {
  constructor(
    private ngZone: NgZone,
    @Inject(ToastrService) private toastr: ToastrService
  ) { }

  handleError(error: any): void {
    // This code puts in a zone. When a code runs in Zone, Angular runs it before changed detection.
    this.ngZone.run(() => {
      this.toastr.error('An error occured!');
    });
  }
}
