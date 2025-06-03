/* eslint-disable no-unused-vars */
import { Create } from 'react-admin'
import { MICROGREEN_TYPES } from '../../../constants/goodsTypes'
import { useGoodsCreation } from '../../../hooks/useGoodsCreation'
import { MicrogreenForm } from '../MicrogreenForm/MicrogreenFrom'

export const MicrogreenCreate = () => {
  const { handleSelectType, maxImagesCount, type } =
    useGoodsCreation(MICROGREEN_TYPES)

  return (
    <Create>
      <MicrogreenForm
        type={type}
        handleSelectType={handleSelectType}
        maxImagesCount={maxImagesCount}
      />
    </Create>
  )
}
