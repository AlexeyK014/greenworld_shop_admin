/* eslint-disable no-unused-vars */
import { NumberInput, required, SelectInput, TextInput } from 'react-admin'
import { GOODS_SHELF_LIFE, MICROGREEN_NUTRITIONAL_VALUE, MICROGREEN_TASTE } from '../../../constants/goodsCharacteristics'

export const MicrogreenCharacteristics = () => (
  <>
    <div className='block'>
      <TextInput
        source='taste'
        validate={[required()]}
        multiline
        resettable
        label='Вкус'
      />
      <TextInput
        source='nutritionalValue'
        validate={[required()]}
        multiline
        resettable
        label='Полезные свойства'
      />
      <NumberInput
        min={0}
        className='block__select'
        source='expirationDate'
        validate={[required()]}
        label='Срок годности'
      />
    </div>
  </>
)
