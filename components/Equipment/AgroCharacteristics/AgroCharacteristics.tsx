/* eslint-disable no-unused-vars */
import { NumberInput, required, SelectInput } from 'react-admin'

export const AgroCharacteristics = () => (
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
    </div>
  </>
)
