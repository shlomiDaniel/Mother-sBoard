import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
// @ts-ignore
import {Product} from '../product/product.model';
import {ProductsService} from './product.service';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  private authStatusSubs : Subscription;
  userIsAuthenticated = false;

  products: Product [] = [];
  private productsSub: Subscription;
  productsService: ProductsService;
  
  // id;
 // _id;
 isLoading = false;
  constructor(productsService: ProductsService, private authService : AuthService) {
    this.productsService = productsService;
  }

  ngOnDestroy(): void {
        this.productsSub.unsubscribe();
       // this.authStatusSubs.unsubscribe();
    }

    updateProduct(_id:string){
      this.productsService.getProductById(_id);
    }

    deleteProduct(_id:string){
      this.productsService.deleteProductById(_id);
    }

    checkConnections(){
      return this.authService.loggedIn();
    }
  ngOnInit(): void {
    this.isLoading = true;
     this.productsService.getProducts();
    this.productsSub = this.productsService.getPostUpdateListner().subscribe((products: Product[]) => {
      this.isLoading = false;
      this.products = products;
      
    });
   
    
  }

}
