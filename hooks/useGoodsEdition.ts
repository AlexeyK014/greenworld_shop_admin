import { useCallback, useEffect, useState } from 'react'
import { MICROGREEN_TYPES } from '../constants/goodsTypes'
import { useNotify, useGetRecordId, useGetOne, useDataProvider, useRedirect } from 'react-admin'
import { useGoodsCreation } from './useGoodsCreation'

export const useGoodsEdition = (sourceName: string) => {
  const dataProvider = useDataProvider()
  const redirect = useRedirect()
  const { handleSelectType, maxImagesCount, type, setType } =
    useGoodsCreation(MICROGREEN_TYPES)
  const [cloneProductSpiner, setCloneProductSpiner] = useState(false)

  const notify = useNotify()
  const id = useGetRecordId()
  const { data: product } = useGetOne(sourceName, { id })

  // чтобы при редактирование подгружать соответсвующие коллекции
  // на первый рендер сэтим соответсвующий тип
  useEffect(() => {
    if (product) { //когда товар доступен
      setType(product.type) //указываем тип конкретного товара
    }
  }, [])

  const handleClone = useCallback(async () => {
    try {
      setCloneProductSpiner(true)

      // делаем запрос на сервер
      const { data } = await dataProvider.create(sourceName, {
        data: {
          ...product,
          id: undefined, // обнуляем id, чтобы не было повторяющихся id
          name: `${product.name} (Copy)`
        }
      })

      // в случае успеха
      notify('Товар скопирован', { type: 'success' })

      // редирект на сразу скопированый товар
      redirect('edit', sourceName, data.id)
    } catch (error) {
      notify('Ошибка при копирование', { type: 'error' })
    } finally {
      setCloneProductSpiner(false)
    }
  }, [dataProvider, notify, product, redirect, sourceName])

  // проверяем расширение
  return {
    handleSelectType,
    maxImagesCount,
    type,
    handleClone,
    cloneProductSpiner
  }
}
