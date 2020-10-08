import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import axios from 'axios';
@Component({
  selector: 'app-user-order-history',
  templateUrl: './user-order-history.component.html',
  styleUrls: ['./user-order-history.component.css']
})
export class UserOrderHistoryComponent implements OnInit {

  constructor(public http:HttpClient,public authService:AuthService) { }
  _id = "";
  ordersNames =  [];
  ngOnInit(): void {

    this.authService.getUserByEmail(localStorage.getItem("email")).subscribe(data=>{
     
      
       axios.get("http://localhost:4500/orders/" + data.user._id ).then((data2)=>{
         
      
     //  this.namesOfProduct =  data.user.orderHistory.filter(p=>ordersNames.push(p));
      //  this.imagePath = data.product.imgPath,
      //  this.imgPathCompanyLogo = data.product.imgPathCompanyLogo,
      //  this.price = data.product.price,
      //  this.description = data.product.description,
      //  this.name = data.product.name
      //data2.data.order.products.filter(p=>this.ordersNames.push(p.name));
  
       console.log(data2);
       })
    })
   
  }

}
