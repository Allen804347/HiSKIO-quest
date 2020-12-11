
export function index ($axios, page = '1') {
  return $axios({
    method: 'GET',
    url: `http://private-anon-08f825e2f2-interview10.apiary-mock.com/courses?page=${page}`, // ? page
    headers: {
      Accept: 'application/json',
      'withCredentials': 'true'
    }
  })
}

