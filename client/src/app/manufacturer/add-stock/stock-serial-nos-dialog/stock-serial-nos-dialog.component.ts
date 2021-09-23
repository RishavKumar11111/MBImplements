import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stock-serial-nos-dialog',
  templateUrl: './stock-serial-nos-dialog.component.html',
  styleUrls: ['./stock-serial-nos-dialog.component.css']
})
export class StockSerialNosDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<StockSerialNosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  removeStockSerialNo(x: any) {
    const index = this.data.stockSerialNos.findIndex((a: any) => a.StockSerialNo === x.StockSerialNo);
    if (index !== -1) {
      this.data.stockSerialNos.splice(index, 1);
      this.data.tempStockSerialNos.splice(index, 1);
      if (this.data.stockSerialNos.length === 0) {
        this.onCloseClick();
      }
    }
  }

  onCloseClick(): void {
    this.dialogRef.close({
      stockSerialNos: this.data.stockSerialNos,
      tempStockSerialNos: this.data.tempStockSerialNos
    });
  }
}