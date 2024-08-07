import {Component, OnInit, ViewChild} from '@angular/core';
import {Event} from '../event-view/event/Event';
import {equal} from 'deep-equal';
import {AuthService} from '../Services/auth.service';
import {isNullOrUndefined} from 'util';
import {Util} from '../Util';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../Services/event.service';
import {MatSnackBar} from '@angular/material';

declare var google: any;

@Component({
  selector: 'app-eventdetail',
  templateUrl: './eventdetail.component.html',
  styleUrls: ['./eventdetail.component.css']
})
export class EventdetailComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  eventClicked: Event;
  address: string;
  user: any = null;
  eventId: string;
  constructor(private eventsService: EventService, private auth: AuthService, private router: Router, private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('eventId') as string;
    this.eventsService.getEvent(this.eventId).subscribe(event => {
      if (!Event.equalToForView(this.eventClicked, event)) {
        this.eventClicked = event;
        this.setMap();
        this.getAddress(this.eventClicked.placeId);
      }
    });
    this.auth.user.subscribe((user) => {
      this.user = user;
    });
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
    geocoder.geocode({'placeId': placeID}, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
          this.eventClicked.address = this.address;
          this.eventsService.addEventToTable(this.eventClicked);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
  buyTicket() {
    if (isNullOrUndefined(this.user))
    {
      this.router.navigateByUrl('/signin');
    } else if (this.eventClicked.tickets.length === 0) {
      Util.openSnackbar('There are no tickets available', this.snackBar);
    } else {
      this.router.navigateByUrl(`/buyTicket/${this.eventClicked.eventId}`);
    }
  }
  scan() {
    this.router.navigateByUrl(`/scan/${this.eventClicked.eventId}`);
  }

}
