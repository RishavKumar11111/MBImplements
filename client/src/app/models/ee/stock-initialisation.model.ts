export class StockInitialisation {
  public districtCode: number;
  public implementID: number;
  public stockSerialNo: string;
  public blockCode: number;
  public status: number;
  public financialYear: string;
  public availabilityDateTime: string;
  public initialisationDateTime: string;
  public ipAddress: string;
  public userID: string;

  constructor(districtCode: number, implementID: number, stockSerialNo: string, blockCode: number, status: number, financialYear: string, availabilityDateTime: string, initialisationDateTime: string, ipAddress: string, userID: string) {
    this.districtCode = districtCode;
    this.implementID = implementID;
    this.stockSerialNo = stockSerialNo;
    this.blockCode = blockCode;
    this.status = status;
    this.financialYear = financialYear;
    this.availabilityDateTime = availabilityDateTime;
    this.initialisationDateTime = initialisationDateTime;
    this.ipAddress = ipAddress;
    this.userID = userID;
  }
}