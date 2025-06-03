import { AuthProvider, HttpError } from 'react-admin'

import api from '../api/apiInstance'

/**
 * This authProvider is only for test purposes. Don't use it in production.
 */
export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const { data } = await api.post('/users/login', {
      email: username,
      password,
    })

    if (data) {
      if (data.warningMessage) {
        return Promise.reject(new HttpError(data.warningMessage, 401))
      }

      if (data.role !== 'admin') {
        return Promise.reject(new HttpError('Нет допуска!', 403))
      }

      localStorage.setItem(
        'auth',
        JSON.stringify({ ...data, fullName: data.username })
      )

      return Promise.resolve()
    }

    return Promise.reject(new HttpError('Unauthorized', 401))
  },
  logout: () => {
    localStorage.removeItem('auth')
    return Promise.resolve()
  },
  checkError: () => Promise.resolve(),
  checkAuth: async () => {
    const authData = JSON.parse(localStorage.getItem('auth') as string)

    if (!authData) {
      return Promise.reject()
    }

    const { data } = await api.get('/users/login-check', {
      headers: { Authorization: `Bearer ${authData.accessToken}` },
    })

    if (data.error) {
      if (data.error.name === 'TokenExpiredError') {
        const { data } = await api.post('/users/refresh', {
          jwt: authData.refreshToken,
        })

        localStorage.setItem('auth', JSON.stringify({ ...authData, ...data }))

        return Promise.resolve()
      }

      return Promise.reject()
    }

    return Promise.resolve()
  },
  getPermissions: () => Promise.resolve(undefined),
  getIdentity: () => {
    const persistedUser = localStorage.getItem('auth')
    const user = persistedUser ? JSON.parse(persistedUser) : null

    return Promise.resolve(user)
  },
}

export default authProvider

// import { AuthProvider, HttpError } from 'react-admin'
// import api from '../api/apiInstance'

// import data from './users.json'

// /**
//  * This authProvider is only for test purposes. Don't use it in production.
//  */
// export const authProvider: AuthProvider = {
//   login: async ({ username, password }) => {

//     // выполняем запрос
//     const { data } = await api.post('/users/login', {
//       email: username,
//       password,
//     })

//     // делаем проверку, может вернуться ошибка
//     if (data) {
//       if (data.warningMessage) {
//         // чтобы показывать алерт с ошибкой нам нужно вернуть Promise из метода
//         return Promise.reject(new HttpError(data.warningMessage, 401))
//       }

//       // проверка если это не админ
//       if (data.role !== 'admin') {
//         // чтобы показывать алерт с ошибкой нам нужно вернуть Promise из метода
//         return Promise.reject(new HttpError('Нет допуска', 403))
//       }

//       // если всё в проядке
//       localStorage.setItem(
//         'auth',
//         JSON.stringify({ ...data, fulName: data.username })
//       )

//       return Promise.resolve() // таким образом react-admin понимает что всё хорошо и выполн метод
//     }

//     // а иначе
//     return Promise.reject(new HttpError('Unauthorized', 401))
//   },
//   logout: () => {
//     localStorage.removeItem('auth')
//     return Promise.resolve()
//   },
//   checkError: () => Promise.resolve(),
//   checkAuth: async () =>{
//     const authData = JSON.parse(localStorage.getItem('auth') as string)

//     if (!authData) {
//       return Promise.reject()
//     }

//     const { data } = await api.get('/users/login-check', {
//       headers: {Authorization: `Bearer ${authData.accessToken}`}
//     })

//     // проверяем что пришло
//     // чтобы не было разлогина, а просто рефрешился токен
//     if (data.error) {
//       if(data.error.name === 'TokenExpiredError') {
//         // делаем рефреш
//         const { data } = await api.post('/users/refresh', {
//           jwt: authData.refreshToken,
//         })

//         localStorage.setItem('auth', (JSON.stringify({...authData, ...data})))

//         return Promise.resolve()
//       }

//       // иначе если будет какая нибудь ошибка
//       return Promise.reject()
//     }

//     return Promise.resolve()
//   },
//   getPermissions: () => Promise.resolve(undefined),
//   getIdentity: () => {
//     const persistedUser = localStorage.getItem('auth')
//     const user = persistedUser ? JSON.parse(persistedUser) : null

//     return Promise.resolve(user)
//   },
// }

// export default authProvider
