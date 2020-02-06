import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {
  @Input() question: string;
  @Input() approveText: string;
  @Input() denyText: string;
  @Output() isApproved = new EventEmitter<boolean>();
  @Output() closeDialogBox = new EventEmitter<void>();

  onApprove() {
    this.isApproved.emit(true);
  }

  onDeny() {
    this.isApproved.emit(false);
  }

  onClose() {
    this.closeDialogBox.emit();
  }
}
