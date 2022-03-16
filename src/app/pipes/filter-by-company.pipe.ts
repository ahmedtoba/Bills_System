import { Pipe, PipeTransform } from '@angular/core';
import { CompanyType } from '../models/company-type.model';

@Pipe({
  name: 'filterByCompany'
})
export class FilterByCompanyPipe implements PipeTransform {

  transform(companyTypes: CompanyType[], companyId: number) : CompanyType[] {
    const types: CompanyType[] = []
    for (let cType of companyTypes) {
      if (cType.companyId == companyId)
        types.push(cType)
    }
    return types;
  }
}
