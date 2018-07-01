export class UserSingle {


  private static userSingle = null;

  private isAnonymous: boolean;
  private isSignedIn: boolean;
  private uid: string;

  constructor() {
  }

  getInstance() {

    if (UserSingle.userSingle == null) {
      UserSingle.userSingle = new UserSingle();
      return UserSingle.userSingle;
    } else {
      return UserSingle.userSingle;
    }
  }
  setIsAnonymous(val: boolean) {
    UserSingle.userSingle.isAnonymous = val;
  }
  setSigned(val: boolean) {
    UserSingle.userSingle.isSignedIn = val;
  }
  setUid(val: string) {
    UserSingle.userSingle.uid = val;
  }
}
