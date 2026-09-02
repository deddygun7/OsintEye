export interface SearchQuery {
  type: 'coordinates' | 'phone' | 'address' | 'vehicle' | 'person';
  query: string;
}

export interface CoordinatesResult {
  location: string;
  address: string;
  nearby: string[];
  latitude: number;
  longitude: number;
  additional?: Record<string, any>;
}

export interface PhoneResult {
  phone: string;
  details: {
    country: string;
    provider: string;
    valid: boolean;
    type: string;
    carrier: string;
    location: string;
  };
  additional?: Record<string, any>;
}

export interface VehicleResult {
  plate: string;
  details: {
    model: string;
    year: number;
    color: string;
    owner?: string;
    region: string;
    vin: string;
  };
  additional?: Record<string, any>;
}

export interface PersonResult {
  name: string;
  details: {
    email: string;
    phone?: string;
    location: string;
    age_range?: string;
    profiles?: string[];
  };
  additional?: Record<string, any>;
}

export interface AddressResult {
  address: string;
  details: {
    coordinates: string;
    type: string;
    residents?: string;
    zipcode?: string;
    county?: string;
  };
  additional?: Record<string, any>;
}

export type SearchResult =
  | CoordinatesResult
  | PhoneResult
  | VehicleResult
  | PersonResult
  | AddressResult;
