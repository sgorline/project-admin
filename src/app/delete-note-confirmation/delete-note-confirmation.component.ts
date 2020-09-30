import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-note-confirmation',
  templateUrl: './delete-note-confirmation.component.html',
  styleUrls: ['./delete-note-confirmation.component.scss']
})
export class DeleteNoteConfirmationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteNoteConfirmationComponent>) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.dialogRef.close('confirmed');
  }
}
