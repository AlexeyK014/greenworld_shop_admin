/* eslint-disable no-unused-vars */
import { Create } from 'react-admin'
import { MICROGREEN_TYPES, NEWS_TYPES } from '../../../constants/goodsTypes'
import { useGoodsCreation } from '../../../hooks/useGoodsCreation'
import { NewsForm } from '../NewsForm/NewsForm'

export const NewsCreate = () => {
  const { handleSelectType, maxImagesCount, type } =
    useGoodsCreation(NEWS_TYPES)

  return (
    <Create>
      <NewsForm
        type={type}
        handleSelectType={handleSelectType}
        maxImagesCount={maxImagesCount}
      />
    </Create>
  )
}
