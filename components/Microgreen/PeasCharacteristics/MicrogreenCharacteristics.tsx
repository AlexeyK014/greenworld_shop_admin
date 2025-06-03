/* eslint-disable no-unused-vars */
import { required, SelectInput } from 'react-admin'
import { GOODS_SHELF_LIFE, MICROGREEN_NUTRITIONAL_VALUE, MICROGREEN_TASTE } from '../../../constants/goodsCharacteristics'

export const MicrogreenCharacteristics = () => (
  <>
    <div className='block'>
      <SelectInput
        className='block__select'
        choices={MICROGREEN_TASTE}
        source='Вкус'
        validate={[required()]}
        defaultValue={MICROGREEN_TASTE[0].name}
        optionValue='name'
      />
      <SelectInput
        className='block__select'
        choices={MICROGREEN_NUTRITIONAL_VALUE}
        source='Полезные свойства'
        validate={[required()]}
        defaultValue={MICROGREEN_NUTRITIONAL_VALUE[0].name}
        optionValue='name'
      />
      <SelectInput
        className='block__select'
        choices={GOODS_SHELF_LIFE}
        source='Срок годности'
        validate={[required()]}
        defaultValue={GOODS_SHELF_LIFE[0].name}
        optionValue='name'
      />
    </div>
  </>
)
