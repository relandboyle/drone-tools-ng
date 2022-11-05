export interface WeatherData {
  humidity: number,
  pressure_in: number,
  pressure_mb: number,
  temp_c: number,
  temp_f: number,
  text: string,
  wind_dir: string,
  wind_kph: number,
  wind_mph: number,
  country: string,
  name: string,
  region: string,
}

export interface DisplayValues {
  airspeedKph: number,
  airspeedKnots: number,
  altitude: number,
  battVoltage: number,
  location: string,
  motorVoltage: number,
  propDiameterIn: number,
  propDiameterMm: number,
  units: string,
}

export interface RevolveRates {
  feetPerSecond: number,
  metersPerSecond: number,
}
