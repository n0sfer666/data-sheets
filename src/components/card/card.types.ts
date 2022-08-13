import { TCardData } from '../../utils/randomData.types';

export type TCardProps = {
  cardIndex: number
  isOpen: boolean
  onHeaderClick: Function
  title: string
  subTitle: string
  dateStart: number
  dateEnd: number
  data: TCardData[]
}
