/* eslint-disable no-unused-vars */
import { Create, PasswordInput, required } from 'react-admin'
import { UsersForm } from '../UsersForm/UsersForm'

export const UsersCreate = () => {
  return (
    <Create>
      <UsersForm passwordComponent={<PasswordInput source='password' validate={[required()]} resettable/>}/>
    </Create>
  )
}
