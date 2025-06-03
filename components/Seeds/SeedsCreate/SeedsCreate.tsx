/* eslint-disable no-unused-vars */
import { Create } from 'react-admin'
import { SEEDS_TYPES } from '../../../constants/goodsTypes'
import { useGoodsCreation } from '../../../hooks/useGoodsCreation'
import { SeedsForm } from '../SeedsForm/SeedsForm'
import React from 'react'

export const SeedsCreate = () => {
  const { handleSelectType, maxImagesCount, type } =
    useGoodsCreation(SEEDS_TYPES)

  return (
    <Create>
      <SeedsForm
        type={type}
        handleSelectType={handleSelectType}
        maxImagesCount={maxImagesCount}
      />
    </Create>
  )
}
