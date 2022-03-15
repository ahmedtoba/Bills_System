export class Item {
  /**
   *
   */
  constructor(
    public id : number,
    public name : string,
    public notes : string,
    public sellingPrice : number,
    public buyingPrice : number,
    public initialQuantity : number,
    public remainingQuantity : number,
    public companyId : number,
    public typeId : number,
    public unitId : number,
  ) {}
}
