export function login ($axios, data) {
  return $axios({
    method: 'POST',
    url: 'http://private-anon-08f825e2f2-interview10.apiary-mock.com/auth/login',
    headers: {
      Accept: 'application/json',
      'withCredentials': 'true'
    },
    data
  })
}

export function me ($axios) {
  return $axios({
    method: 'GET',
    url: 'http://private-anon-08f825e2f2-interview10.apiary-mock.com/me',
    headers: {
      Accept: 'application/json',
      'withCredentials': 'true'
    }
  })
}

