import { ChangeEventHandler } from 'react';

export type TRemoverProps = {
  isOpen: boolean,
  elementIndex: number
  onClick: Function
  onChange: Function
  titles: string[]
}
