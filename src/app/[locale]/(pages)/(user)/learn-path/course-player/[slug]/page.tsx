import CoursePlayer from '@/app/components/coursePlayer/CoursePlayer'
import React from 'react'

export default function page({ params }: any) {
  return (
    <CoursePlayer slug={params.slug}/>
  )
}
