export class Creator {
  uid: string;
  name: string;
  stripeAccountId: string;
  imageUrl: string;

  constructor(uid: string, name: string, stripeAccountId: string, imageUrl: string) {
    this.uid = uid;
    this.name = name;
    this.stripeAccountId = stripeAccountId;
    this.imageUrl = imageUrl;
  }
}
