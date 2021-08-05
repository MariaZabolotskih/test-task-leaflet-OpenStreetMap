import { Component, Input, AfterViewInit, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import "leaflet";
import "leaflet-routing-machine";
declare let L;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnChanges {

  constructor() { }

  private _map: L.Map;

  private _icon = L.icon({
    iconUrl: '/assets/marker-icon.png',
    iconSize: [20, 20],
 });

  private _routing = L.Routing.control({
    waypoints: [],
    lineOptions:{
      styles: [{color: '#6e338c', opacity: 0.7, weight: 4}],
    },
    draggableWaypoints: false,
    addWaypoints: false,
    createMarker: (i, wp) => {
          return L.marker(wp.latLng, {
          draggable: false,
          icon: this._icon,
          }).bindPopup(this.getTextPointPopup(wp)).openPopup();
    },
  });

  @Input() points;

  private initMap(): void {

   this._map = L.map('map', {
     center: [58.596990, 49.614601],
     zoom: 13
   });

   const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     maxZoom: 18,
     minZoom: 3,
     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
   });

   tiles.addTo(this._map);
   this._routing.addTo(this._map);
   
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(): void {
    this.updatePoints();
  }

  private updatePoints() : void {
    const waypoints = this.points.map(point => {   
      return new L.Routing.Waypoint(L.latLng(point.latitude, point.longitude), point.name);
    });
    this._routing.setWaypoints(waypoints);
  }

  private getTextPointPopup(wp): string{
    return 'Название: ' + wp.name + '<br>Долгота: '  + wp.latLng.lat + '<br>Широта : ' + wp.latLng.lng;
  }
}