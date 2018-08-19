import {Constants} from './Constants';
import {BigNumber} from 'bignumber.js';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

export class Util {
  static getTicketBreakdown(ticketFee: number): any {
    const map = {};
    const serviceFee = new BigNumber(Constants.CAMPUSBASH_SERVICE_FEE + Constants.STRIPE_SERVICE_FEE);
    let paymentFee = new BigNumber((Constants.CAMPUSBASH_TICKET_CUT + Constants.STRIPE_TICKET_CUT) / 100);
    let totalFee = serviceFee.plus(ticketFee);
    totalFee = totalFee.dividedBy(1 - paymentFee.toNumber());
    paymentFee = paymentFee.times(totalFee);
    const campusbashFee = new BigNumber(Constants.CAMPUSBASH_SERVICE_FEE +
      Constants.CAMPUSBASH_TICKET_CUT * totalFee.dividedBy(100).toNumber());
    map[Constants.CAMPUSBASH_FEE] = campusbashFee.decimalPlaces(2).toNumber();
    map[Constants.SERVICE_FEE] = serviceFee.decimalPlaces(2).toNumber();
    map[Constants.PAYMENT_FEE] = paymentFee.decimalPlaces(2).toNumber();
    map[Constants.TICKET_FEE] = ticketFee;
    map[Constants.TOTAL_FEE] = totalFee.decimalPlaces(2).toNumber();
    return map;
  }
  static openSnackbar(message: string, snackBar: MatSnackBar) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 2000;
    snackBar.open(message, undefined, config);
  }
  static getDate(dateM: number) {
    const date = new Date(dateM);
    const dateArray = date.toString().split(' ');
    // dateArray[1] + ' ' + dateArray[2];
    const date2 = dateArray[0] + ' ' + dateArray[1] + ' ' + dateArray[2];
    return date2;
  }
}
