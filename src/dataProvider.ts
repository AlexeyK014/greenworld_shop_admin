// import { SIZES_LIST } from './../constants/goods';
// import { getCreatedUser, getImagesFromRawFile, getUpdatedUser } from './../utils/dataProvider';
// import { IUser } from './../types/users';
// import { stringify } from 'query-string'
// import api from '../api/apiInstance'
// import { DataProvider, fetchUtils, HttpError } from 'react-admin'
// import { USERS_SOURCE_NAME } from '../constants/sourceNames'
// import { CLIENT_ERROR_CODE } from '../constants/statusCodes'

// const httpClient = fetchUtils.fetchJson

// export default {
//   getList: async (resource, params) => {
//     const { page, perPage } = params.pagination // значение для пагинации
//     const { field, order } = params.sort // значение для сортировки
//     const query = {
//       //собирается объект и передаётся в строчку url
//       // field будет id или name
//       // order - по возрастанию или убыванию
//       sort: JSON.stringify([field, order]),
//       range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
//       filter: JSON.stringify(params.filter),
//     }
//     const { data } = await api.get(`/admin/${resource}?${stringify(query)}`)
//     console.log(data)

//     return {
//       data: data.items,
//       total: data.count, // для пагинации
//     }
//   },

//   getOne: async (resource, params) => {
//     const { data } = await api.get(
//       `/admin/one?id=${params.id}&category=${resource}`
//     )

//     if (resource === USERS_SOURCE_NAME) {
//       return {
//         data,
//       }
//     }

//     const isNew = data.isNew ? ['new'] : []
//     const isBestseller = data.isBestseller ? ['bestseller'] : []

//     if (data.sizes && Object.values(data.sizes).length) {
//       let sizes: string[] = []

//       Object.entries(data.sizes).forEach(([key, value]) => {
//         if (value) {
//           sizes.push(key)
//         }
//       })

//       return {
//         data: {
//           ...data,
//           sizes,
//           isNew,
//           isBestseller,
//         },
//       }
//     }




//     return {
//       data: {
//         ...data,
//         sizes: [],
//         isNew,
//         isBestseller,
//       },
//     }
//   },




//   getMany: async (resource, params) => {
//     const query = {
//       filter: JSON.stringify({ ids: params.ids }),
//     }
//     const url = `/${resource}?${stringify(query)}`
//     const { json } = await httpClient(url)
//     return { data: json }
//   },

//   getManyReference: async (resource, params) => {
//     const { page, perPage } = params.pagination
//     const { field, order } = params.sort
//     const query = {
//       sort: JSON.stringify([field, order]),
//       range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
//       filter: JSON.stringify({
//         ...params.filter,
//         [params.target]: params.id,
//       }),
//     }
//     const url = `/${resource}?${stringify(query)}`
//     const { json, headers } = await httpClient(url)
//     return {
//       data: json,
//       total: 0,
//     }
//   },

//   create: async (resource, params) => {
//     if (resource === USERS_SOURCE_NAME) {
//       // логика создания юзера
//       const user = await getCreatedUser(params.data as IUser)

//       // обрабатываем ошибки
//       if (user.status === CLIENT_ERROR_CODE) {
//         return Promise.reject(new HttpError(user.message, CLIENT_ERROR_CODE))
//       }
//       return {
//         data: user.newUser,
//       }


//     }

//     // учитываем размеры которые мог выбрать юзер
//     const sizes = {} as { [index: string]: string }

//     // динамическая переменная для картинок
//     let newImages = null

//     // при нажатие на кнопку скопировать, товар будет копироваться и
//     // попадать на страницу создания и туда будут попадать картинки уже с полями url с бэка
//     // поэтому делаем проверку, чтобы все картинки имели поле src, потому что только тогда
//     // это означает что пользователь выбрал картинки именно с компьютера
//     // иначе это уже существующие картинки и их не добавляем
//     if (params.data.images.every((img: IUser['image']) => img.src)) {
//       newImages = await getImagesFromRawFile(params.data.images)
//     }

//     if (params.data.sizes) {
//       // доступен размер или нет
//       SIZES_LIST.forEach(
//         (size) => (sizes[size] = params.data.sizes.includes(size))
//       )
//     }

//     // делаем запрос на бэк
//     const { data } = await api.post('/admin/add-product', {
//       ...params.data,
//       category: resource,
//       _id: params.data.id,
//       sizes,
//       images: newImages || params.data.images,
//       isNew: !!params.data.isNew?.length,
//       isBestseller: !!params.data.isBestseller?.length,
//     })
//     return {
//       data: {
//         ...data.newItem,
//         sizes: params.data.sizes,
//         isNew: params.data.isNew,
//         isBestseller: params.data.isBestseller,
//       }
//     }
//   },

//   update: async (resource, params) => {
//     if (resource === USERS_SOURCE_NAME) {

//       // логика изменения юзера
//       const user = await getUpdatedUser(params.data as IUser)

//       if (user.status === CLIENT_ERROR_CODE) {
//         return Promise.reject(new HttpError(user.message, CLIENT_ERROR_CODE))
//       }

//       return {
//         data: user.updatedUser,
//       }
//     }

//     const sizes = {} as { [index: string]: string }

//     // при редактирование объекты могут быть двух видов
//     // если юзер не изменил картинку - url и desc
//     // если юзер удалили и выбрал новую, тогда - rowFile
//     let newImages: { dataUrl: string, title: string }[] = [] // изначально юзер ничего невыбрал

//     // переменая чтобы достать из всех картинок которые приходят в этот метод-новые и старые кар
//     const rawImages = params.data.images.filter(
//       (img: { rawFile?: File }) => img.rawFile //получаем новые картинки
//     )

//     //получаем старые картинки
//     const oldImages = params.data.images.filter(
//       (img: { url?: string }) => img.url //получаем новые картинки
//     )

//     if (rawImages.length) {
//       newImages = await getImagesFromRawFile(rawImages)
//     }

//     if (params.data.sizes) {
//       if (params.data.sizes) {
//         // доступен размер или нет
//         SIZES_LIST.forEach(
//           (size) => (sizes[size] = params.data.sizes.includes(size))
//         )
//       }
//     }

//     // делаем запрос на бэк
//     const { data } = await api.post('/admin/edit-product', {
//       ...params.data,
//       category: resource,
//       _id: params.data.id,
//       sizes,
//       newImages,
//       oldImages,
//       isNew: !!params.data.isNew?.length,
//       isBestseller: !!params.data.isBestseller?.length,
//     })

//     return {
//       data: {
//         ...data.updatedItem,
//         sizes: params.data.sizes,
//         isNew: params.data.isNew,
//         isBestseller: params.data.isBestseller,
//       }
//     }
//   },

//   updateMany: async (resource, params) => {
//     const query = {
//       filter: JSON.stringify({ id: params.ids }),
//     }
//     const url = `/${resource}?${stringify(query)}`
//     const { json } = await httpClient(url, {
//       method: 'PUT',
//       body: JSON.stringify(params.data),
//     })
//     return { data: json }
//   },

//   delete: async (resource, params) => {
//     console.log(params.previousData)

//     const id = params.previousData && params.previousData.id

//     const { data } = await api.delete(
//       `/admin/delete?id=${id}&category=${resource}`
//     )
//     return { data }
//   },

//   deleteMany: async (resource, params) => {

//     await api.delete(
//       `/admin/delete-many?ids=${JSON.stringify(params.ids)}&category=${resource}`
//     )

//     return {
//       data: [],
//     }
//   },
// } as DataProvider

import { stringify } from 'query-string'
import { DataProvider, fetchUtils, HttpError } from 'react-admin'

import api from '../api/apiInstance'
import { SIZES_LIST } from '../constants/goods'
import { USERS_SOURCE_NAME } from '../constants/sourceNames'
import { CLIENT_ERROR_CODE } from '../constants/statusCodes'
import { IUser } from '../types/users'
import {
  getCreatedUser,
  getImagesFromRawFile,
  getUpdatedUser,
} from '../utils/dataProvider'

const httpClient = fetchUtils.fetchJson

export default {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    }
    const { data } = await api.get(`/admin/${resource}?${stringify(query)}`)
    console.log(data)

    return {
      data: data.items,
      total: data.count,
    }
  },

  getOne: async (resource, params) => {
    const { data } = await api.get(
      `/admin/one?id=${params.id}&category=${resource}`
    )

    if (resource === USERS_SOURCE_NAME) {
      return {
        data,
      }
    }

    const isNew = data.isNew ? ['new'] : []
    const isBestseller = data.isBestseller ? ['bestseller'] : []

    if (data.sizes && Object.values(data.sizes).length) {
      let sizes: string[] = []

      Object.entries(data.sizes).forEach(([key, value]) => {
        if (value) {
          sizes.push(key)
        }
      })

      return {
        data: {
          ...data,
          id: data._id,
          sizes,
          isNew,
          isBestseller,
        },
      }
    }

    return {
      data: {
        ...data,
        id: data._id,
        sizes: [],
        isNew,
        isBestseller,
      },
    }
  },

  getMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ ids: params.ids }),
    }
    const url = `/${resource}?${stringify(query)}`
    const { json } = await httpClient(url)
    return { data: json }
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    }
    const url = `/${resource}?${stringify(query)}`
    const { json } = await httpClient(url)
    return {
      data: json,
      total: 0,
    }
  },

  create: async (resource, params) => {
    if (resource === USERS_SOURCE_NAME) {
      const user = await getCreatedUser(params.data as IUser)

      if (user.status === CLIENT_ERROR_CODE) {
        return Promise.reject(new HttpError(user.message, CLIENT_ERROR_CODE))
      }

      return {
        data: user.newUser,
      }
    }

    // const sizes = {} as { [index: string]: string }
    let newImages = null

    if (params.data.images.every((img: IUser['image']) => img.src)) {
      newImages = await getImagesFromRawFile(params.data.images)
    }

    // if (params.data.sizes) {
    //   SIZES_LIST.forEach(
    //     (size) => (sizes[size] = params.data.sizes.includes(size))
    //   )
    // }

    const { data } = await api.post('/admin/add-product', {
      ...params.data,
      category: resource,
      _id: params.data.id,
      // sizes,
      images: newImages || params.data.images,
      isNew: !!params.data.isNew?.length,
      isBestseller: !!params.data.isBestseller?.length,
    })

    return {
      data: {
        ...data.newItem,
        id: data.newItem._id,
        sizes: params.data.sizes,
        isNew: params.data.isNew,
        isBestseller: params.data.isBestseller,
      },
    }
  },

  update: async (resource, params) => {
    if (resource === USERS_SOURCE_NAME) {
      const user = await getUpdatedUser(params.data as IUser)

      if (user.status === CLIENT_ERROR_CODE) {
        return Promise.reject(new HttpError(user.message, CLIENT_ERROR_CODE))
      }

      return {
        data: user.updatedUser,
      }
    }

    const sizes = {} as { [index: string]: string }
    let newImages: { dataUrl: string; title: string }[] = []

    const rawImages = params.data.images.filter(
      (img: { rawFile?: File }) => img.rawFile
    )
    const oldImages = params.data.images.filter(
      (img: { url?: string }) => img.url
    )

    if (rawImages.length) {
      newImages = await getImagesFromRawFile(rawImages)
    }

    if (params.data.sizes) {
      SIZES_LIST.forEach(
        (size) => (sizes[size] = params.data.sizes.includes(size))
      )
    }

    const { data } = await api.post('/admin/edit-product', {
      ...params.data,
      category: resource,
      _id: params.data.id,
      sizes,
      newImages,
      oldImages,
      isNew: !!params.data.isNew?.length,
      isBestseller: !!params.data.isBestseller?.length,
    })

    return {
      data: {
        ...data.updatedItem,
        id: data.updatedItem._id,
        sizes: params.data.sizes,
        isNew: params.data.isNew,
        isBestseller: params.data.isBestseller,
      },
    }
  },

  updateMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    }
    const url = `/${resource}?${stringify(query)}`
    const { json } = await httpClient(url, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    })
    return { data: json }
  },

  delete: async (resource, params) => {
    const id = params.previousData && params.previousData.id

    const { data } = await api.delete(
      `/admin/delete?id=${id}&category=${resource}`
    )

    return {
      data,
    }
  },

  deleteMany: async (resource, params) => {
    await api.delete(
      `/admin/delete-many?ids=${JSON.stringify(params.ids)}&category=${resource}`
    )

    return {
      data: [],
    }
  },
} as DataProvider








//  getOne: async (resource, params) => {
//     const { data } = await api.get(`/admin/one?id=${params.id}&category=${resource}`)

//     if (resource === USERS_SOURCE_NAME) {
//       return {
//         data,
//       }
//     }

//     const isNew = data.isNew ? ['new'] : []
//     const isBestseller = data.isBestseller ? ['bestseller'] : []

//     if (Object.values(data.sizes).length) {
//       let sizes: string[] = []

//       Object.entries(data.sizes).forEach(([key, value]) => {
//         // если размер есть то нам нужно его конвертнуть в массив
//         if (value) {
//           sizes.push(key)
//         }
//       });
//       return {
//         data: {
//           ...data,
//           sizes,
//           isNew,
//           isBestseller,
//         }
//       }
//     }

//     return {
//       data: {
//         ...data,
//         sizes: [],
//         isNew,
//         isBestseller,
//       }
//     }
//   },
