import * as React from 'react'
import Tile from './Tile'

type Board = Array<Array<[number, boolean]>>

interface BoardProps {
  size: number
}

const makeEmptyBoard = (size:number):Board => [...Array(size)].map(() => [...Array(size)].map(() => [0, false]))

const newBoard = (size:number): Board => {
  const board:Board = makeEmptyBoard(size)

  const allIndices = [...Array(size * size).keys()].map(i => [Math.floor(i / size), i % size])
  const randomIndex = (): number => Math.floor(Math.random() * allIndices.length)
  const updateNeighbors = (x: number, y: number): void => {
    // only increment mine count if the tile is not a mine
    const newValue = (value: number) => value >= 0 ? value + 1 : value 
    // check that row, col is on the board
    const inBounds = (row:number, col:number): boolean => 
      row >= 0 && 
      row < size && 
      col >= 0 && 
      col < size

    const left = x - 1
    const right = x + 1
    const up = y - 1
    const down = y + 1

    const neighbors:Array<[number, number]> = [
      [left, y], [left, up], [left, down],    // left neigbors
      [x, up], [x, down],                     // above and below
      [right, y], [right, up], [right, down] // right neighbors
    ]

    neighbors.forEach(neighbor => {
      const [nX, nY] = neighbor
      if (inBounds(nX, nY)) {
        board[nX][nY][0] = newValue(board[nX][nY][0])
      }
    })
  }

  // get 'size' number of random indices
  // remove an index from the bag of all indices to prevent picking it again
  const mines = [...Array(size).keys()].map(() => allIndices.splice(randomIndex(), 1)[0])
  mines.forEach(mine => {
    const [mX, mY] = mine

    board[mX][mY][0] = -1

    updateNeighbors(mX, mY)
  })

  return board
}

export default function Board(props:BoardProps): JSX.Element {
  const empty:Board = makeEmptyBoard(props.size)
  const [board, setBoard] = React.useState<Board>(newBoard(props.size))

  const revealMine = (x:number, y:number, e:React.MouseEvent<HTMLButtonElement>) => {
    const _newBoard = board.slice()
    _newBoard[x][y][1] = false
    setBoard(_newBoard)
  }

  return (
    <section style={{display: 'grid', gridTemplateColumns: `repeat(${props.size}, 1.5em)`, gridAutoRows: '1.5em'}}>
      { 
        board.map((row, x) => row.map((col, y) => {
          return <Tile key={x*props.size + y} value={col[0]} hidden={col[1]} onClick={(e) => revealMine(x, y, e)}/>
        })) 
      }
    </section>
  )
}