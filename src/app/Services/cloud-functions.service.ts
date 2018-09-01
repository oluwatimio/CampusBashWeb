import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CloudFunctionsService {
  functions = firebase.functions();
  constructor() { }
  async isNewStudentId(id: string) {
    try {
      const func = this.functions.httpsCallable('isNewStudentId');
      const result = await func({studentId: id});
      return result.data.isNew;
    } catch (e) {
      console.log(e.message);
    }
    return null;
  }
}
