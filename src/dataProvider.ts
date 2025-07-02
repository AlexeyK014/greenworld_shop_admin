import { stringify } from 'query-string'
import { DataProvider, fetchUtils, HttpError } from 'react-admin'

import api from '../api/apiInstance'
import { SIZES_LIST } from '../constants/goods'
import { NEWS_SOURCE_NAME, USERS_SOURCE_NAME } from '../constants/sourceNames'
import { CLIENT_ERROR_CODE } from '../constants/statusCodes'
import { IUser } from '../types/users'
import {
  getCreatedNews,
  getCreatedUser,
  getImagesFromRawFile,
  getUpdatedUser,
} from '../utils/dataProvider'
import { INews } from '../types/news'

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
    let newImages = null

    if (params.data.images.every((img: IUser['image']) => img.src)) {
      newImages = await getImagesFromRawFile(params.data.images)
    }


    if (resource === 'news') {
      let newImages = null

      // Если картинки приходят в виде raw File, сначала загружаем их на сервер
      if (
        Array.isArray(params.data.images) &&
        params.data.images.length &&
        params.data.images.every((img /** @type {IUser['image']} */) => img.src)
      ) {
        newImages = await getImagesFromRawFile(params.data.images)
      }

      const { data } = await api.post('/admin/add-news', {
        ...params.data,
        _id: params.data.id, // Чтобы backend получил ожидаемое поле _id
        images: newImages || params.data.images,
        type: 'news', // Явно указываем тип, если бэкенд этого требует
      })

      return {
        data: {
          ...data.newItem,
          id: data.newItem._id, // react‑admin ожидает поле id
        },
      }
    }



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
