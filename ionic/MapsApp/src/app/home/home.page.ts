import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('map') mapRef: ElementRef;

  map: google.maps.Map;
  center = new google.maps.LatLng(-22.498225698094636, -48.55979707116746);
  coordinates: Position;
  private autocomplete = new google.maps.places.AutocompleteService();

  listaEnderecos = [];

  constructor() { }

  initMap(): void {
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: this.center,
      zoom: 15
    });
  }

  ngOnInit(): void {
    this.initMap();
    this.buscarPosicao();
  }

  async buscarPosicao() {
    this.coordinates = await Geolocation.getCurrentPosition();
    this.irParaPosicao();
  }

  irParaPosicao() {
    this.center = new google.maps.LatLng(
      this.coordinates.coords.latitude,
      this.coordinates.coords.longitude
    );

    this.map.setCenter(this.center);
    this.map.setZoom(18);

    // Aqui vai o marcador
    new google.maps.Marker({
      position: this.center,
      map: this.map,
      title: "Hello World!",
      animation: google.maps.Animation.DROP
    });
  }

  buscarEndereco(campoBusca: any) {
    const busca = campoBusca.target.value as string;

    if (!busca.trim().length) {
      this.listaEnderecos = [];
      return false;
    }

    this.autocomplete.getPlacePredictions({ input: busca }, (listaLocais) => {
      console.log(listaLocais);
      this.listaEnderecos = listaLocais;
    });

  }

}
