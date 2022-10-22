
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


export interface InputValues {
  unitsMetric: string,
  unitsImperial: string,
  propDiaMetric: number,
  propDiaImperial: number,
  battVoltage: number,
  motorVoltage: number,
  airspeedKnots: number,
  airspeedKph: number,
  altitude: number
}