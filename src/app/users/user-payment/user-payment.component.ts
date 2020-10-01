import { Component, ElementRef, NgZone, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { AuthData } from '../../auth/auth-data.model';
// import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { validateVerticalPosition } from '@angular/cdk/overlay';
import { ThrowStmt } from '@angular/compiler';
import { MapsAPILoader } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



import axios from 'axios';
import {Title} from '@angular/platform-browser';
import {Location, Appearance, GermanAddress,MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';

import PlaceResult = google.maps.places.PlaceResult;
import { HttpClient } from '@angular/common/http';
import { TimeInterval } from 'rxjs';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css']
})
export class UserPaymentComponent implements OnInit {

  user: AuthData;
  // city = "";
  _id : string;
  lastName = "";
  phoneNumber = "";
  vat = 0;
  // currentCountry = "";
  form :FormGroup;
  arrTemp = [];
  arrCity = [];
  price = 0;
  fullAddress = "";
  public city: string; 
	public country: string;
  totalPrice =0;
  firstName="";
  constructor(public authService: AuthService,private router : Router,public route :ActivatedRoute,
    private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,private titleService: Title,public http:HttpClient) { 
// this.getAllCountries();
// this.cityChecked();
}


  ngOnInit(): void {
    console.log( this.user);

    this.form = new FormGroup({
      firstName:new FormControl(null,{validators:[Validators.required]}),
      lastName:new FormControl(null,{validators:[Validators.required]}),
      phoneNumber:new FormControl(null,{validators:[Validators.required]}),
      country:new FormControl(null,{validators:[Validators.required]}),
      city:new FormControl(null,{validators:[Validators.required]}),
      fullAddress:new FormControl(null,{validators:[Validators.required]}),
      zipCode:new FormControl(null,{validators:[Validators.required]})
     // country:new FormControl(null,{validators:[Validators.required]})
     });
              alert("data.user.email");
              console.log( this.user);

       let email = localStorage.getItem("email");
        this.authService.getUserByEmail(email).subscribe(data=>{
        this.user = data.user;
        //this.city = data.user.address.city;
        
        
        // console.log("@@@@@@@@@@@;@@");
        // console.log( this.user.address);
        // console.log( this.user.address.city);
        // // console.log( );
        // console.log( this.user.address.city.type.name);
        
        // console.log( this.user.address.state.type);

        console.log(this.user);
       this.firstName = data.user.firstName;
       this.lastName = data.user.lastName;
       this.phoneNumber = data.user.phoneNumber;
       this.country = data.user.address.state.name;
        this.city =this.user.address.city.name;
        this.fullAddress = this.user.address.line1;
      //  this.fullAddress = data.user.address.line1;
      //  console.log(data.user.address.line1);
       alert(data.user.address.line1);
       console.log( this.fullAddress);
        this.totalPrice=0;
        this.price = 0;          
         console.log( this.user);

       for(let i =0;i<data.user.Cart.products.length;i++){
           this.totalPrice += parseFloat (data.user.Cart.products[i].price);
           this.price +=parseFloat (data.user.Cart.products[i].price);
       }
       this.vat = this.totalPrice*0.16;
       this.totalPrice+=this.vat;
              // this._id=data.user._id;
                this.form.setValue({       
                  firstName:this.user.firstName,
                  lastName:this.user.lastName,
                  phoneNumber:this.user.phoneNumber,
                  price : this.totalPrice,

                  country:this.user.address.state.name,
                  city:this.user.address.city.name,
                  address:this.user.address.line1
             });
           });
           console.log( this.user);

    
            
  }
  savePayment(){

  }

  cityChecked(){
    
   
    axios.get<{cities:any[]}>('http://localhost:4500/country/' +this.country).then(data=>{
      console.log( data.data.cities);
      
      data.data.cities.forEach(el=>{

       this.arrCity.push(el.name);
      });
     })
    console.log(this.arrCity);
    

  }
  changeClient(event){
    this.country = event;
    alert(this.country);
    

    axios.get<{cities:any[]}>('http://localhost:4500/country/' +this.country).then(data=>{
      console.log( data.data.cities);
        this.arrCity = [];

      data.data.cities.forEach(el=>{
       this.arrCity.push(el.name);
      });
     })
    console.log(this.arrCity);
  }

  getAllCountries(){
    axios.get<{country:any[]}>('http://localhost:4500/country').then(data=>{
     data.data.country.forEach(el=>{
      this.arrTemp.push(el);
     });
    })
   console.log( this.arrTemp);
   }

   getAllCityByCountry(country:string){
    axios.get<{cities:any[]}>('http://localhost:4500/country/' + country ).then(data=>{
     data.data.cities.forEach(el=>{
      this.arrCity.push(el);
     });
   })
   console.log( this.arrCity);
   }

}
