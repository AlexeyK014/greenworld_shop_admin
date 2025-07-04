/* eslint-disable no-unused-vars */
import { email, ImageField, ImageInput, required, SelectInput, SimpleForm, TextInput } from 'react-admin'
import { allowedImageExtension } from '../../../utils/validation'
import { USERS_ROLES } from '../../../constants/users'

export const UsersForm = ({
  passwordComponent
}: {
  passwordComponent: React.ReactNode
}) => {
  return (
    <SimpleForm>
    <ImageInput
      maxSize={3000000}
      label='Avatar'
      source='image'
      validate={[allowedImageExtension()]}
    >
      <>
        <ImageField source='url' title='desc' />
        <ImageField source='src' title='title' />
      </>
    </ImageInput>
    <SelectInput
      choices={USERS_ROLES}
      source='role'
      validate={[required()]}
      optionValue='name'
      defaultValue={USERS_ROLES[1].name}
    />
    <TextInput source='name' validate={[required()]} resettable />
    <TextInput source='email' validate={[required(), email()]} resettable />
    {passwordComponent}
  </SimpleForm>
  )
}
