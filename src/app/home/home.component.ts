import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }

  // changeColor(){
  //   let pre = document.getElementsByClassName("pre");
  //   let myPreBgColor = window.getComputedStyle(pre[0]).backgroundColor;
  //
  //   alert(myPreBgColor)
  //   if (!(myPreBgColor == 'rgba(255, 255, 128, 0)')){
  //
  //     alert('hey')
  //     return 'pink';
  //   }
  //   else{
  //     alert('hola');
  //     return 'orange';
  //   }
  // }



}
