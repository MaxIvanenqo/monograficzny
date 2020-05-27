import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HistogramComponent } from './histogram/histogram.component';
import { DystrybuantaEmpirycznaComponent } from './dystrybuanta-empiryczna/dystrybuanta-empiryczna.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { from } from 'rxjs';
import { TestDixonaComponent } from './test-dixona/test-dixona.component';
import { TestGrubbsaComponent } from './test-grubbsa/test-grubbsa.component';
import { RegulaTrzechSigmComponent } from './regula-trzech-sigm/regula-trzech-sigm.component';
import { MomentCentralnyZwyklyKwantylComponent } from './moment-centralny-zwykly-kwantyl/moment-centralny-zwykly-kwantyl.component';
import { PearsonComponent } from './pearson/pearson.component';
import { ShapiroWilkaComponent } from './shapiro-wilka/shapiro-wilka.component';
import { KolmogorowComponent } from './kolmogorow/kolmogorow.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HistogramComponent,
    DystrybuantaEmpirycznaComponent,
    NotFoundComponent,
    TestDixonaComponent,
    TestGrubbsaComponent,
    RegulaTrzechSigmComponent,
    MomentCentralnyZwyklyKwantylComponent,
    PearsonComponent,
    ShapiroWilkaComponent,
    KolmogorowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
