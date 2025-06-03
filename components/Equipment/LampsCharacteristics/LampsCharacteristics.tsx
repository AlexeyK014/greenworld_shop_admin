/* eslint-disable no-unused-vars */
import { NumberInput, required, SelectInput } from 'react-admin'
import { EQUIPMENT_BOX_COLOR, EQUIPMENT_BOX_SIZE, EQUIPMENT_COLOR_TEMPERATURE_LAMPS, EQUIPMENT_LENGTH_LAMPS, EQUIPMENT_POWER_LAMPS, EQUIPMENT_SPECTRUM_LAMPS } from '../../../constants/goodsCharacteristics'

export const LampsCharacteristics = () => (
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
        choices={EQUIPMENT_POWER_LAMPS}
        source='power'
        validate={[required()]}
        defaultValue={EQUIPMENT_POWER_LAMPS[0].name}
        optionValue='name'
        label='Мощность, вт'
      />
      <SelectInput
        className='block__select'
        choices={EQUIPMENT_SPECTRUM_LAMPS}
        source='spectrum'
        validate={[required()]}
        defaultValue={EQUIPMENT_SPECTRUM_LAMPS[0].name}
        optionValue='name'
        label='Спектр'
      />
      <SelectInput
        className='block__select'
        choices={EQUIPMENT_COLOR_TEMPERATURE_LAMPS}
        source='colortemperature'
        validate={[required()]}
        defaultValue={EQUIPMENT_COLOR_TEMPERATURE_LAMPS[0].name}
        optionValue='name'
        label='Цветовая температура, К'
      />
    </div>
  </>
)
