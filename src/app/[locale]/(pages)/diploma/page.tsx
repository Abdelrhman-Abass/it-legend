// import React from 'react'

// export default function page() {
//   return (
//     <div>Diplomas Page</div>
//   )
// }

import CoursesContainer from '@/app/components/coursesContainer/CoursesContainer'
import DiplomaContainer from '@/app/components/diplomaContainer/DiplomaContainer'
import SolutionBanner from '@/app/components/solutionBanner/SolutionBanner'
import React, { Fragment } from 'react'


export default function DiplomaPage() {
  return (
      <Fragment>
          <DiplomaContainer />
          <SolutionBanner />
    </Fragment>
  )
}