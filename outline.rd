components

app
header
display
form


modules

app


services

weather
calculations


lambda functions

fetch-weather


07/04 -
got HttpClient working in weather.service
successfully fetching weather data from public url / hard-coded API key and zip
need to set up environment variables
need to resolve observer subscribe deprecated with error callback
don't push API key to GitHub!
connect form inputs to variables
click handlers for input form
keep hacking at data flow between components
set custom domain to point to Netlify
hook up Netlify Lambda function
repair SCSS styles


10/31 -
got units toggle logic working - subscribe to each input individually, leverage .pristine property
all SCSS styles repaired and updated - pixel-perfect recreation of Drone Tools React
fetching weather works
calculating tip speed works
TODO: weather service to build DisplayValues object (or map) to send to display component
TODO: decide where/when to calculate local mach 1
TODO: update variable references for display component

11/05 - all logic and calculations are working as intended
TODO: display all the values in the DisplayCompnent template
TODO: refactor logic to flatten weather response object before sending to
TODO: implement Doppler for managing environment variables
TODO: deploy via AWS EC2 and/or S3
TODO: connect Google domain dronetools-ng.dev
