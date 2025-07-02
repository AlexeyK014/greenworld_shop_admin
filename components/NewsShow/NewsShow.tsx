// eslint-disable-next-line no-unused-vars
import React from 'react'
import {
  Show,
  SimpleShowLayout,
  ImageField,
  TextField,
  RichTextField,
  DeleteButton,
} from 'react-admin';
import './index.css'
import { EQUIPMENTS_TYPES } from '../../constants/goodsTypes';
import { useGoodsCreation } from '../../hooks/useGoodsCreation';

export const NewsShow = () => {
  // const { type } = useGoodsCreation(EQUIPMENTS_TYPES)

  return (
    <Show>
      <SimpleShowLayout>
        <div className='show-actions'>
          <DeleteButton />
        </div>
        <ImageField source="images" src="url" title="desc" />
        <TextField source="title" />
        <TextField source="text" />
      </SimpleShowLayout>
    </Show>
  )
}
