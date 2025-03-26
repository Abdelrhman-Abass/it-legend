// "use client";
// import React, { useState } from "react";
// import WrapperSelect from "../common/wrapperSelect/WrapperSelect";
// import { useTranslations } from "next-intl";
// import CardsLayout from "../common/cardsLayout/CardsLayout";
// import CourseCard from "../common/courseCard/CourseCard";
// import GridToggle from "@/app/store/GridToggle";
// import { IoMdCart } from "react-icons/io";
// import Button from "../common/button/Button";
// import { TbReload } from "react-icons/tb";
// import { getServerRequest } from "@/app/utils/generalServerRequest";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "next/navigation";
// import NewLoader from "../common/newLoader/NewLoader";
// import { Course } from "@/app/types/Types";

// interface FilterState {
//     type: string; // "all", "free", or "paid"
//     categoryId: string; // "all" or specific category ID
//   }


// export default function CoursesContainer() {
//     const t = useTranslations();
//     const { type } = GridToggle();
//     const { locale } = useParams();

//     // State to manage the number of courses displayed
//     const [visibleCourses, setVisibleCourses] = useState(9);

//     // const [filter, setFilter] = useState("all"); // "all", "free", or "paid"

//     // Filter courses based on the selected filter
    
//     // Fetch courses using React Query
//     const [filter, setFilter] = useState<FilterState>({
//         type: "all",
//         categoryId: "all"
//     });

//     // Fetch categories
//     const { data: categories, isLoading: LoadingCategory } = useQuery({
//         queryKey: ["category"],
//         queryFn: async () => {
//             const response = await getServerRequest("/Category");
//             return response.data.data || [];
//         },
//     });

//     // Fetch courses
//     const { data: courses, isLoading, error } = useQuery({
//         queryKey: ["courses"],
//         queryFn: async () => {
//             const response = await getServerRequest("/Course");
//             return response.data.data || [];
//         },
//     });
    
//     // Filter courses based on both type and category
//     const filteredCourses = courses?.filter((course: Course) => {
//         // Filter by type (free/paid)
//         const typeMatch = 
//             filter.type === "all" || 
//             (filter.type === "free" && course.price === 0) || 
//             (filter.type === "paid" && course.price > 0);

//         // Filter by category
//         const categoryMatch = 
//             filter.categoryId === "all" || 
//             course.categoryId === filter.categoryId;

//         return typeMatch && categoryMatch;
//     });

//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }

//     // const courses = data?.data;

//     // Function to load more courses
//     const loadMoreCourses = () => {
//         setVisibleCourses((prev) => prev + 6); // Add 6 more courses
//     };

//     const handleFilterChange = (newFilter: Partial<FilterState>) => {
//         setFilter(prev => ({ ...prev, ...newFilter }));
//     };


//     return (
//         <section className="courses_container p-lg py">
//             {isLoading ? (<NewLoader loading={isLoading} />) : (
//                 <>
//                     <div className="courses_container_header f jb ac">
//                         <h2>
//                             {t("common.offering")} <span>{filteredCourses.length}</span> {t("common.courses")}
//                         </h2>
//                         <div className="courses_container_header_layout f ac">
//                             <CardsLayout />
//                             <WrapperSelect  setFilter={handleFilterChange}
//                                 categories={categories}
//                                 useArabic={locale === "ar"}
//                                 currentType={filter.type}
//                                 currentCategory={filter.categoryId}/>
//                         </div>
//                     </div>


//                     <div className={`courses_container_cards ${`_${type}`}`}>
//                         {filteredCourses.slice(0, visibleCourses).map((course: Course, index: number) => (
//                             <CourseCard
//                                 key={index}
//                                 hideItems={false}
//                                 titleAr={course.titleAr}
//                                 titleEn={course.titleEn}
//                                 shortDescriptionAr={course.shortDescriptionAr}
//                                 shortDescriptionEn={course.shortDescriptionEn}
//                                 btnText={t("diplomaDetails.footer.btn")}
//                                 customClass={type === "line" ? "course_dip" : ""}
//                                 image={`https://itlegend.net/Content/Uploads/CoursesMedia/${course.image}`}
//                                 url={`/${locale}/courses/course-details/${course.courseId}`}
//                                 lectures={course.lectures}
//                                 exams={course.exams}
//                                 averageRating={course.averageRating}
//                             />
//                         ))}
//                     </div>

//                     <div className="courses_container_cards_btn f ac jc">
//                         {visibleCourses < courses.length && ( // Show the button only if there are more courses to load
//                             <Button
//                                 title="View More Courses"
//                                 onClick={loadMoreCourses} // Call loadMoreCourses on button click
//                                 customIcon={<TbReload />}
//                                 red
//                             />
//                         )}
//                     </div>
//                 </>
//             )
//             }
//         </section >
//     );
// }


"use client";
import React, { useState } from "react";
import WrapperSelect from "../common/wrapperSelect/WrapperSelect";
import { useTranslations } from "next-intl";
import CardsLayout from "../common/cardsLayout/CardsLayout";
import CourseCard from "../common/courseCard/CourseCard";
import GridToggle from "@/app/store/GridToggle";
import Button from "../common/button/Button";
import { TbReload } from "react-icons/tb";
import { getServerRequest } from "@/app/utils/generalServerRequest";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import NewLoader from "../common/newLoader/NewLoader";
import { Course } from "@/app/types/Types";

interface FilterState {
  type: string; // "all", "free", or "paid"
  categoryId: string; // "all" or specific category ID
  level: string; // "all", "beginner", "intermediate", or "advanced"
}

export default function CoursesContainer() {
    const t = useTranslations();
    const { type } = GridToggle();
    const { locale } = useParams();

    // State to manage the number of courses displayed
    const [visibleCourses, setVisibleCourses] = useState(9);

    // Combined filter state
    const [filter, setFilter] = useState<FilterState>({
        type: "all",
        categoryId: "all",
        level: "all"
    });

    // Fetch categories
    const { data: categories, isLoading: LoadingCategory } = useQuery({
        queryKey: ["category"],
        queryFn: async () => {
            const response = await getServerRequest("/Category");
            return response.data.data || [];
        },
    });

    // Fetch courses
    const { data: courses, isLoading, error } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const response = await getServerRequest("/Course");
            return response.data.data || [];
        },
    });
    
    // Filter courses based on type, category and level
    const filteredCourses = courses?.filter((course: Course) => {
        // Filter by type (free/paid)
        const typeMatch = 
            filter.type === "all" || 
            (filter.type === "free" && course.price === 0) || 
            (filter.type === "paid" && course.price > 0);

        // Filter by category
        const categoryMatch = 
            filter.categoryId === "all" || 
            course.categoryId === filter.categoryId;

        // Filter by level (assuming course has a 'level' property)
        const levelMatch = 
            filter.level === "all" || 
            (filter.level === "pre-learning" && course.levelTitleAr === "مرحلة ما قبل التعلم") ||
            (filter.level === "advanced" && course.levelTitleAr === "مرحلة التأهيل لسوق العمل") ||
            (filter.level === "foundation" && course.levelTitleAr === "مرحلة التأسيس");

        return typeMatch && categoryMatch && levelMatch;
    });

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Function to load more courses
    const loadMoreCourses = () => {
        setVisibleCourses((prev) => prev + 6);
    };

    // Handle filter changes
    const handleFilterChange = (newFilter: Partial<FilterState>) => {
        setFilter(prev => ({ ...prev, ...newFilter }));
    };

    return (
        <section className="courses_container p-lg py">
            {isLoading ? (
                <NewLoader loading={isLoading} />
            ) : (
                <>
                    <div className="courses_container_header f jb ac">
                        <h2>
                            {t("common.offering")} <span>{filteredCourses?.length || 0}</span> {t("common.courses")}
                        </h2>
                        <div className="courses_container_header_layout f ac">
                            <CardsLayout />
                            <WrapperSelect 
                                setFilter={handleFilterChange}
                                categories={categories}
                                useArabic={locale === "ar"}
                                currentType={filter.type}
                                currentCategory={filter.categoryId}
                                currentLevel={filter.level}
                            />
                        </div>
                    </div>

                    <div className={`courses_container_cards ${`_${type}`}`}>
                        {filteredCourses?.slice(0, visibleCourses).map((course: Course, index: number) => (
                            <CourseCard
                                key={index}
                                hideItems={false}
                                titleAr={course.titleAr}
                                titleEn={course.titleEn}
                                shortDescriptionAr={course.shortDescriptionAr}
                                shortDescriptionEn={course.shortDescriptionEn}
                                btnText={t("diplomaDetails.footer.btn")}
                                customClass={type === "line" ? "course_dip" : ""}
                                image={`https://itlegend.net/Content/Uploads/CoursesMedia/${course.image}`}
                                url={`/${locale}/courses/course-details/${course.courseId}`}
                                lectures={course.lectures}
                                exams={course.exams}
                                averageRating={course.averageRating}
                            />
                        ))}
                    </div>

                    <div className="courses_container_cards_btn f ac jc">
                        {visibleCourses < (filteredCourses?.length || 0) && (
                            <Button
                                title="View More Courses"
                                onClick={loadMoreCourses}
                                customIcon={<TbReload />}
                                red
                            />
                        )}
                    </div>
                </>
            )}
        </section>
    );
}