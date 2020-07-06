import { NgModule } from '@angular/core';
// NgBootstrap
import { FormsModule } from '@angular/forms';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HeaderComponent } from './defaults/header/header.component';
import { FooterComponent } from './defaults/footer/footer.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PagesModule } from './pages/pages.module';
import { PagesRoutingModule } from "./pages/pages-routing.module";
import { BaseComponent } from './core/base/base.component';

@NgModule({
  declarations: [
    BaseComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
  ],
  imports: [
    NgbModule,
    PagesRoutingModule,
    PagesModule,
    FormsModule,
  ],
  exports:[
    BaseComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
  ],
  providers: [],
})
export class ThemesModule { }
