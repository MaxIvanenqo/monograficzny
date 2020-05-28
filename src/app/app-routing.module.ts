import { RozszerzenieZakresuHistogramuComponent } from './rozszerzenie-zakresu-histogramu/rozszerzenie-zakresu-histogramu.component';
import { KolmogorowComponent } from './kolmogorow/kolmogorow.component';
import { ShapiroWilkaComponent } from './shapiro-wilka/shapiro-wilka.component';
import { PearsonComponent } from './pearson/pearson.component';
import { MomentCentralnyZwyklyKwantylComponent } from './moment-centralny-zwykly-kwantyl/moment-centralny-zwykly-kwantyl.component';
import { RegulaTrzechSigmComponent } from './regula-trzech-sigm/regula-trzech-sigm.component';
import { TestGrubbsaComponent } from './test-grubbsa/test-grubbsa.component';
import { TestDixonaComponent } from './test-dixona/test-dixona.component';
import { DystrybuantaEmpirycznaComponent } from './dystrybuanta-empiryczna/dystrybuanta-empiryczna.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HistogramComponent } from './histogram/histogram.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'dystrybuanta_empiryczna', component: DystrybuantaEmpirycznaComponent},
  {path: 'histogram', component: HistogramComponent},
  {path: 'zakres_histogramu', component: RozszerzenieZakresuHistogramuComponent},
  {path: 'test_dixona', component: TestDixonaComponent},
  {path: 'test_grubbsa', component: TestGrubbsaComponent},
  {path: 'regula_3_sigm', component: RegulaTrzechSigmComponent},
  {path: 'moment', component: MomentCentralnyZwyklyKwantylComponent},
  {path: 'pearson', component: PearsonComponent},
  {path: 'shapiro-wilka', component: ShapiroWilkaComponent},
  {path: 'kolmogorow', component: KolmogorowComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
