export const config = {
  apiUrl: 'https://jsonplaceholder.typicode.com',
  endpoints: {
    posts: {
      path: 'posts',
      methods: ['GET', 'GET_id'],
    },
    users: {
      path: 'users',
      methods: ['GET', 'GET_id'],
    },
  },
}
