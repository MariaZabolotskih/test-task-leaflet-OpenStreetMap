import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './map/map.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpecialIsLatLngDirective } from './special-is-latlng.directive';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SpecialIsLatLngDirective
  ],
  imports: [
    BrowserModule,
    LeafletModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
