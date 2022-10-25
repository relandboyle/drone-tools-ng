export interface WeatherData {
  humidity: number,
  pressure_in: number,
  pressure_mb: number,
  temp_c: number,
  temp_f: number,
  wind_dir: string,
  wind_kph: number,
  wind_mph: number,
  country: string,
  name: string,
  region: string
}

export interface DisplayValues {
  airspeedKph: number,
  airspeedKnots: number,
  altitude: number,
  battVoltage: number,
  motorVoltage: number,
  propDiaImperial: number,
  propDiaMetric: number,
  units: string,
}

export interface RevolveRates {
  feetPerSecond: number,
  metersPerSecond: number,
}
