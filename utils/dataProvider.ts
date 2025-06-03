import api from '../api/apiInstance'
import { IUser } from '../types/users'

export const convertImageToDataUrl = async (src: string, title: string) => {
  const imgBlob = await fetch(src).then((result) => result.blob())
  const dataUrl = await new Promise((resolve) => {
    let reader = new FileReader()

    reader.onload = () => resolve(reader.result)
    reader.readAsDataURL(imgBlob)
  })

  return {
    dataUrl: dataUrl as string,
    title,
  }
}

export const getImagesFromRawFile = (imgs: IUser['image'][]) =>
  Promise.all(
    imgs.map(async (img) => await convertImageToDataUrl(img.src, img.title))
  )

export const getCreatedUser = async (user: IUser) => {
  let image: unknown

  if (user.image) {
    const img = user.image

    image = await convertImageToDataUrl(img.src, img.title)
  }

  const { data } = await api.post('/admin/add-user', {
    ...user,
    image,
  })

  return data
}

export const getUpdatedUser = async (user: IUser) => {
  let image: unknown

  if (user.image.src) {
    const img = user.image

    image = await convertImageToDataUrl(img.src, img.title)
  }

  const { data } = await api.post('/admin/edit-user', {
    ...user,
    image,
  })

  return data
}

// import { IUser } from "../types/users";
// import api from '../api/apiInstance'

// // фун-я конвертирует формат в нужные формат, чтобы сохраняли картинку на бэке
// export const convertImageToDataUrl = async (src: string, title: string) => {

//   // храница формат Blob картинки
//   const imgBlob = await fetch(src).then((result) => result.blob())

//   // картинка в формате dataUrl
//   // исп new Promise - чтобы конвертировать формат в dataUrl
//   const dataUrl = await new Promise((reslove) => {
//     let reader = new FileReader()

//     reader.onload = () => reslove(reader.result)
//     reader.readAsDataURL(imgBlob)
//   })

//   return {
//     dataUrl: dataUrl as string,
//     title,
//   }
// }

// export const getImagesFromRawFile = (imgs: IUser['image'][]) =>
//   Promise.all(
//     imgs.map(async (img) => await convertImageToDataUrl(img.src, img.title))
//   )

// export const getCreatedUser = async (user: IUser) => {
//   // для картинки будет свой собственный хостинг
//   // и отправляем картинку на сервер в формате dataUrl

//   let image: unknown // если юзер не выбрал картинку, то изначально она будет null


//   // если будет картинка выбранная юзером
//   // мы ее конвертим в формат dataUrl
//   if (user.image) { //когда выибрает картинку
//     const img = user.image

//     // конвертируем картинку, которую выбрал юзер со своего локального компьютера
//     image = await convertImageToDataUrl(img.src, img.title)
//   }

//   const { data } = await api.post('/admin/add-user', {
//     ...user,
//     image,
//   })

//   // возвращаем уже созданного юзера
//   return data
// }

// export const getUpdatedUser = async (user: IUser) => {
//   let image: unknown

//   // проверяем картинку на поле src
//   // если есть src-это означает что старую картинку админ убрал и выбрал новую с компьютера
//   if (user.image.src) {
//     const img = user.image

//     image = await convertImageToDataUrl(img.src, img.title)
//   }

//   const { data } = await api.post('/admin/edit-user', {
//     ...user,
//     image,
//   })

//   return data
// }
