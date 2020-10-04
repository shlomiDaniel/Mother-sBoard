import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(public authService : AuthService) { }
  arrName=[];
  totalPrice =0;
  price=0;
  vat=0;
  paidFor =true;

  firstName = "";
  city = "";
  lastName = "";
  country = "";
  phoneNumber = "";
  fullAddress = "";

  ngOnInit(): void {
    this.calculateTotalPrice();
    this.getAllProductsDis();
    this.paidFor =true;
  }

  getAllProductsDis(){
    this.authService.getUserByEmail(localStorage.getItem("email")).subscribe(data=>{
      this.firstName = data.user.firstName,
      this.lastName = data.user.lastName,
      this.phoneNumber = data.user.phoneNumber,
      this.city = data.user.address.city.name,
      this.country = data.user.address.state.name,
      this.fullAddress = data.user.address.line1
      for(let i=0;i<data.user.Cart.products.length;i++){
        if(data.user.Cart.products[i]!==undefined&&data.user.Cart.amount[i]!==undefined){
          let item = {name:data.user.Cart.products[i].name,price:data.user.Cart.products[i].price,amount:data.user.Cart.amount[i]}
          this.arrName.push(item);
        }
      }
    })
    return this.arrName;
  }

  calculateTotalPrice(){

    this.authService.getUserByEmail(localStorage.getItem("email")).subscribe(data=>{
     
      this.totalPrice=0;
      this.price = 0;          
  
     for(let i =0;i<data.user.Cart.products.length;i++){
         this.totalPrice += parseFloat (data.user.Cart.products[i].price);
         this.price +=parseFloat (data.user.Cart.products[i].price);
     }
     this.vat = this.totalPrice*0.16;
     this.totalPrice+=this.vat;
    })
         return this.totalPrice;
  
  }


}
