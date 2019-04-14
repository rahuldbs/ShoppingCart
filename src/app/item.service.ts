import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private items: any[] = [];
  private itemsUpdated = new Subject<any[]>();

  constructor(private http: HttpClient) { }

  getItems() {
    this.http.get("./assets/cart.json")
    .subscribe((jsonData) => {
      this.items = jsonData["productsInCart"];
      this.itemsUpdated.next([...this.items]);
    })
  }

  getUpdatedItemsListener(){
    return this.itemsUpdated.asObservable();
  }

  editItem(item: any) {
    const itemId = item.p_id;
    let updatedItems = this.items.filter(item => item.id !== itemId);
        item.id = itemId;
        updatedItems.push(item);
        this.items = updatedItems;
        this.itemsUpdated.next([...this.items]);
  }

}
