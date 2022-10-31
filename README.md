[![Netlify Status](https://api.netlify.com/api/v1/badges/6f6dff66-ad04-4a3f-92e1-de950d63eb5b/deploy-status)](https://app.netlify.com/sites/playful-tapioca-2cb0da/deploys)

# DroneToolsNg

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.7.

## Development server

Run `npm run dev` for to start the Angular app and a Netlify dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.





Units toggle logic

If units is imperial,
  user enters value to propDiameterIn, airspeedKnots
  value is mirrored to propDiameterStore, airspeedStore
  if propDiameterMm is Pristine,
    value is used to derive propDiameterMm, airspeedKph

When units is changed from imperial to metric
  propDiameterMm is displayed
  propDiameterIn is marked Pristine

Consider only updating the value on diameterMm when units is changed
If a value has been entered in diameterIn, then it is dirty
If units toggle, then derive diameterMm from diameterIn
diameterMm is still pristine
if the value in diameterMm is modified, diameterMm is dirty
if units toggle after modifiied diameterMm, then derive diameterIn from diameterMm
else if units toggled and diameterMm is pristine, do not update diameterIn