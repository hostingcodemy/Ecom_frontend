import React from 'react'

const Btn = ({ title }) => {
  return (
    <div className='Btn w-[50%] hover:bg-[#fcb03f] transition-all ease-in-out duration-500 absolute left-[50%] top-[90%] -translate-x-[50%] bg-zinc-100 flex items-center justify-center text-[1vw] py-2 rounded-3xl -translate-y-[50%]' >
      {title}
    </div>
  )
}

export default Btn;
