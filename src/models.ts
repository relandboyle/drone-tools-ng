export interface FormInputs {
  airspeedKnots: number,
  airspeedKph: number,
  altitude: number,
  battV: number,
  feetPerSecond: number,
  machNumber: number,
  metersPerSecond: number,
  motorKv: number,
  propDiaIn: number,
  propDiaMm: number,
  units: string
}

export const formInputs: FormInputs = {
  airspeedKnots: 0,
  airspeedKph: 0,
  altitude: 0,
  battV: 0,
  feetPerSecond: 0,
  machNumber: 0,
  metersPerSecond: 0,
  motorKv: 0,
  propDiaIn: 0,
  propDiaMm: 0,
  units: ''
}

export interface WeatherConditions {
  cityZip: string,
  condition: string,
  humidity: number,
  localMach1Mps: number,
  localMach1Fps: number,
  location: string,
  pressure_in: number,
  pressure_mb: number,
  temp_c: number,
  temp_f: number
}

export const weatherConditions: WeatherConditions = {
  cityZip: '',
  condition: '',
  humidity: 0,
  localMach1Mps: 0,
  localMach1Fps: 0,
  location: '',
  pressure_in: 0,
  pressure_mb: 0,
  temp_c: 0,
  temp_f: 0
}