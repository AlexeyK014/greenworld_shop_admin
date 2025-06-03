/* eslint-disable no-unused-vars */
import { required, SelectInput } from 'react-admin'
import { GOODS_SHELF_LIFE, SEEDS_DURATION_OF_GROWTH, SEEDS_NUTRITIONAL_VALUE, SEEDS_WEIGHT,  } from '../../../constants/goodsCharacteristics'

export const SeedsCharacteristics = () => (
  <>
    <div className='block'>
      <SelectInput
        className='block__select'
        choices={SEEDS_NUTRITIONAL_VALUE}
        source='Полезные свойства'
        validate={[required()]}
        defaultValue={SEEDS_NUTRITIONAL_VALUE[0].name}
        optionValue='name'
      />
      <SelectInput
        className='block__select'
        choices={SEEDS_WEIGHT}
        source='Вес'
        validate={[required()]}
        defaultValue={SEEDS_WEIGHT[0].name}
        optionValue='name'
      />
      <SelectInput
        className='block__select'
        choices={SEEDS_DURATION_OF_GROWTH}
        source='Период проростания'
        validate={[required()]}
        defaultValue={SEEDS_DURATION_OF_GROWTH[0].name}
        optionValue='name'
      />
    </div>
  </>
)
