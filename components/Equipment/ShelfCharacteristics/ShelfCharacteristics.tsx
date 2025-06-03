/* eslint-disable no-unused-vars */
import { NumberInput, required, SelectInput } from 'react-admin'
import { EQUIPMENT_MATERIAL_SHELF } from '../../../constants/goodsCharacteristics'

export const ShelfCharacteristics = () => (
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
      <NumberInput
        min={0}
        className='block__select'
        source='shelves'
        validate={[required()]}
        label='Кол-во полок, шт'
      />
      <SelectInput
        className='block__select'
        choices={EQUIPMENT_MATERIAL_SHELF}
        source='material'
        validate={[required()]}
        defaultValue={EQUIPMENT_MATERIAL_SHELF[0].name}
        optionValue='name'
        label='Материал'
      />
    </div>
  </>
)
