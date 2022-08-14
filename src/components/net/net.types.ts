import { TRandomData } from '../../utils/randomData.types';

export type TNetProps = TRandomData & {
  netIndex: number
  onOpenSubNet: Function
}
