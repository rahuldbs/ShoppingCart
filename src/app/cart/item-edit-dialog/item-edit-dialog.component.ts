import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemService } from 'src/app/item.service';

@Component({
  selector: 'app-item-edit-dialog',
  templateUrl: './item-edit-dialog.component.html',
  styleUrls: ['./item-edit-dialog.component.css']
})
export class ItemEditDialogComponent implements OnInit {

  availableQty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectedQty = 0;
  selectedSize = ""

  constructor(public dialogRef: MatDialogRef<ItemEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public item: any, public itemService: ItemService) {
    console.log("selected data: ", item);
    this.selectedQty = item.p_quantity;
    this.selectedSize = item.p_selected_size.code;
  }

  ngOnInit() {
  }

  onEdit(data) {
    console.log(this.selectedSize + " " + this.selectedQty);
    const sizeName = this.getSizeName(this.selectedSize);
    data.p_selected_size.name = sizeName;
    data.p_selected_size.code = this.selectedSize;
    data.p_quantity = this.selectedQty;
    this.itemService.editItem(data);
    this.selectedQty = 0;
    this.selectedSize = "";
    this.dialogRef.close();
  }

  getSizeName(code) {
    let value = ""
    switch (code) {
      case "s":
        value = "small"
        break;
      case "m":
        value = "medium"
        break;
      case "l":
        value = "large"
        break;
      case "xl":
        value = "extra large"
        break;
      default:
        break;
    }
  }

}
