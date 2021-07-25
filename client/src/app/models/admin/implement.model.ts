export class Implement {
  public implementID: number;
  public implementName: string;
  public cost: number;
  public financialYear: string;
  public subsidyPercentage: number;
  public dateTime: string;
  public ipAddress: string;
  public userID: string;
  public status: boolean;

  constructor(implementID: number, implementName: string, cost: number, financialYear: string, subsidyPercentage: number, dateTime: string, ipAddress: string, userID: string, status: boolean) {
    this.implementID = implementID;
    this.implementName = implementName;
    this.cost = cost;
    this.financialYear = financialYear;
    this.subsidyPercentage = subsidyPercentage;
    this.dateTime = dateTime;
    this.ipAddress = ipAddress;
    this.userID = userID;
    this.status = status;
  }
}