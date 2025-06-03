/* eslint-disable no-unused-vars */
import { required, SelectInput } from 'react-admin'
import { GOODS_SHELF_LIFE, MICROGREEN_NUTRITIONAL_VALUE, MICROGREEN_TASTE, SPROUTS_NUTRITIONAL_VALUE, SPROUTS_VOLUME } from '../../../constants/goodsCharacteristics'

export const SproutsCharacteristics = () => (
  <>
    <div className='block'>
      <SelectInput
        className='block__select'
        choices={SPROUTS_NUTRITIONAL_VALUE}
        source='Полезные свойства'
        validate={[required()]}
        defaultValue={SPROUTS_NUTRITIONAL_VALUE[0].name}
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
      <SelectInput
        className='block__select'
        choices={SPROUTS_VOLUME}
        source='Объём'
        validate={[required()]}
        defaultValue={SPROUTS_VOLUME[0].name}
        optionValue='name'
      />
    </div>
  </>
)
