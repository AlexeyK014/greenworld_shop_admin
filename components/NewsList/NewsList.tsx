/* eslint-disable no-unused-vars */
import { Datagrid, List, TextField, NumberField, Identifier, RaRecord } from 'react-admin'
import React from 'react'

export const NewsList = () => {
  const handleRowClick = (
    id: Identifier,
    resource: string,
    record: RaRecord
  ) => {
    // сетим категорию товара под ключом show
    localStorage.setItem('show', JSON.stringify(record.category))

    return 'show'
  }

  return (
    <List>
      <Datagrid rowClick={handleRowClick}>
        <TextField source="id"/>
        <TextField source="title"/>
      </Datagrid>
    </List>
  )
}
