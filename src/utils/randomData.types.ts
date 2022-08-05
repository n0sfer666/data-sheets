export type TCardData = {
  title: string;
  number: number;
}
export type TCard = {
  title: string;
  subTitle: string;
  dateStart: number;
  dateEnd: number;
  data: TCardData[];
}
export type TGroup = {
  title: string
  items: TCard[]
}
export type TRandomData = {
  title: string;
  items: TGroup[];
}
