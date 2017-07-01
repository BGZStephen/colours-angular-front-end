import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { router } from "./app.routes"

// modules
import { AppComponent } from './app.component';
import { SiteModule } from "./site/site.module"
import { DashboardModule } from "./dashboard/dashboard.module"

// guards
import { AuthGuard } from "./guards/auth.guard"

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    router,
    SiteModule,
    DashboardModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
