import React from 'react'

const MoreBtn = ({ isActive, setallcategoryclose }) => {

  console.log(isActive, setallcategoryclose, 'll');


  return (
    <div
      onClick={() => setallcategoryclose()}
      className='moreBtn p-3 flex items-center justify-center  relative'
    >
      <span className={`line1 absolute bg-zinc-950 h-[1vw] p-[0.1vw] ${isActive ? 'rotate-90' : ''} transition-all ease-in-out duration-500`}></span>
      <span className='line2 absolute bg-zinc-950 rotate-[90deg] h-[1vw] p-[0.1vw]'></span>
    </div>
  )
}

export default MoreBtn


