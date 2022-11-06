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

export interface TipSpeeds {
  feetPerSecond: number,
  metersPerSecond: number,

}

export interface MachValues {
  localMach1: number,
  machNumber: number,
}
