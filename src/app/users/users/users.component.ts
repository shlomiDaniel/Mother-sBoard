

// @ts-ignore
import {Product} from '../product.model';
import {FormGroup, FormControl,Validators} from '@angular/forms';

import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ParamMap } from '@angular/router';

import { ProductListComponent } from 'src/app/product-list/product-list.component';



import {Component, OnInit, Input, OnDestroy, ErrorHandler} from '@angular/core';
import {Subscription} from 'rxjs';
// @ts-ignore
import {Product} from '../product/product.model';

import {ProductsService} from '../../product-list/product.service';
import { AuthService } from '../../auth/auth.service';
import { AuthData } from 'src/app/auth/auth-data.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from 'src/app/auth/dialog-message/dialog-message.component';
import { ThrowStmt } from '@angular/compiler';
import { HttpResponse } from '@angular/common/http';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  private authStatusSubs : Subscription;
  userIsAuthenticated = false;
  user : AuthData;
  users: AuthData [] = [];
  private usersSub: Subscription;
  userName = "";
  mode = 'signup';
  // id;
    _id:string;
 form : FormGroup;
 isLoading = false;
 private sub:any = null;
  constructor( private authService : AuthService,public route :ActivatedRoute,public router: Router) {
    if (!authService.loggedIn()) {
      //  this.location.replace('/home');
     // expect(location.path()).toBe('/home');
     //window.location('/home');
   //this.location.replaceState('/home'); // clears browser history so they can't navigate with back button
   //  this.router.navigate(['home']);
//    this.router.navigateByUrl('http://localhost:4200/home');
//    this.router.events.subscribe(val=>{
      
//     console.log(val instanceof NavigationEnd) 
//     this.router.navigateByUrl('http://localhost:4200/home');
//  })
  
  }

  
  }

 

  ngOnDestroy(): void {
        this.usersSub.unsubscribe();
       // this.authStatusSubs.unsubscribe();
    }

    updateUser(_id:string){
      this.authService.getUserById(_id);
    }

    deleteUser(_id:string){
      alert(_id);
      this.authService.deleteUserById(_id);
     // alert("asd");deleteUser
    }

    checkConnections(){
      return this.authService.loggedIn();
    }

 



  ngOnInit(): void {
   this.authService.getUserByEmail( localStorage.getItem("email")).subscribe(data=>{
     this.userName = data.user.userName;
     console.log(this.userName);
   })
    // if (!localStorage.getItem('foo')) { 
    //   localStorage.setItem('foo', 'no reload') 
    //   location.reload() 
    // } else {
    //   localStorage.removeItem('foo') 
    // }

  

  //   if(!this.authService.loggedIn()){
  //     alert("You cannot access this page");
  //     this.router.navigate(['/home']);
  // }


//   if (!this.authService.loggedIn()) {
//     //this.location.replaceState('/'); // clears browser history so they can't navigate with back button
//     this.router.navigate(['home']); // tells them they've been logged out (somehow)
// }

  
    this.isLoading = true;
   
    this.authService.getUsers();
    console.log(this.authService.getUsers());
    this.usersSub = this.authService.getUserUpdateListner().subscribe((users: AuthData[]) => {

      this.isLoading = false;
      this.users = users;
      this.users
      console.log(this.users);
      
    });


   
    // this.userIsAuthenticated = this.authService.getIsAuth();
    // this.authStatusSubs =   this.authService.getAuthStatusListner().subscribe(isAuthenticated=>{
    //   this.userIsAuthenticated = isAuthenticated;
    // });
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





  }

}
