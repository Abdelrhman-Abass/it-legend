import React, { Fragment } from 'react'
import SolutionBanner from '../solutionBanner/SolutionBanner'
import CoursesContainer from '../coursesContainer/CoursesContainer'

export default function CoursesPage() {
  return (
      <Fragment>
          <CoursesContainer />
          <SolutionBanner />
    </Fragment>
  )
}
