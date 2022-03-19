import { Client } from "./client.model";

export class TotalBill {
  constructor(
    public id: number,
    public total: number,
    public paid: number,
    public valueDiscount: number,
    public percentageDiscount: number,
    public net: number,
    public date: Date,
    public clientId: number,
    public client?: Client
  ){}
}
