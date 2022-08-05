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
export type TRandomData = {
  title: string;
  items: {
    title: string;
    items: TCard[];
  }[];
}
