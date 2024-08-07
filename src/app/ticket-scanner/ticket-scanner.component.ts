import {Component, OnInit, ViewChild} from '@angular/core';
import {ZXingScannerComponent} from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';
import {EventDashboardService} from '../Services/event-dashboard.service';
import {isNullOrUndefined} from 'util';
import {TicketMetaData} from '../Classes/TicketMetaData';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ticket-scanner',
  templateUrl: './ticket-scanner.component.html',
  styleUrls: ['./ticket-scanner.component.css']
})
export class TicketScannerComponent implements OnInit {
  @ViewChild('scanner')
  scanner: ZXingScannerComponent;
  cameraFound = false;
  hasPermission = false;
  cameras = [];
  selectedCamera = '';
  currentDevice: MediaDeviceInfo;
  qrResult: Result;
  metadatum: any = {};
  ticketMessage = '';
  emojiPath = '';
  eventId = '';


  constructor(private ticketService: EventDashboardService, private route: ActivatedRoute) {
    this.eventId = this.route.snapshot.paramMap.get('eventId') as string;
    this.ticketService.init(this.eventId);
    this.ticketService.getMetaDatum().subscribe((value => {
      this.metadatum = value;
      console.log(this.metadatum);
    }));
  }

  ngOnInit() {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.cameraFound = true;
      this.camerasFoundHandler(devices);
    });

    this.scanner.camerasNotFound.subscribe(() => this.cameraFound = false);
    this.scanner.scanComplete.subscribe((result: Result) => this.qrResult = result);
    this.scanner.permissionResponse.subscribe((perm: boolean) => {
      this.hasPermission = perm;
    });
  }
  cameraSelected() {
    this.currentDevice = this.scanner.getDeviceById(this.selectedCamera);
  }

  scanSuccessHandler(event) {
    const data: TicketMetaData = this.metadatum[event];
    if (!isNullOrUndefined(data) && !data.isUsed) {
      this.emojiPath = 'assets/smile_emoji.png';
      this.ticketMessage = 'Ticket is valid';
      this.ticketService.updateTicket(this.eventId, data.ticketPurchaseId, true, event);
    } else if (!isNullOrUndefined(data) && data.isUsed) {
      this.emojiPath = 'assets/confused_emoji.png';
      this.ticketMessage = 'Ticket has been used';
    } else {
      this.emojiPath = 'assets/neutral_emoji.png';
      this.ticketMessage = 'Ticket is invalid';
    }
  }

  scanErrorHandler(event) {
  }

  scanFailureHandler(event) {
  }

  scanCompleteHandler(event) {
  }
  camerasFoundHandler(cameraList) {
    cameraList.forEach(camera => {
      this.cameras.push({
        id: camera.deviceId,
        name: camera.label
      });
    });
    this.cameraFound = true;
  }

}
