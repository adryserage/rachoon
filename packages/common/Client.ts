export interface ClientData {
  info: {
    vat: string;
    addition: string;
  };
  address: {
    street: string;
    zip: string;
    city: string;
    country: string;
  };
  contactPerson: {
    fullName: string;
    email: string;
  };
  conditions: {
    earlyPayment: {
      discount: number;
      days: number;
    };
    invoiceDueDays: number;
    rate: number;
    discount: {
      value: number;
      valueType: string;
    };
  };
}

export type ClientType = {
  id: string;
  name: string;
  number: string;
  createdAt: Date;
  updatedAt: Date;
  data: ClientData;
  totalInvoices: number;
  pendingInvoices: number;
  totalOffers: number;
  pendingOffers: number;
};
