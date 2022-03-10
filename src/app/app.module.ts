import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccessoriesComponent } from './components/accessories/accessories.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ClientsComponent } from './components/clients/clients.component';
import { CompanyDataComponent } from './components/company-data/company-data.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SalesReportComponent } from './components/sales-report/sales-report.component';
import { SalesComponent } from './components/sales/sales.component';
import { SpeciesComponent } from './components/species/species.component';
import { UnitsComponent } from './components/units/units.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    FooterComponent,
    AccessoriesComponent,
    CategoriesComponent,
    ClientsComponent,
    CompanyDataComponent,
    HomeComponent,
    LoginComponent,
    SalesReportComponent,
    SalesComponent,
    SpeciesComponent,
    UnitsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
