// * * * * * * * * * * *
// * * * CONSTANTS * * *
// * * * * * * * * * * *
import {colors} from "@angular/cli/utilities/color";

const HIDDEN = 'hidden';
const VISIBLE = 'visible';

// declare var System: any;
// declare var require: any;
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class FileComponent implements OnInit {

  // * * * * * * * * * * * * *
  // * * * ROUTING PARAMS * * *
  // * * * * * * * * * * * * *

  category: string = 'Default Category';
  subCategory: string = 'Default subCategory';
  subCategoryPrint: string = ''; // if category == subCategory


  // * * * * * * * * * * * * * * * * * * * * * * * *
  // * * * ARRAY WITH DESCRIPTIONS AND COMMANDS * * *
  // * * * * * * * * * * * * * * * * * * * * * * * *

  @Input() filePath: string;
  commands: any[][];
  colorTitle: any; // used for category (BEFORE iteration = first color)
  color: any; // used for arrays AND subcat (AFTER iteration = last color)


  constructor(private route: ActivatedRoute, public router: Router){

    /** check if path is correct
     * and redirects user if he directly types in the URL
     * some weird URL */
    // let catAuthorized = ['Env', 'Fichiers', 'Système', 'Réseau', 'Sécurité', 'OSINT']
    // let subCatAuthorized = [
    //   'Shell', 'Raccourcis', 'Gestion', 'Recherche', 'Redirection',
    //   'Traitement', 'Archive', 'MAJ', 'Informations', 'Mémoire', 'Processus',
    //   'Utilisateurs', 'Capture', 'Scan', 'Hash', 'Aircrack', 'Web',
    //
    // ]

    // if (!catAuthorized.includes(this.route.snapshot.params['cat'])){
    //   // alert('bonjour ceci est la cat fichiers!')
    //   this.router.navigate(['/not-found']);
    //   // this.router.navigate(['/print','/OSINT','/OSINT']);
    //
    // }

    // this.readFile('assets/text/'+this.category+'/'+this.subCategory);
    // alert(this.commands)

    // alert(this.route.snapshot.params['subCat'])
    // TODO
    fetch('assets/text/'
      +this.route.snapshot.params['cat']
      +'/'
      +this.route.snapshot.params['subCat'])
      .then(response => response.text())
      .then(data => {
        if(data.includes('Cannot GET')){
          this.router.navigate(['/not-found']);
        }
      });


    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      /** * * very first loading of component (array) * * *
       * forcing to load info in component (array) for the first time
       * (otherwise, no information at all is displayed in component (¬_¬") )
       */
      if (this.commands == undefined){
        // TODO fonctionne avec la ligne suivante
        // this.readFile('assets/text/'+this.category+'/'+this.subCategory);
        // this.commands = this.commandsService.commands;
      }

      /** * * next loadings of components * * *
       * in order to display correctly infos in component (array)
       * (otherwise, just the first line of the component (array) changes (︶︹︺) )
       */
      else if (this.commands != undefined){
        // this.startOverArr();
      }
      return false;
    };

    /** forcing to make descriptions and commands visible */
    // this.showCommands();
    // this.showDescriptions();


  }



  ngOnInit(): void {
    // * * * RETRIEVING PATH IN ORDER TO LOAD MATCHING FILE * * *
    this.category = this.route.snapshot.params['cat'];
    this.subCategory = this.route.snapshot.params['subCat'];
    this.subCategoryPrint = this.calculateSubCategory(this.route.snapshot.params['subCat']);

    // * * * FILLING ARRAY * * *
    this.colorTitle = this.calculateColor();
    this.color = this.calculateColor();
    this.readFile('assets/text/'+this.category+'/'+this.subCategory);



    // * * * TO (NOT) DISPLAY DESCRIPTION / COMMAND IN ARR * * *
    // this.areDescriptionsVisible = this.commandsService.areDescriptionsVisible; // par défaut

  }

  calculateColor(){
    switch (this.category){
      case 'Env':       return '#315eb7'; // #0a4bb2
      case 'Fichiers':  return '#1687b0';
      case 'Système':   return '#630779';
      case 'Réseau':    return '#152b86';
      case 'Sécurité':  return '#a60850';
      case 'OSINT':     return '#e04e26';
      default:          return;
    }
  }

  colorAugmented(){
    // adding a range to hex number to have new color
    let nbColor = Number("0x"+this.color.split('#')[1])+10;
    return '#'+nbColor.toString(16);
  }


  calculateSubCategory(subCat : string){
    // avoiding to print the same name twice like that
    // [OSINT] ~ OSINT
    if (this.category == subCat){
      return '*';
    }
    else{
      return subCat;
    }
  }


  // * * * * * * * * * * * * * *
  // * * * PROCESSING FILE * * *
  // * * * * * * * * * * * * * *

  cmdFile : string;
  descriptionFile: string;

  readFile(path: string){
    fetch(path)
      .then(response => response.text())
      .then(data => {

        // alert(data)
        // if(data.includes('Cannot GET')){
        //   this.router.navigate(['/not-found']);
        // }

        /** Processing print from text print
         * '\t' = tabulation
         * '\r\n' espace on Windows
         */
        let lines = data.split('\r\n');

        let iA = 0;
        let iL = 0;

        let isFirstTime = true;
        let newArray = false;

        for (let phrase of lines){
          let res = phrase.split('\t');
          this.descriptionFile = res[0];
          this.cmdFile = res[1];

          /** very first array */
          if (isFirstTime){
            this.commands = [
              [{
                description: this.descriptionFile,
                command: this.cmdFile,
                statusDescription: VISIBLE,
                statusCommand: VISIBLE,
                iArray: iA,
                iLine: iL,
                colorArray: this.color
              }]
            ]
            isFirstTime = false;
            continue; // avoiding to repeat first line twice
          }

          /** new array */
          if (this.descriptionFile.startsWith('###')){
            let title = this.descriptionFile.split('###')[1];
            newArray = true;
            continue; // to retrieve data from next line
          }
          if (newArray){
            // update color of following arrays
            this.color = this.colorAugmented();

            this.commands.push(
              [{
                description: this.descriptionFile,
                command: this.cmdFile,
                statusDescription: VISIBLE,
                statusCommand: VISIBLE,
                iArray: iA,
                iLine: iL,
                colorArray: this.color
              }]
            );
            newArray = false;
          }
          /** new line */
          else{
            this.commands[this.commands.length-1].push({
              description: this.descriptionFile,
              command: this.cmdFile,
              statusDescription: VISIBLE,
              statusCommand: VISIBLE,
              iArray: iA,
              iLine: iL
            })
          }
        }

        /** because last line is always empty */
        this.commands[this.commands.length-1].pop();
      });
  }

  // startOverArr(){
  //   this.commands = [
  //     {
  //       description: '',
  //       command: '',
  //       statusDescription: '',
  //       statusCommand: '',
  //     }
  //   ]
  // }


}
