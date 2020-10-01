import { Component, OnInit, OnDestroy } from '@angular/core';
// @ts-ignore
import {Product} from '../product/product.model';
import {ProductsService} from '../product-list/product.service';
import {Subscription, concat} from 'rxjs';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent  implements OnInit, OnDestroy {
  products: Product [] = [];
  panelOpenState = false;
  filteredArrayProduct= [];
  filteredArray =[];
  section :any=[];
  enteredValue="";
  public productsNvidia: Product  = [];
  amdGpu = [];
   nvidia = [];
   productNames :string [];
   categories : string[];
   manufacturers : string [];

  containsProduct(products:any){
    products = this.productService.getAndReturnProducts();
    // for(let i=0;i<gpus.length;i++){
    //     if(gpus[i].name.includes("Nvidia")){
    //       this.gpusNvidia.push(gpus[i]);  
    //     }else if(gpus[i].name.includes("AMD")){
          
    //       this.gpusAmd.push(gpus[i]);
    //     }
    // } 

  }


  // for i in range(0, len(arr)):  
  //   for j in range(i+1, len(arr)):  
  //       if(arr[i] == arr[j]):  
  //           print(arr[j]);  

  duplicate(name,arr){
    if(arr.length===0){
      return false;
    }
   for(let i =0;i<arr.length;i++){
     if(arr[i].name===name){
       return true;
     }else{
       return false;
     }
   }

  }


  yourfunc(e) {
    if(e.target.checked){   
      alert("cheked")     
    }
 }

  clickMe(){
    //this.name = this.enteredValue;
     this.enteredValue = this.enteredValue.toUpperCase();
    this.products =   this.productService.getAndReturnProducts();
    
    this.filteredArray = this.productService.getProductByName(this.enteredValue,this.products).concat(this.productService.getProductByCompany(this.enteredValue,this.products));
    
    // console.log("here");
 //   console.log(this.filteredArray);
    this.filteredArrayProduct = this.filteredArray;
    console.log("dddddd");
    console.log(this.filteredArray);
   // this.containsGpu(this.gpus);
    //this.name = this.filteredArray;
  }
  private productSubs: Subscription;
  productService: ProductsService;



  constructor(productService: ProductsService,public http : HttpClient) {
    this.productService = productService;
 
  }

 

  ngOnInit(): void {
    // this.gpusNvidia = this.gpusService.getGpus();
  // 

  
  // this.category = 

   this.productService.getProducts();

    this.productService.getAllCategory().subscribe(data=>{
      this.categories = data.categories
      console.log(data);

   })
   this.productService.getAllProductNames().subscribe(data=>{
    this.productNames = data.productNames
    console.log(data);

 })

   this.productService.getAllManuFacturer().subscribe(data=>{
    this.manufacturers = data.manufacturers
    console.log(data);

 })





  //  this.http.get<{categories : string[]}>("http://localhost:4500/product/distinct/productCategories").subscribe(data=>{
  //      this.categories = data.data.categories;
  //  })
     

  // axios.get<{categories:string[]}>("http://localhost:4500/product/distinct/productCategories").then(data=>{
       
  // this.categories = data.data.categories;
  
  //    })
       
  
   this.productSubs = this.productService.getPostUpdateListner().subscribe((products: Product[]) => {
     this.products = products;
    this.productsNvidia = products;
    
 
 
        
       
       for(let i=0;i<products.length;i++){
        if(products[i].name!= undefined){
          if(products[i].name.includes("AMD")){
            
              
               // this.productsAmd.push(products[i]);  
              
           
          
            //duplicate
            
          }
          if(products[i].name.includes("Nvidia")){
            this.nvidia.push(products[i]);  
          }

          
         
        }
            
        
    
        
    } 
    
    console.log("nvidia");
    console.log(this.nvidia);

    console.log("amd");
   // console.log(this.productsAmd);
   });
  
 
  }

  ngOnDestroy(){
    this.productSubs.unsubscribe();

  }

}
