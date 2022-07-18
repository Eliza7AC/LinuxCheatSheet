// * * * * * * * * * * *
// * * * CONSTANTS * * *
// * * * * * * * * * * *
const HIDDEN = 'hidden';
const VISIBLE = 'visible';

import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.css']
})
export class ArrayComponent implements OnInit {

  /** just one simple array */
  @Input() commands: any;
  title: string;
  colorArray: string;

  constructor(private route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    // alert(this.commands[0].colorArray)
    this.colorArray = this.commands[0].colorArray

    // TODO tile in arr
    this.title = this.commands[0].title
  }

  isLink(str: string){
    return str.startsWith('http');
  }


  // * * * * * * * * * * * * * * * * *
  // * * * SHOW AND HIDE BUTTON * * *
  // * * * * * * * * * * * * * * * * *

  areDescriptionsVisible = true; // by default
  areCommandsVisible = true; // by default

  hideDescriptions(){
    // this.isDVisible = false;
    for (let command of this.commands){
      command.statusDescription = HIDDEN;
    }
    this.areDescriptionsVisible = false;

    if (!this.areCommandsVisible){
      this.showCommands();
    }
  }

  showDescriptions() {
    // this.isDVisible = true;
    for (let command of this.commands) {
      command.statusDescription = VISIBLE;
    }
    this.areDescriptionsVisible = true;
  }

  hideCommands(){
    for (let command of this.commands){
      command.statusCommand = HIDDEN;
    }
    this.areCommandsVisible = false;

    if (!this.areDescriptionsVisible){
      this.showDescriptions();
    }
  }

  showCommands(){
    for (let command of this.commands) {
      command.statusCommand = VISIBLE;
    }
    this.areCommandsVisible = true;
  }



  // * * * * * * * * * * * * * * * * *
  // * * * VISIBILITY WITH MOUSE * * *
  // * * * * * * * * * * * * * * * * *

  revealDescription(i: number){
    if (!this.areDescriptionsVisible){
      this.commands[i].statusDescription = VISIBLE;
    }
  }

  concealDescription(i: number){
    if (!this.areDescriptionsVisible && this.commands[i].statusDescription == VISIBLE){
      this.commands[i].statusDescription = HIDDEN;
    }
  }

  revealCmd(i: number){
    if (!this.areCommandsVisible){
      // alert(this.commands[i].statusCommand);
      this.commands[i].statusCommand = VISIBLE;
      // alert(this.commands[i].statusCommand);
    }
  }

  concealCmd(i: number){
    if (!this.areCommandsVisible && this.commands[i].statusCommand == VISIBLE){
      this.commands[i].statusCommand = HIDDEN;
    }
  }


}
