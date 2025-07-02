/* eslint-disable no-unused-vars */
import { Edit } from 'react-admin'
import { MICROGREEN_SOURCE_NAME } from '../../../constants/sourceNames'
import { useGoodsEdition } from '../../../hooks/useGoodsEdition'
import { NewsForm } from '../NewsForm/NewsForm'
import { EditTopToolbar } from '../../elements/EditTopToolbar/EditTopToolbar'

export const MicrogreenEdit = () => {
  const {
    handleSelectType,
    maxImagesCount,
    type,
    handleClone,
    cloneProductSpiner
  } = useGoodsEdition(MICROGREEN_SOURCE_NAME)

  return (
    <Edit
      actions={
        <EditTopToolbar
          handleClone={handleClone}
          spinner={cloneProductSpiner}
        />}
    >
      <NewsForm
        type={type}
        handleSelectType={handleSelectType}
        maxImagesCount={maxImagesCount}
      />
    </Edit>
  )
}

