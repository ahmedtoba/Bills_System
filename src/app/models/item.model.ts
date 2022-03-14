export class Item {
  /**
   *
   */
  constructor(
    public Id : number,
    public Name : string,
    public Notes : string,
    public SellingPrice : number,
    public BuyingPrice : number,
    public InitialQuantity : number,
    public RemainingQuantity : number,
    public CompanyId : number,
    public TypeId : number,
    public UnitId : number,
  ) {}
}
