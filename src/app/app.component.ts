import { Component } from '@angular/core';

const LIGHT = 'LIGHT';
const DARK = 'DARK';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'untitled16';


  theme = LIGHT;

  themeIsLight(){
    return this.theme == LIGHT;
  }

  changeTheme(){
    if (this.theme==LIGHT){
      this.theme = DARK;
    }
    else{
      this.theme = LIGHT;
    }
  }


}
