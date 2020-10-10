import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// @ts-ignore
import {Gpu} from '../gpu/gpu.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {map} from 'rxjs/operators';
import nodemailer from 'nodemailer';
import axios from 'axios';
import { validateVerticalPosition } from '@angular/cdk/overlay';
import { AuthData } from '../../auth-data.model';
// import { GpuListComponent } from './gpu-list.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading=false;
  flag= false;

  user: AuthData;
  enteredContent = '';
  city = "";
 enteredTitle = '';
  mode = 'signup';
  imagePreview: string;
  _id : string;
  form :FormGroup;
  arrTemp = [];
  arrCity = [];

  // usersService:UserService;
  constructor(public authService: AuthService,private router : Router,public route :ActivatedRoute) { 
    // this.getAllCountries();
   
    // this.getAllCityByCountry(this.city);
  }
  onSignup(){
    // alert("aaaa");
    if (this.form.invalid){
      alert("error");
    validateVerticalPosition
      return;
    }
    this.isLoading = true;
    if(this.mode==='signup'){
      alert("asdasd");
      this.authService.createUser1(this.form.value.email,this.form.value.password,this.form.value.firstName,this.form.value.lastName,this.form.value.phoneNumber,this.form.value.userName);
      this.router.navigate(['/login']);
    }else{
      this.authService.updateUser(this._id,this.form.value.firstName, this.form.value.lastName, this.form.value.phoneNumber,
        this.form.value.userName, this.form.value.password, this.form.value.email);
    }
   
    this.form.reset();

 
    


  }
  // cityChecked(city:string){
  //   this.city = city;
  //   alert(this.city);
  // }

   
  // getAllCountries(){

  //   axios.get<{country:any[]}>('http://localhost:4500/country').then(data=>{
  //    data.data.country.forEach(el=>{
     
      
  //     this.arrTemp.push(el);
  //    });
    
  //  })
  //  console.log( this.arrTemp);
  //  }

  //  getAllCityByCountry(country:string){

  //   axios.get<{cities:any[]}>('http://localhost:4500/country/' + country ).then(data=>{
  //    data.data.cities.forEach(el=>{
     
      
  //     this.arrCity.push(el);
  //    });
    
  //  })
  //  console.log( this.arrCity);
  //  }
   
   


  ngOnInit(): void {
    if(this.authService.loggedIn()){
      this.flag=false;
    }else{
      this.flag=true;
    }
    this.form = new FormGroup({
      
      firstName:new FormControl(null,{validators:[Validators.required]}),
      lastName:new FormControl(null,{validators:[Validators.required]}),
      phoneNumber:new FormControl(null,{validators:[Validators.required]}),
      userName:new FormControl(null,{validators:[Validators.required]}),
      email:new FormControl(null,{validators:[Validators.required]}),
      password:new FormControl(null,{validators:[Validators.required]})
      
      
     });

        this.route.paramMap.subscribe((paramMap:ParamMap)=>{
          if(paramMap.has('_id')){
            this.mode = 'user/edit';
            
            this._id = paramMap.get('_id');
            this.isLoading = true;
            
             this.authService.getUserById(this._id).subscribe(data=>{
               this.isLoading = false;
               console.log("*************");
               //console.log(data.firstName);
              this.user = data.user;
           
               console.log( this.user);
            this.form.setValue({
            
              
              firstName:this.user.firstName,
              lastName:this.user.lastName,
              userName:this.user.userName,
              email:this.user.email,
              phoneNumber:this.user.phoneNumber,
              password:this.user.password,
              
           
             
           });
          // console.log(firstName);
           //  console.log(this.gpu.name);
           });
          }else{
            this.mode ='signup';
            this._id = null;
          }
    
        });
    
  }

}