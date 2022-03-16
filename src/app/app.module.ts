import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyService } from './Services/Company/company.service';
import { TypeService } from './Services/Type/type.service';
import { TypeComponent } from './components/Type/type.component';
import { UnitService } from './Services/Unit/unit.service';
import { ClientService } from './Services/Client/client.service';
import { ItemProcessComponent } from './components/item-process/item-process.component';
import { InvoiceService } from './Services/invoice/invoice.service';
import { FilterByCompanyPipe } from './pipes/filter-by-company.pipe';




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
    UnitsComponent,
    TypeComponent,
    ItemProcessComponent,
    FilterByCompanyPipe


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CompanyService,
    TypeService,
    UnitService,
    ClientService,
    InvoiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
