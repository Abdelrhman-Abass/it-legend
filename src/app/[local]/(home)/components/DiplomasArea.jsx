"use server";
import { course_data } from "@/data";
import CourseTypeOne from "@/components/course/course-type-one";
import Diplomas from "./Diplomas";
// import { useTranslations } from "next-intl";

const fetchCourses = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/Category`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Avoid caching if data is dynamic
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.statusText}`);
    }
    const {data} = await response.json();
    // console.log("response " + JSON.stringify(data))
    return data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    return []; // Return an empty array or handle errors appropriately
  }
};

// const DiplomasArea = () => {
//   const [diploma, setDiploma] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchCourses();
//         setDiploma(data);
//       } catch (error) {
//         console.error("Error fetching diploma data:", error);
//       }
//     };

//     fetchData();
//   }, []);

const DiplomasArea = async() => {
  const diploma = await fetchCourses();

  // const t = useTranslations("home.learningPathsArea");
  return (
    <>
      {diploma ? (
        <div
          id="paths"
          className="edu-course-area course-area-2 gap-tb-text bg-lighten03"
        >
          <div className="container">
            <Diplomas data={diploma} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DiplomasArea;
