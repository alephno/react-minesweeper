import * as React from 'react'
import Header from './Header'
import Board from './Board'

export default function Minesweeper(): JSX.Element {

  return (
    <>
      <Header />
      <Board size={10} />
    </>
  )
}