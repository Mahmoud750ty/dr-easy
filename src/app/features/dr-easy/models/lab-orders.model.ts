// lab-orders.model.ts
export interface LabOrder {
  id: number;
  Patient: string;
  order_description: string;
  day: string;
  Delivered: boolean;
  price: number;
  payed: boolean;
}
