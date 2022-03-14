import { Company } from "./company.model";

export class CompanyType {
  /**
   *
   */
  constructor(
    public id: number,
    public notes: string,
    public companyId: number,
    public typeId: number,
  ) {

  }
}
