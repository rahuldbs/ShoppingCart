import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemService } from 'src/app/item.service';
import { ItemEditDialogComponent } from '../item-edit-dialog/item-edit-dialog.component'
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: any[] = [];
  itemSubs: Subscription;

  constructor(public itemService: ItemService, public dialog: MatDialog) { }

  ngOnInit() {
    this.itemService.getItems();
    this.itemSubs = this.itemService.getUpdatedItemsListener().subscribe((items: any[])=>{
      this.items = items;
      console.log("products data: ", this.items);
    })
  }
  openEditDialog(selectedData): void{
    const dialogRef = this.dialog.open(ItemEditDialogComponent, {
      height: '80vh',
      width: '80%',
      data: selectedData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}
