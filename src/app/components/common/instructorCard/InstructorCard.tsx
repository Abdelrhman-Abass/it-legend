import Image from 'next/image'
import React from 'react'

export default function InstructorCard() {
  return (
      <div className='instructor_card f'>
          <div className="instructor_card_image">
              <Image src={"/assets/images/ali-shahin.jpg"}
              alt="instructor_card_image" fill loading='lazy'/>
          </div>
          <div className="instructor_card_info">
              <h2>Ali Shaheen</h2>
              <p className='p1'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui corrupti iure magnam totam nam dicta odit!</p>
          </div>
    </div>
  )
}
