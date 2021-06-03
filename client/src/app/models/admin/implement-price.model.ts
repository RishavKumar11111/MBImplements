export class ImplementPrice {
  public implementID: number;
  public implementName: string;
  public cost: number;
  public financialYear: string;
  public subsidyPercentage: number;
  public subsidyLimitTo: number;
  public dateTime: string;
  public ipAddress: string;
  public userID: string;

  constructor(implementID: number, implementName: string, cost: number, financialYear: string, subsidyPercentage: number, subsidyLimitTo: number, dateTime: string, ipAddress: string, userID: string) {
    this.implementID = implementID;
    this.implementName = implementName;
    this.cost = cost;
    this.financialYear = financialYear;
    this.subsidyPercentage = subsidyPercentage;
    this.subsidyLimitTo = subsidyLimitTo;
    this.dateTime = dateTime;
    this.ipAddress = ipAddress;
    this.userID = userID;
  }
}