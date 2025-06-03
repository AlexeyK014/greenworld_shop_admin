/* eslint-disable no-unused-vars */
import { NumberInput, required, SelectInput } from 'react-admin'
import { EQUIPMENT_BOX_COLOR } from '../../../constants/goodsCharacteristics'

export const BoxCharacteristics = () => (
  <>
    <div className='block'>
      <NumberInput
        min={0}
        className='block__select'
        source='length'
        validate={[required()]}
        label='Длина, мм'
      />
      <NumberInput
        min={0}
        className='block__select'
        source='height'
        validate={[required()]}
        label='Высота, мм'
      />
      <NumberInput
        min={0}
        className='block__select'
        source='width'
        validate={[required()]}
        label='Ширина, мм'
      />
      <SelectInput
        className='block__select'
        choices={EQUIPMENT_BOX_COLOR}
        source='color'
        validate={[required()]}
        defaultValue={EQUIPMENT_BOX_COLOR[0].name}
        optionValue='name'
        label='Цвет'
      />
    </div>
  </>
)
