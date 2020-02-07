import { ErrorHandler, Inject, NgZone, Injectable, isDevMode } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://38dc44300843474d814a7c4b9d427505@sentry.io/2322182'
});

@Injectable({
  providedIn: 'root'
})
export class AppErrorHandler implements ErrorHandler {
  constructor(
    private ngZone: NgZone,
    @Inject(ToastrService) private toastr: ToastrService
  ) { }

  handleError(error: any): void {
    if (!isDevMode()) {
      const eventId = Sentry.captureException(error.originalError || error);
    } else {
      throw error;
    }
    // Sentry.showReportDialog({ eventId });

    // This code puts in a zone. When a code runs in Zone, Angular runs it before changed detection.
    this.ngZone.run(() => {
      this.toastr.error('An error occured!');
    });
  }
}
