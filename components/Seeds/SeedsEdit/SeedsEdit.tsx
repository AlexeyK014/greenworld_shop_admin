/* eslint-disable no-unused-vars */
import { Edit } from 'react-admin'
import { SEEDS_SOURCE_NAME } from '../../../constants/sourceNames'
import { useGoodsEdition } from '../../../hooks/useGoodsEdition'
import { SeedsForm } from '../SeedsForm/SeedsForm'
import { EditTopToolbar } from '../../elements/EditTopToolbar/EditTopToolbar'

export const SeedsEdit = () => {
  const {
    handleSelectType,
    maxImagesCount,
    type,
    handleClone,
    cloneProductSpiner
  } = useGoodsEdition(SEEDS_SOURCE_NAME)

  return (
    <Edit
      actions={
        <EditTopToolbar
          handleClone={handleClone}
          spinner={cloneProductSpiner}
        />}
    >
      <SeedsForm
        type={type}
        handleSelectType={handleSelectType}
        maxImagesCount={maxImagesCount}
      />
    </Edit>
  )
}

