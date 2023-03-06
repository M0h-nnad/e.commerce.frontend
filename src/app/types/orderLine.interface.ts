export interface OrderItem {
  _id: string;
  item: {
    _id: string;
    name: string;
    offer: number;
    price: number;
  };
  variant: {
    _id: string;
    color: string;
    src: string;
  };
  size: {
    _id: string;
    number: number;
    size: string;
  };
  orderId: string;
  quantity: number;
}
