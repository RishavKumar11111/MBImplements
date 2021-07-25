export class FarmerBooking {
  public referenceNo: string;
  public farmerID: string;
  public farmerName: string;
  public farmerMobileNo: string;
  public farmerCategory: string;
  public districtCode: number;
  public blockCode: number;
  public gpCode: number;
  public villageCode: number;
  public implementID: number;
  public financialYear: string;
  public dateTime: string;
  public ipAddress: string;
  public status: boolean;

  constructor(referenceNo: string, farmerID: string, farmerName: string, farmerMobileNo: string, farmerCategory: string, districtCode: number, blockCode: number, gpCode: number, villageCode: number, implementID: number, financialYear: string, dateTime: string, ipAddress: string, status: boolean) {
    this.referenceNo = referenceNo;
    this.farmerID = farmerID;
    this.farmerName = farmerName;
    this.farmerMobileNo = farmerMobileNo;
    this.farmerCategory = farmerCategory;
    this.districtCode = districtCode;
    this.blockCode = blockCode;
    this.gpCode = gpCode;
    this.villageCode = villageCode;
    this.implementID = implementID;
    this.financialYear = financialYear;
    this.dateTime = dateTime;
    this.ipAddress = ipAddress;
    this.status = status;
  }
}