/* eslint-disable no-unused-vars */
import { Create } from 'react-admin'
import { EQUIPMENTS_TYPES } from '../../../constants/goodsTypes'
import { useGoodsCreation } from '../../../hooks/useGoodsCreation'
import React from 'react'
import { EquipmentForm } from '../EquipmentForm/EquipmentForm'

export const EquipmentCreate = () => {
  const { handleSelectType, maxImagesCount, type } =
    useGoodsCreation(EQUIPMENTS_TYPES)

  return (
    <Create>
      <EquipmentForm
        type={type}
        handleSelectType={handleSelectType}
        maxImagesCount={maxImagesCount}
      />
    </Create>
  )
}
