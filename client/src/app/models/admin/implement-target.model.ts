export class ImplementTarget {
  public districtCode: number;
  public implementID: number;
  public financialYear: string;
  public normal: number;
  public scp: number;
  public tasp: number;
  public dateTime: string;
  public ipAddress: string;
  public userID: string;

  constructor(districtCode: number, implementID: number, financialYear: string, normal: number, scp: number, tasp: number, dateTime: string, ipAddress: string, userID: string) {
    this.districtCode = districtCode;
    this.implementID = implementID;
    this.financialYear = financialYear;
    this.normal = normal;
    this.scp = scp;
    this.tasp = tasp;
    this.dateTime = dateTime;
    this.ipAddress = ipAddress;
    this.userID = userID;
  }
}