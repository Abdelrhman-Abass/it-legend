"use client"
import React, { useState, useEffect } from "react";
import { course_data } from "@/data";
import { Link } from "@/navigation";
import CourseDiploma from "@/components/course/CourseDiploma";
// import CourseDiploma from "../course/CourseDiploma";
import { useDispatch, useSelector } from "react-redux";
import { UserDiploma } from "../../store/features/diploma-slice";
import {
  selectDiploma,
  selectDiplomaStatus,
  selectDiplomaError,
} from "../../store/features/diploma-slice";

const ListArea = ({ title }) => {
  const [cour, setCour] = useState([]);

  const dispatch = useDispatch();

  const diploma = useSelector(selectDiploma) || []; // Ensure it's always an array
  const status = useSelector(selectDiplomaStatus);
  const error = useSelector(selectDiplomaError);

  useEffect(() => {
    dispatch(UserDiploma());
  }, [dispatch]);

  useEffect(() => {
    console.log("Courses Status:", status);
    if (status === "succeeded") {
      console.log("Courses Data:", diploma);
      // const { data } = diploma;  // Assuming `courses` has a `data` property that holds the array
      // setCour(data);  // Set cour as the array, not a string
      // console.log("Data array:", data);  // Log the actual array
    }
    if (status === "failed") {
      console.log("Error:", error);
    }
  }, [status, diploma, error]);
  return (
    <section >
      <div className="container">
        <h4 className="title">{title}</h4>
        <div className="pr-[70px] pl-[70px] row row--30 desktop" style={{ justifyContent: "center" }}>
          <div className=" px-[60px]">
            {status === "loading" && (
              <p className="loading-text">Loading...</p>
            )}
            {status === "succeeded" && diploma.map((course,idx) => (
              <div
                key={idx}
                className="edu-blog blog-style-list"
                data-aos-delay="150"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <div className="inner">
                  <div className="thumbnail">
                    <Link href={`/course-player/c84e7902-1205-426f-a857-922bedd84bdf}`}>
                      <img
                        src={`http://49.13.77.125:1118/Content/Uploads/CategoryMedia/${course.image}`}
                        alt="Blog Images"
                      />
                    </Link>
                    <div className="time-top">
                      <span className="duration_1">
                        45%
                      </span>
                    </div>
                  </div>
                  <div className="content">
                    <h5 className="title">
                      <Link href={`/course-player/c84e7902-1205-426f-a857-922bedd84bdf}`}>
                        {course.titleAr}...
                      </Link>
                    </h5>
                    <p>{course.shortDescriptionAr ? course.shortDescriptionAr : "No description available"}</p>
                    <div className="read-more-btn">
                      <Link
                        href={`/course-player/c84e7902-1205-426f-a857-922bedd84bdf}`}
                        className="edu-btn btn-border btn-medium"
                      >
                        ابدا الان <i className="icon-4"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {status === "failed" && (
              <p className="error-text">Failed to load courses. Please try again.</p>
            )}
          </div>
        </div>

        <div className="row g-5 mobile ">
          {status === "loading" && (
            <p className="loading-text">Loading...</p>
          )}
          

          {status === "succeeded" &&
            diploma.map((course, idx) => (
              <div
                className="col-md-6 col-lg-4"
                data-aos-delay="150"
                data-aos="fade-up"
                data-aos-duration="800"
                key={idx}
              >
                <CourseDiploma
                  bg="#f5f1eb"
                  my={true}
                  data={course}
                  image_location_path="02"
                />
              </div>
            ))}
          {/* {course_data.slice(0, 1).map((course) => {
            return (
              <div
                className="col-md-6 col-lg-4"
                data-aos-delay="150"
                data-aos="fade-up"
                data-aos-duration="800"
                key={course.id}
              >
                <CourseDiploma
                  bg="#f5f1eb"
                  my={true}
                  data={course}
                  image_location_path="02"
                />
              </div>
            );
          })} */}
          {status === "failed" && (
            <p className="error-text">Failed to load courses. Please try again.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ListArea;

// "use client";
// import React, { useState, useEffect } from "react";
// import { course_data } from "@/data";
// import { Link } from "@/navigation";
// import CourseDiploma from "@/components/course/CourseDiploma";
// import { useDispatch, useSelector } from "react-redux";
// import { UserDiploma } from "../../store/features/diploma-slice";
// import {
//   selectDiploma,
//   selectDiplomaStatus,
//   selectDiplomaError,
// } from "../../store/features/diploma-slice";

// const ListArea = ({ title }) => {
//   const [cour, setCour] = useState([]);

//   const dispatch = useDispatch();

//   const diploma = useSelector(selectDiploma) || []; // Ensure it's always an array
//   const status = useSelector(selectDiplomaStatus);
//   const error = useSelector(selectDiplomaError);

//   useEffect(() => {
//     dispatch(UserDiploma());
//   }, [dispatch]);

//   useEffect(() => {
//     console.log("Courses Status:", status);
//     if (status === "succeeded") {
//       console.log("Courses Data:", diploma);
//       const { data } = diploma;  // Assuming `courses` has a `data` property that holds the array
//       if (Array.isArray(data)) {
//         setCour(data);  // Set cour as the array, not a string
//       } else {
//         console.error("Invalid data structure:", data);
//       }
//     }
//     if (status === "failed") {
//       console.log("Error:", error);
//     }
//   }, [status, diploma, error]);

//   return (
//     <section>
//       <div className="container">
//         <h4 className="title">{title}</h4>
//         <div className="pr-[70px] pl-[70px] row row--30 desktop" style={{ justifyContent: "center" }}>
//           <div className=" px-[60px]">
//             {status === "loading" && (
//               <p className="loading-text">Loading...</p>
//             )}
//             {status === "succeeded" && cour?.length > 0 ? (
//               cour.map((course, idx) => (
//                 <div
//                   key={idx}
//                   className="edu-blog blog-style-list"
//                   data-aos-delay="150"
//                   data-aos="fade-up"
//                   data-aos-duration="800"
//                 >
//                   <div className="inner">
//                     <div className="thumbnail">
//                       <img
//                         src={"/assets/images/blog/blog-25.jpg"} // Replace with course.image if available
//                         alt="Blog Images"
//                       />
//                     </div>
//                     <div className="content">
//                       <h5 className="title">
//                         {/* Assuming course has `titleAr` and `titleEn` */}
//                         {course.titleAr || course.titleEn}
//                       </h5>
//                       <p>{course.shortDescriptionAr || "No description available"}</p>
//                       <div>
//                         <span>Rating: {course.averageRating}</span>
//                       </div>
//                       <div>
//                         <span>Lectures: {course.lectures}</span>
//                       </div>
//                       <div>
//                         <span>Exams: {course.exams}</span>
//                       </div>
//                       <div className="read-more-btn">
//                         <a href={`/course/${course.categoryId}`} className="edu-btn btn-border btn-medium">
//                           Start Now
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No courses available.</p>  // Handle the case where no data is found
//             )}

//             {status === "failed" && (
//               <p className="error-text">Failed to load courses. Please try again.</p>
//             )}
//           </div>
//         </div>

//         <div className="row g-5 mobile">
//           {status === "loading" && (
//             <p className="loading-text">Loading...</p>
//           )}
//           {status === "succeeded" && cour?.length > 0 ? (
//             cour.map((course) => (
//               <div
//                 className="col-md-6 col-lg-4"
//                 data-aos-delay="150"
//                 data-aos="fade-up"
//                 data-aos-duration="800"
//                 key={course.id}
//               >
//                 <CourseDiploma
//                   bg="#f5f1eb"
//                   my={true}
//                   data={course}
//                   image_location_path="02"
//                 />
//               </div>
//             ))
//           ) : (
//             course_data.slice(0, 1).map((course) => (
//               <div
//                 className="col-md-6 col-lg-4"
//                 data-aos-delay="150"
//                 data-aos="fade-up"
//                 data-aos-duration="800"
//                 key={course.id}
//               >
//                 <CourseDiploma
//                   bg="#f5f1eb"
//                   my={true}
//                   data={course}
//                   image_location_path="02"
//                 />
//               </div>
//             ))
//           )}
//           {status === "failed" && (
//             <p className="error-text">Failed to load courses. Please try again.</p>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ListArea;
