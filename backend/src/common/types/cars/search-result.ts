import {
  Model,
  Body_Type,
  Brand,
  Prices_Range,
  Complectation,
  Color,
  Option,
  Transmission_Type,
  Drivetrain,
  Fuel_Type,
} from '@prisma/client';

interface SearchResult extends Model {
  body_type: Body_Type;
  brand: Brand;
  prices_ranges: Prices_Range[];
  complectations: ComplectationResult[];
}

interface ComplectationResult extends Complectation {
  color: Color;
  options: Option[];
  transmission_type: Transmission_Type;
  drivetrain: Drivetrain;
  fuel_type: Fuel_Type;
}

export type { SearchResult };
