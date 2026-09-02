import { NextRequest, NextResponse } from 'next/server';

const mockData: Record<string, any> = {
  coordinates: {
    location: 'Manhattan, New York City, NY, USA',
    address: '123 Main Street, New York, NY 10001',
    nearby: ['Empire State Building', 'Madison Square Garden', 'Flatiron Building'],
    latitude: 40.7128,
    longitude: -74.006,
    additional: {
      population: '8.3M',
      timezone: 'EST',
      weather: 'Partly Cloudy, 72°F',
      businesses: '5,234 nearby',
    },
  },
  phone: {
    phone: '+1-555-123-4567',
    details: {
      country: 'United States',
      provider: 'Verizon Communications',
      valid: true,
      type: 'Mobile',
      carrier: 'Verizon',
      location: 'New York, NY',
    },
    additional: {
      'breach_check': 'No breaches found',
      'social_media': '2 accounts linked',
      'registration': '2018-03-15',
    },
  },
  address: {
    address: '123 Main Street, New York, NY 10001',
    details: {
      coordinates: '40.7128°N, 74.0060°W',
      type: 'Residential / Commercial',
      residents: '8-12 people',
      zipcode: '10001',
      county: 'New York County',
    },
    additional: {
      'police_records': '0 incidents',
      'property_value': '$2.4M',
      'built_year': '1985',
    },
  },
  vehicle: {
    plate: 'ABC-1234',
    details: {
      model: 'Toyota Camry 2020',
      year: 2020,
      color: 'Silver',
      owner: 'John Doe',
      region: 'New York',
      vin: '4T1BF1AK5CU123456',
    },
    additional: {
      'registration': 'Active',
      'insurance': 'State Farm',
      'violations': '0',
      'last_inspection': '2024-01-15',
    },
  },
  person: {
    name: 'John Doe',
    details: {
      email: 'john.doe@example.com',
      phone: '+1-555-123-4567',
      location: 'New York, NY',
      age_range: '30-40',
      profiles: ['LinkedIn', 'Facebook', 'Twitter'],
    },
    additional: {
      'occupation': 'Software Engineer',
      'education': 'Computer Science - University of NY',
      'social_accounts': '5 profiles found',
      'breach_records': '1 breach detected',
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, query } = body;

    if (!type || !query) {
      return NextResponse.json(
        { error: 'Missing type or query parameter' },
        { status: 400 }
      );
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Return mock data
    const data = mockData[type];
    if (!data) {
      return NextResponse.json(
        { error: 'Invalid search type' },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
