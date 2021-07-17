import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css']
})
export class DetailsDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}