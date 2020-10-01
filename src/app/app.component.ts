import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedGpus = [];
  // tslint:disable-next-line:typedef
   onGpuAdded(gpu){
     this.storedGpus.push(gpu);
   }
}
