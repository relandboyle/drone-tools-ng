import { HandlerEvent, HandlerResponse } from '@netlify/functions';
import { environment } from 'src/environments/environment';
import fetch from 'node-fetch';


export async function handler (event: HandlerEvent) {

  const key = environment.weatherKey;
  const { location }: any = event.queryStringParameters;
  const requestUrl = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&aqi=no`;
  console.log(requestUrl)
  try {
    const response: HandlerResponse = await fetch(requestUrl)
    .then(res => {
      return res.json();
    })
    .then(data => {
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      }
    });
    return response;
  }

  catch (err: any) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }

}
