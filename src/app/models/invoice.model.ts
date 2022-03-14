export class Invoice {
  /**
   *
   */
  constructor(
    public Id : number,
    public Date : Date,
    public Quantity : number,
    public Total : number,
    public ClientId : number,
    public ItemId : number,
  ) {}
}
