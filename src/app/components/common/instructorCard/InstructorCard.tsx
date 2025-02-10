import Image from 'next/image'
import React from 'react'

export default function InstructorCard() {
  return (
      <div className='instructor_card f'>
          <div className="instructor_card_image">
              <Image src={"https://yt3.googleusercontent.com/jVkZNv7aNBZFFQsTDCLlHM1qqX2ZJSwh_khC7n4JCgZCxescg8AQgYlozZ9xHq7phfS5WoL1wfs=s900-c-k-c0x00ffffff-no-rj"}
              alt="instructor_card_image" fill unoptimized/>
          </div>
          <div className="instructor_card_info">
              <h2>Ali Shaheen</h2>
              <p className='p1'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui corrupti iure magnam totam nam dicta odit!</p>
          </div>
    </div>
  )
}
