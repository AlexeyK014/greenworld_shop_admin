/* eslint-disable no-unused-vars */
import { ImageField, ImageInput, required, SelectInput, TabbedForm, TextInput } from 'react-admin'
import { IBaseFormProps } from '../../../types/goods'
import { allowedImageExtensions } from '../../../utils/validation'
import '../index.css'
import { NEWS_TYPES } from '../../../constants/goodsTypes'

export const NewsForm = ({ handleSelectType, maxImagesCount, type }: IBaseFormProps) => {
  return (
    <TabbedForm>
      <TabbedForm.Tab label='Основная информация'>
        <div className='block'>
          <SelectInput
            className='block__select'
            choices={NEWS_TYPES}
            source='type'
            validate={[required()]}
            onChange={handleSelectType}
            optionValue='name'
          />
          <TextInput
            className='block__select'
            source='title'
            validate={[required()]}
            resettable
            label='Название'
          />
          <TextInput
            source='text'
            validate={[required()]}
            multiline
            resettable
          />
        </div>
        <div>
          <ImageInput
            maxSize={3000000}
            label='Картинки для статьи'
            source='images'
            validate={[allowedImageExtensions(), maxImagesCount(), required()]}
            multiple
          >
            <>
              <ImageField source='url' title='desc' />
              <ImageField source='src' title='title' />
            </>
          </ImageInput>
        </div>
      </TabbedForm.Tab>
    </TabbedForm>
  )
}
