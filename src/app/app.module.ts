import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';

import { CustomDatePipe } from './shared/custom-date.pipe';
import { ServerTimestampPipe } from './shared/server-timestamp.pipe';

import { HeaderComponent } from './shared/header/header.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';

import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';

import { ClientesComponent } from './pages/clientes/clientes.component';
import { NewClienteDialogComponent } from './pages/clientes/new-cliente-dialog/new-cliente-dialog.component';
import { ClienteDetailComponent } from './pages/clientes/cliente-detail/cliente-detail.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { NewPedidoDialogComponent } from './pages/pedidos/new-pedido-dialog/new-pedido-dialog.component';
import { EditPedidoDialogComponent } from './pages/pedidos/edit-pedido-dialog/edit-pedido-dialog.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { CompraDialogComponent } from './pages/home/compra-dialog/compra-dialog.component';
import { HistoricoComprasDialogComponent } from './pages/home/historico-compras-dialog/historico-compras-dialog.component';

registerLocaleData(localePt);

const matModules = [
  MatNativeDateModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatOptionModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatTableModule,
  MatToolbarModule,
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    ClientesComponent,
    PedidosComponent,
    AuthComponent,
    ProdutosComponent,
    ServerTimestampPipe,
    NewClienteDialogComponent,
    ClienteDetailComponent,
    NewPedidoDialogComponent,
    CustomDatePipe,
    EditPedidoDialogComponent,
    CompraDialogComponent,
    HistoricoComprasDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireStorageModule,
    ...matModules,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
