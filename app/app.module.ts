import { AuthManagerGuard } from './auth-manager.guard';
import { AuthAdminGuard } from './auth-admin.guard';
import { AuthGuard } from './auth.guard';
import { environment } from './../environments/environment.prod';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WycieczkiComponent } from './wycieczki/wycieczki.component';
import { CartComponent } from './cart/cart.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StarRatingModule } from 'angular-star-rating';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material/core';
import { FiltersComponent } from './filters/filters.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history/history.component';
import { SingleTripComponent } from './single-trip/single-trip.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { Firestore } from '@angular/fire/firestore'
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ManagerViewComponent } from './manager-view/manager-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WycieczkiComponent,
    CartComponent,
    AddTripComponent,
    FiltersComponent,
    HomeComponent,
    CartPageComponent,
    HistoryComponent,
    SingleTripComponent,
    LoginComponent,
    RegisterComponent,
    ManagerViewComponent,
    AdminViewComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserModule,
    AngularFireDatabaseModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    StarRatingModule.forRoot(),
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      {path:'', component: HomeComponent},
      {path:'oferta',component:WycieczkiComponent},
      {path:'oferta/dodaj',component:AddTripComponent, canActivate: [AuthGuard]},
      {path:'oferta/koszyk',component:CartPageComponent, canActivate: [AuthGuard]},
      {path:'historia',component:HistoryComponent, canActivate: [AuthGuard]},
      {path:'oferta/:name',component:SingleTripComponent, canActivate: [AuthGuard]},
      {path:'logowanie',component:LoginComponent},
      {path:'rejestracja',component:RegisterComponent},
      {path:'widok/manager',component:ManagerViewComponent, canActivate: [AuthManagerGuard]},
      {path:'widok/admin',component:AdminViewComponent, canActivate: [AuthAdminGuard]}
    ]),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
