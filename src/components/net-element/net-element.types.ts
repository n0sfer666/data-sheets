import { TGroup } from '../../utils/randomData.types';

export type TNetElementProps = TGroup & {
  onOpen: Function
  isOpen: boolean
  netElementIndex: number
}
