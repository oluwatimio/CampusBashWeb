import { Component, OnInit, Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import {Event} from '../event-view/event/Event';
import {EventclickedService} from '../Services/eventclicked.service';
import {} from '@types/googlemaps';
import {AuthService} from '../Services/auth.service';
import {isNullOrUndefined} from 'util';
import {Util} from '../Util';
import {Router} from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-eventdetail',
  templateUrl: './eventdetail.component.html',
  styleUrls: ['./eventdetail.component.css']
})
export class EventdetailComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  clicks: EventclickedService;
  eventClicked: Event;
  address: string;
  user: any = null;
  constructor(clicks: EventclickedService, private auth: AuthService, private router: Router) {
    this.clicks = clicks;
  }

  ngOnInit() {
    this.clicks.localStorages.getItem<Event>('event').subscribe((event) => {
      this.eventClicked = event;
      console.log(this.eventClicked.description);
      this.setMap();
      this.getAddress(this.eventClicked.placeId);
    });
    this.auth.user.subscribe((user) => {
      this.user = user;
    });
    //this.eventClicked = event;
  }
  setMap() {
    const map = new google.maps.Map(this.gmapElement.nativeElement, {
      center: {lat: -33.866, lng: 151.196},
      zoom: 15
    });
    const infowindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);

    service.getDetails({
      placeId: this.eventClicked.placeId
    }, function(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
        map.setCenter(marker.getPosition());
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
            'Place ID: ' + place.place_id + '<br>' +
            place.formatted_address + '</div>');
          infowindow.open(map, this);
        });
      }
    });
  }

  getDate(dateM: number) {
    return Util.getDate(dateM);
  }

  getAddress(placeID: string) {
    const geocoder = new google.maps.Geocoder;
    const placeId = placeID;
    geocoder.geocode({'placeId': placeId}, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
          this.eventClicked.address = this.address;
          this.clicks.localStorages.setItem('event', event);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
  buyTicket() {
    if (isNullOrUndefined(this.user)) {
      this.router.navigateByUrl('/signin');
    }
    this.router.navigateByUrl(`/${this.eventClicked.eventId}/buyTicket`);
  }
  scan() {
    this.router.navigateByUrl(`/scan/${this.eventClicked.eventId}`);
  }

}
