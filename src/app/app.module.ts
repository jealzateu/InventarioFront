import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InventarioComponent } from './inventario/inventario.component';
import { RegistroModalComponent } from './inventario/registro-modal/registro-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    InventarioComponent,
    RegistroModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot([
      { path: 'inventario', component: InventarioComponent },
      { path: '**', redirectTo: 'inventario', pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
