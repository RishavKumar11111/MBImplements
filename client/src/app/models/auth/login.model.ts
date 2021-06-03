export class Login {
  public userID: string;
  public passwordHash: string;
  public roleID: string;
  public accessFailedCount: number;
  public isLoggedIn: boolean;
  public status: boolean;
  public dateTime: string;
  public ipAddress: string;
  public financialYear: string;

  constructor(userID: string, passwordHash: string, roleID: string, accessFailedCount: number, isLoggedIn: boolean, status: boolean, dateTime: string, ipAddress: string, financialYear: string) {
    this.userID = userID;
    this.passwordHash = passwordHash;
    this.roleID = roleID;
    this.accessFailedCount = accessFailedCount;
    this.isLoggedIn = isLoggedIn;
    this.status = status;
    this.dateTime = dateTime;
    this.ipAddress = ipAddress;
    this.financialYear = financialYear;
  }
}