export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type DamageItem = {
  _id: string;
  name: string;
  price: number;
};

export type Report = {
  _id: string;
  user: string;
  reportName: string;
  details: string;
  recommendations: string;
  gate: number;
  plateNumber: number;
  incident: string[];
  damageItems: DamageItem[];
  imageUrl: string;
  lastUpdated: string;
};

export type ReportSearchResponse = {
  data: Report[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};