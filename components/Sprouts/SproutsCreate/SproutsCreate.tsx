/* eslint-disable no-unused-vars */
import { Create } from 'react-admin'
import { MICROGREEN_TYPES, SPROUTS_TYPES } from '../../../constants/goodsTypes'
import { useGoodsCreation } from '../../../hooks/useGoodsCreation'
import { SproutsForm } from '../SproutsForm/SproutsForm'
import React from 'react'

export const SproutsCreate = () => {
  const { handleSelectType, maxImagesCount, type } =
    useGoodsCreation(SPROUTS_TYPES)

  return (
    <Create>
      <SproutsForm
        type={type}
        handleSelectType={handleSelectType}
        maxImagesCount={maxImagesCount}
      />
    </Create>
  )
}
