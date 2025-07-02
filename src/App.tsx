import { Admin, defaultTheme, Resource } from 'react-admin'
import { ProductShow } from '../components/ProductShow/ProductShow'
import { authProvider } from './authProvider'
import dataProvider from './dataProvider'
import { EQUIPMENTS_SOURCE_NAME, NEWS_SOURCE_NAME, SEEDS_SOURCE_NAME, SPROUTS_SOURCE_NAME, USERS_SOURCE_NAME } from '../constants/sourceNames'
import { MICROGREEN_SOURCE_NAME } from '../constants/sourceNames'
import { UsersList } from '../components/Users/UsersList/UsersList'
import { UsersShow } from '../components/Users/UsersShow/UsersShow'
import { NewsShow } from '../components/NewsShow/NewsShow'
import { UsersCreate } from '../components/Users/UsersCreate/UsersCreate'
import { UsersEdit } from '../components/Users/UsersEdit/UsersEdit'
import { GoodsList } from '../components/GoodsList/GoodsList'
import { NewsList } from '../components/NewsList/NewsList'
import { MicrogreenCreate } from '../components/Microgreen/MicrogreenCreate/MicrogreenCreate'
import { MicrogreenEdit } from '../components/Microgreen/MicrogreenEdit/MicrogreenEdit'
import { SproutsCreate } from '../components/Sprouts/SproutsCreate/SproutsCreate'
import { SproutsEdit } from '../components/Sprouts/SproutsEdit/SproutsEdit'
import { SeedsCreate } from '../components/Seeds/SeedsCreate/SeedsCreate'
import { SeedsEdit } from '../components/Seeds/SeedsEdit/SeedsEdit'
import { EquipmentCreate } from '../components/Equipment/EquipmentCreate/EquipmentCreate'
import { EquipmentEdit } from '../components/Equipment/EquipmentEdit/EquipmentEdit'
import { NewsCreate } from '../components/News/NewsCreate/NewsCreate'

// при загрузке страницы у нас будет показываться список товаров
export const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
    theme={{
      ...defaultTheme,
      palette: {
        mode: 'dark'
      }
    }}
  >
  <Resource
    name={USERS_SOURCE_NAME}
    list={UsersList}
    show={UsersShow}
    create={UsersCreate}
    edit={UsersEdit}
  />
  <Resource
    name={MICROGREEN_SOURCE_NAME}
    list={GoodsList}
    create={MicrogreenCreate}
    show={ProductShow}
    edit={MicrogreenEdit}
  />
  <Resource
    name={SPROUTS_SOURCE_NAME}
    list={GoodsList}
    create={SproutsCreate}
    show={ProductShow}
    edit={SeedsEdit}
  />
  <Resource
    name={SEEDS_SOURCE_NAME}
    list={GoodsList}
    create={SeedsCreate}
    show={ProductShow}
    edit={SproutsEdit}
  />
  <Resource
    name={EQUIPMENTS_SOURCE_NAME}
    list={GoodsList}
    create={EquipmentCreate}
    show={ProductShow}
    edit={EquipmentEdit}
  />
  <Resource
    name={NEWS_SOURCE_NAME}
    list={NewsList}
    create={NewsCreate}
    show={NewsShow}
    // edit={EquipmentEdit}
  />
  </Admin>
)
