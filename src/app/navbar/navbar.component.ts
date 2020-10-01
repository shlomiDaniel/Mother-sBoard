import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscribable, Subscription } from 'rxjs';
import { useAnimation } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../auth/auth-data.model';

// const jwt = require('jsonwebtoken');
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {
  private authListenerSubs : Subscription;
  email= "";
  firstName="";
  userName="";
  changeText2 : boolean;
  changeText: boolean;
  AuthData : AuthData;
  imagePath = "";
  _idUser = "";
   _id="";
  userIsAuthenticated = false;
  constructor(private authService : AuthService,public http: HttpClient,public activeRoute:ActivatedRoute) {

    // this._id = this.authService.getUserId();
    // //  this.http.get<{user:AuthService}>("http://localhost:4500/user/" + this._id).subscribe(data=>{
    // //    this.userName = data.user.;
    // //  })
    // this.authService.getUserById(this._id).subscribe(data=>{
    //   this.userName = data.user.userName;
    // })
   }
  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
    
  }
  onLogOut(){
    this.authService.LogOut();
  }
  logout(){
    //this.authService.logout();
  }
  login(){
   // this.authService.login();
  }

  checkLoggingIn(){
    return this.authService.loggedIn();
  }
  func(img){
  //  alert(img);
   // console.log(img);
  }
  ngOnInit(): void {
    
    console.log('queryParams');
    this.activeRoute.params.subscribe(
     params => 
    this._idUser = params['_id']
     );

     if(this._idUser!==undefined){
      // alert("asdasda");
      
        
        this.http.get<{token:string,expiresIn:Date,user:AuthData}>("http://localhost:4500/user/info/google/" + this._idUser).subscribe(data=>{
          
         //console.log("asdasd"+data.expiresIn);
       //  this.authService.saveAuthData(data.token,data.expiresIn,data.user.email);
       this.authService.setToken(data.token);
       if(this.authService.loggedIn()){
        console.log(this.userName);
        this.userName = data.user.userName;
      //  alert(this.userName);
        this.email = data.user.email;
        this.firstName = data.user.firstName;
      //  this.lastName = data.user.lastName;
        this.imagePath = data.user.imagePath;
       // const date = Date.now();
        
        console.log("this is the email " + data.user.email);
             this.authService.saveDataInLocalStorage(data.user.email,data.user.firstName,data.user.lastName,data.user.phoneNumber,data.user.userName);
         console.log("this is the email " + data.user.email);


       }
          
          
        });
      
    

     }else{

     


      const _id = localStorage.getItem('_id');
      this.http.get<{user:AuthData}>('http://localhost:4500/user/' +_id).subscribe(data=>{
      // console.log(data.user.firstName);  
      // this.user.firstName = data.user.firstName;
       this.firstName = data.user.firstName,
       ///this.lastName = data.user.lastName,
      // this.phoneNumber = data.user.phoneNumber,
       this.email = data.user.email,
       this.userName = data.user.userName
      // alert(this.userName);
      
    });

  // });
     }





    
     this._id = this.authService.getUserId();
    //  this.http.get<{user:AuthService}>("http://localhost:4500/user/" + this._id).subscribe(data=>{
    //    this.userName = data.user.;
    //  })
    this.authService.getUserById(this._id).subscribe(data=>{
      this.userName = data.user.userName;
      console.log(data.user);
      this.imagePath = data.user.imagePath;
      
    //  alert(this.imagePath);
    //  alert(this.userName);
    })

    this.getUserByEmail();
 
  }

  getUserByEmail(){
    
    if(this.authService.loggedIn()){
     let email = this.authService.getEmailFromLocalStorage();
      this.email = email;
      let firstName = this.authService.getFirstNameFromLocalStorage();
      this.firstName = firstName;
      let userName =this.authService.getUserNameFromLocalStorage();
      this.userName = userName;
    }
    //this.authService.getUserByEmail
  }

 
}
