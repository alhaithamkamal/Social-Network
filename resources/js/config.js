/*
    Defines the API route we are using.
*/
var api_url = '';

switch( process.env.NODE_ENV ){
  case 'development':
    api_url = 'http://127.0.0.1:8000/api/v1';
  break;
  case 'production':
    api_url = '/api/v1';
  break;
}

export const APP_CONFIG = {
  API_URL: api_url,
}