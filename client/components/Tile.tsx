import * as React from 'react'

export interface TileProps {
  value: number,
  hidden: boolean,
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Tile(props:TileProps): JSX.Element {
  const format = (value:number) => {
    switch (value) {
      case -1:
        return '*'
      case 0:
        return '-'
      default:
        return value;
    }
  }

  return (
    <button onClick={props.onClick}>
      {props.hidden ? '' : format(props.value)}
    </button>
  )
}