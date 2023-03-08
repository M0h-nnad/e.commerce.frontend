export type Transaction = {
  orderId: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    gender: string;
    phone: string;
    email: string;
    enabled: boolean;
    addresses: {
      name: string;
      type: string;
      email?: string;
      isDefault: boolean;
      addressLine1: string;
      country: string;
      city: string;
      postalCode: number;
      state: string;
      phone2?: number;
      createdAt: string;
      updatedAt: string;
      id: string;
    }[];
  };
  productInfo: {
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
    id: string;
  }[];
  paymentInfo: {
    method: string;
    amount: number;
    transactionId: string;
  };
  shippingInfo: {
    method: string;
    cost: number;
  };
  discountInfo: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
};
