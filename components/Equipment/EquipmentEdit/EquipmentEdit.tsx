/* eslint-disable no-unused-vars */
import { Edit } from 'react-admin'
import { EQUIPMENTS_SOURCE_NAME } from '../../../constants/sourceNames'
import { useGoodsEdition } from '../../../hooks/useGoodsEdition'
import { EditTopToolbar } from '../../elements/EditTopToolbar/EditTopToolbar'
import { EquipmentForm } from '../EquipmentForm/EquipmentForm'

export const EquipmentEdit = () => {
  const {
    handleSelectType,
    maxImagesCount,
    type,
    handleClone,
    cloneProductSpiner
  } = useGoodsEdition(EQUIPMENTS_SOURCE_NAME)

  return (
    <Edit
      actions={
        <EditTopToolbar
          handleClone={handleClone}
          spinner={cloneProductSpiner}
        />}
    >
      <EquipmentForm
        type={type}
        handleSelectType={handleSelectType}
        maxImagesCount={maxImagesCount}
      />
    </Edit>
  )
}

