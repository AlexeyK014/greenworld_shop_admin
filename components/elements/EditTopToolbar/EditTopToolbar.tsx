import { Button, TopToolbar } from "react-admin";
import { IEditTopToolbarProps } from "../../../types/elements";
import React from 'react'

export const EditTopToolbar = ({
  handleClone,
  spinner,
}: IEditTopToolbarProps) => (
  <TopToolbar>
    <Button
      onClick={handleClone}
      disabled={spinner}
      label={spinner ? 'Копирование...' : 'Копировать товар'}
    />
  </TopToolbar>
)
