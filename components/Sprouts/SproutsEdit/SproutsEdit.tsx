/* eslint-disable no-unused-vars */
import { Edit } from 'react-admin'
import { SPROUTS_SOURCE_NAME } from '../../../constants/sourceNames'
import { useGoodsEdition } from '../../../hooks/useGoodsEdition'
import { SproutsForm } from '../SproutsForm/SproutsForm'
import { EditTopToolbar } from '../../elements/EditTopToolbar/EditTopToolbar'

export const SproutsEdit = () => {
  const {
    handleSelectType,
    maxImagesCount,
    type,
    handleClone,
    cloneProductSpiner
  } = useGoodsEdition(SPROUTS_SOURCE_NAME)

  return (
    <Edit
      actions={
        <EditTopToolbar
          handleClone={handleClone}
          spinner={cloneProductSpiner}
        />}
    >
      <SproutsForm
        type={type}
        handleSelectType={handleSelectType}
        maxImagesCount={maxImagesCount}
      />
    </Edit>
  )
}

