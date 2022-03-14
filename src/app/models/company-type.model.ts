import { Company } from "./company.model";

export class CompanyType {
  /**
   *
   */
  constructor(
    public Id: number,
    public Notes: string,
    public CompanyId: number,
    public TypeId: number,
  ) {

  }
}
