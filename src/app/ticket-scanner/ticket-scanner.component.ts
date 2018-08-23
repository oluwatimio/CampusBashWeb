import {Component, OnInit, ViewChild} from '@angular/core';
import {ZXingScannerComponent} from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';

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


  constructor() { }

  ngOnInit() {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.cameraFound = true;
      this.camerasFoundHandler(devices);

      // selects the devices's back camera by default
      // for (const device of devices) {
      //     if (/back|rear|environment/gi.test(device.label)) {
      //         this.scanner.changeDevice(device);
      //         this.currentDevice = device;
      //         break;
      //     }
      // }
    });

    this.scanner.camerasNotFound.subscribe(() => this.cameraFound = false);
    this.scanner.scanComplete.subscribe((result: Result) => this.qrResult = result);
    this.scanner.permissionResponse.subscribe((perm: boolean) => {
      this.hasPermission = perm;
      console.log(perm);
    });
  }
  cameraSelected() {
    console.log(this.selectedCamera);
    this.currentDevice = this.scanner.getDeviceById(this.selectedCamera);
    console.log(this.currentDevice);
  }

  scanSuccessHandler(event) {
    console.log(event);
  }

  scanErrorHandler(event) {
    console.log(event);
  }

  scanFailureHandler(event) {
    console.log(event);
  }

  scanCompleteHandler(event) {
    console.log(event);
  }
  camerasFoundHandler(cameraList) {
    console.log(cameraList);
    cameraList.forEach(camera => {
      this.cameras.push({
        id: camera.deviceId,
        name: camera.label
      });
    });
    console.log(this.cameras);
    this.cameraFound = true;
  }

}
