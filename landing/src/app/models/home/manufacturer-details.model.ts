export class ManufacturerDetails {
  public manufacturerEmailID: string;
  public manufacturerName: string;
  public manufacturerMobileNo: string;
  public manufacturerAadhaarNo: string;
  public districtCode: number;
  public blockCode: number;
  public manufacturerAddress: string;
  public farmName: string;
  public uniqueFarmID: string;
  public gstinNo: string;
  public panNo: string;
  public dicMSMERegistrationCertificate: string;
  public udyogAadhaar: string;
  public bsiRegistrationCertificate: string;
  public oaicOSICOFMRDCRegistrationConsent: string;
  public manufacturingUnitPhoto: string;
  public financialYear: string;
  public dateTime: string;
  public ipAddress: string;
  public status: boolean;
  public rejectionReason: string;

  constructor(manufacturerEmailID: string, manufacturerName: string, manufacturerMobileNo: string, manufacturerAadhaarNo: string, districtCode: number, blockCode: number, manufacturerAddress: string, farmName: string, uniqueFarmID: string, gstinNo: string, panNo: string, dicMSMERegistrationCertificate: string, udyogAadhaar: string, bsiRegistrationCertificate: string, oaicOSICOFMRDCRegistrationConsent: string, manufacturingUnitPhoto: string, financialYear: string, dateTime: string, ipAddress: string, status: boolean, rejectionReason: string) {
    this.manufacturerEmailID = manufacturerEmailID;
    this.manufacturerName = manufacturerName;
    this.manufacturerMobileNo = manufacturerMobileNo;
    this.manufacturerAadhaarNo = manufacturerAadhaarNo;
    this.districtCode = districtCode;
    this.blockCode = blockCode;
    this.manufacturerAddress = manufacturerAddress;
    this.farmName = farmName;
    this.uniqueFarmID = uniqueFarmID;
    this.gstinNo = gstinNo;
    this.panNo = panNo;
    this.dicMSMERegistrationCertificate = dicMSMERegistrationCertificate;
    this.udyogAadhaar = udyogAadhaar;
    this.bsiRegistrationCertificate = bsiRegistrationCertificate;
    this.oaicOSICOFMRDCRegistrationConsent = oaicOSICOFMRDCRegistrationConsent;
    this.manufacturingUnitPhoto = manufacturingUnitPhoto
    this.financialYear = financialYear;
    this.dateTime = dateTime;
    this.ipAddress = ipAddress;
    this.status = status;
    this.rejectionReason = rejectionReason;
  }
}