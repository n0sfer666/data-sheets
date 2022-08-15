import { TRandomData } from '../../utils/randomData.types';

export type TAppProps = {
  data: TRandomData[]
}

export type TChangeEvent = React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
