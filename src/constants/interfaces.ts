export interface WeatherData {
  altitude: number,
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
  localMach1Fps: number,
  localMach1Mps: number,
}

export interface DisplayValues {
  enterLocation: string | null,
  enterSpecs: string | null,
  localMach1Imperial: string | null,
  localMach1Metric: string | null,
  machNumber: string | null,
  pressureImperial: string | null,
  pressureMetric: string | null,
  tipSpeedImperial: string | null,
  tipSpeedMetric: string | null,
  temperatureImperial: string | null,
  temperatureMetric: string | null
}
