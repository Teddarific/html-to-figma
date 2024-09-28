import React from 'react'

export function ExampleBannerText() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-xl">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ-AXpaTF1MOAKPEyD3ZNTBptJLkW8RkAWrFBHoLTLiHIfb1GfED8w9QJvhVLINgfsrxQ&usqp=CAU"
          alt="Jackie"
          className="mx-auto mb-6"
        />
        <p
          id="test"
          className="text-3xl sm:text-4xl md:text-5xl text-center font-sans text-[#28a745] leading-snug"
        >
          <span id="t2" className="font-bold">
            630PM?
          </span>{' '}
          Are you gonna take the dartmouth coach,{' '}
          <span className="text-4xl sm:text-5xl md:text-6xl">jackie?</span>{' '}
          <a href="">Hello world</a>
        </p>
      </div>
    </div>
  )
}
