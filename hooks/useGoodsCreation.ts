import React, { useState } from 'react'

export const useGoodsCreation = (types: { id: number; name: string }[]) => {
  // когда юзер выбирает другой тип, мы должны показывать хар-ки для каждого типа
//   // делаем динамические значения типов
  const [type, setType] = useState('')

  // обновляем тип
  const handleSelectType = (e: unknown) => {
    const event = e as React.ChangeEvent<HTMLInputElement>

    // здесь получаем конкретный option
    const optionValue = event.target.value
    const currentOption = types.find((type) => type.name === optionValue)

    if (currentOption) {
      setType(currentOption.name)
    }
  }

  const maxImagesCount = () => (images: { rawFile: File }[]) => {
    if (images?.length > 4) {
      return 'Максимальное кол-во картинок 4'
    }
  }

  // проверяем расширение
  return { handleSelectType, maxImagesCount, type, setType }
}
