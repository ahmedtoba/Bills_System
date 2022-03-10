import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { ClientsComponent } from './components/clients/clients.component';
import { CompanyDataComponent } from './components/company-data/company-data.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SalesReportComponent } from './components/sales-report/sales-report.component';
import { SalesComponent } from './components/sales/sales.component';
import { SpeciesComponent } from './components/species/species.component';
import { UnitsComponent } from './components/units/units.component';

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"categories", component: CategoriesComponent},
  {path:"clients", component: ClientsComponent},
  {path:"company-data", component: CompanyDataComponent},
  {path:"login", component: LoginComponent},
  {path:"sales-report", component: SalesReportComponent},
  {path:"sales", component: SalesComponent},
  {path:"species", component: SpeciesComponent},
  {path:"units", component: UnitsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
