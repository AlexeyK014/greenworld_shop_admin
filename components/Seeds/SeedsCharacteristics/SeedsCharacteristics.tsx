/* eslint-disable no-unused-vars */
import { NumberInput, required, SelectInput, TextInput } from 'react-admin'
import { GOODS_SHELF_LIFE, SEEDS_DURATION_OF_GROWTH, SEEDS_NUTRITIONAL_VALUE, SEEDS_WEIGHT, } from '../../../constants/goodsCharacteristics'

export const SeedsCharacteristics = () => (
  <>
    <div className='block'>
      <NumberInput
        min={0}
        className='block__select'
        source='germinationPeriod'
        validate={[required()]}
        label='Период прорастания'
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
      <NumberInput
        min={0}
        className='block__select'
        source='weight'
        validate={[required()]}
        label='Вес'
      />
    </div>
  </>
)
