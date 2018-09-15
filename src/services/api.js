import config from './config';

export const apiFetch = (path, method = 'GET', payload = null) => {
  let body = payload ? JSON.stringify(payload) : null
  return fetch(`${config.url}${path}`, {
    method,
    headers: {
     'Content-Type': 'application/json',
     'Accept': 'application/json'
     // 'Authorization': `Token token=${config.apiKey}`
    },
    body
  })
}

export const apiFormDataFetch = (path, method = 'PUT', payload = null) => {
  let body = payload; 
  return fetch(`${config.url}${path}`, {
    method,
    body
  })
}
