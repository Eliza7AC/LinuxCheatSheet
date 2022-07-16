import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import {Router, RouterModule, Routes} from "@angular/router";
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileComponent } from './print/print.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { ArrayComponent } from './array/array.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'print/:cat/:subCat', component: FileComponent, runGuardsAndResolvers: 'always' },
  { path: 'not-found', component: FourOhFourComponent},
  { path: '**', redirectTo: '/not-found' }
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FileComponent,
    FourOhFourComponent,
    ArrayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // RouterModule.forRoot(appRoutes),
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
    NgbModule,
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
