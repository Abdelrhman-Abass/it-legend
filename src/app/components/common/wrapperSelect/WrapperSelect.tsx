// "use client";
// import { Space } from "antd";
// import React from "react";
// import Select from "react-select";

// export default function WrapperSelect({ setFilter }: { setFilter: (value: string) => void }) {
//     const colourOptions = [
//         { value: "all", label: "All" },
//         { value: "free", label: "Free" },
//         { value: "paid", label: "Paid" },
//     ];

//     const handleChange = (selectedOption:any) => {
//         // Call the setFilter function with the selected value
//         setFilter(selectedOption.value);
//     };

//     return (
//         <div className="wrapper_select">
//             <Space wrap>
//             <Select
//               defaultValue="incorrect"
//               style={{ width: 150 }}
//               onChange={handleChange}
//               options={[
//                 { value: 'all', label: t("courseExam.all") },
//                 { value: 'correct', label:  t("courseExam.correct")},
//                 { value: 'incorrect', label: t("courseExam.wrong")},
//               ]}
//             />
//           </Space>
//             <Select
//                 className="basic-single"
//                 classNamePrefix="select"
//                 name="color"
//                 isSearchable={false}
//                 options={colourOptions}
//                 onChange={handleChange} // Pass the handleChange function directly
//                 // defaultValue={colourOptions[0]} // Set the default value to "All" 
//                 styles={{
//                     container: (baseStyles) => ({
//                         ...baseStyles,
//                     }),
//                     indicatorSeparator: (baseStyles) => ({
//                         ...baseStyles,
//                         display: "none",
//                     }),
//                     control: (baseStyles, state) => ({
//                         ...baseStyles,
//                         borderRadius: "0.2em",
//                         background: "white",
//                         border: "2px solid rgba(0, 0, 0, 0.2)",
//                         boxShadow: state.isFocused ? "none" : "none",
//                         height: "2.5em",
//                         width: "15em",
//                         "&:hover": {
//                             border: "2px solid rgba(0, 0, 0, 0.2)",
//                         },
//                     }),
//                     menu: (baseStyles) => ({
//                         ...baseStyles,
//                         borderRadius: "0.5em",
//                         background: "white",
//                         zIndex: 10,
//                     }),
//                 }}
//             />
//         </div>
//     );
// }

// "use client";
// import React from "react";
// import { Select, Space } from "antd";

// export default function WrapperSelect({ setFilter }: { setFilter?: (value: string) => void }) {
//     const handleChange = (value: string) => {
//         // Call the setFilter function with the selected value
//         if(setFilter){
//             setFilter(value);
//         }
//     };

//     return (
//         <div className="wrapper_select">
//             <Space wrap>
//                 <Select
//                     defaultValue="all" // Set the default value to "All"
//                     style={{ width: 150 }} // Adjust the width as needed
//                     onChange={handleChange} // Pass the handleChange function
//                     options={[
//                         { value: "all", label: "All" },
//                         { value: "free", label: "Free" },
//                         { value: "paid", label: "Paid" },
//                     ]}
//                 />
//             </Space>
//         </div>
//     );
// }

// "use client";
// import React from "react";
// import { Select, Space } from "antd";

// interface Category {
//     categoryId: string;
//     titleEn: string;
//     titleAr: string;
// }

// interface WrapperSelectProps {
//     setFilter: (filter: { type?: string; categoryId?: string }) => void;
//     categories?: Category[];
//     useArabic?: boolean;
//     currentType?: string;
//     currentCategory?: string;
// }

// export default function WrapperSelect({
//     setFilter,
//     categories = [],
//     useArabic = false,
//     currentType = "all",
//     currentCategory = "all"
// }: WrapperSelectProps) {
//     const handleTypeChange = (value: string) => {
//         setFilter({ type: value });
//     };

//     const handleCategoryChange = (value: string) => {
//         setFilter({ categoryId: value });
//     };

//     const typeOptions = [
//         { value: "all", label: useArabic ? "الكل" : "All" },
//         { value: "free", label: useArabic ? "مجاني" : "Free" },
//         { value: "paid", label: useArabic ? "مدفوع" : "Paid" }
//     ];

//     const categoryOptions = [
//         { value: "all", label: useArabic ? "كل الفئات" : "All Categories" },
//         ...categories.map(category => ({
//             value: category.categoryId,
//             label: useArabic ? category.titleAr : category.titleEn
//         }))
//     ];

//     return (
//         <div className="wrapper_select" style={{ display: 'flex', gap: '10px' }}>
//             <Space wrap>
//                 <Select
//                     value={currentType}
//                     style={{ width: 120 }}
//                     onChange={handleTypeChange}
//                     options={typeOptions}
//                 />
//                 <Select
//                     value={currentCategory}
//                     style={{ width: 180 }}
//                     onChange={handleCategoryChange}
//                     options={categoryOptions}
//                 />
//             </Space>

//             <Select
//                 defaultValue="lucy"
//                 style={{ width: 200 }}
//                 onChange={handleChange}
//                 options={[
//                     {
//                         label: <span>manager</span>,
//                         title: 'manager',
//                         options: [
//                             { label: <span>Jack</span>, value: 'Jack' },
//                             { label: <span>Lucy</span>, value: 'Lucy' },
//                         ],
//                     },
//                     {
//                         label: <span>engineer</span>,
//                         title: 'engineer',
//                         options: [
//                             { label: <span>Chloe</span>, value: 'Chloe' },
//                             { label: <span>Lucas</span>, value: 'Lucas' },
//                         ],
//                     },
//                 ]}
//             />
//         </div>
//     );
// }

// "use client";
// import React from "react";
// import { Select } from "antd";

// interface Category {
//   categoryId: string;
//   titleEn: string;
//   titleAr: string;
// }

// interface WrapperSelectProps {
//   setFilter: (filter: { type?: string; categoryId?: string }) => void;
//   categories?: Category[];
//   useArabic?: boolean;
//   currentType?: string;
//   currentCategory?: string;
// }

// export default function WrapperSelect({
//   setFilter,
//   categories = [],
//   useArabic = false,
//   currentType = "all",
//   currentCategory = "all"
// }: WrapperSelectProps) {
//   // Combine current filters for display
//   const currentValue = currentType === "all" && currentCategory === "all" 
//     ? "all" 
//     : `${currentType}|${currentCategory}`;

//   const handleChange = (value: string) => {
//     if (value === "all") {
//       // Reset both filters
//       setFilter({ type: "all", categoryId: "all" });
//     } else {
//       const [type, categoryId] = value.split("|");
//       setFilter({ 
//         type: type || undefined, 
//         categoryId: categoryId || undefined 
//       });
//     }
//   };

//   // Create grouped options
//   const options = [
//     {
//       label: useArabic ? "الكل" : "All",
//       value: "all",
//     },
//     {
//       label: useArabic ? "نوع الدورة" : "Course Type",
//       options: [
//         { label: useArabic ? "مجاني" : "Free", value: "free|all" },
//         { label: useArabic ? "مدفوع" : "Paid", value: "paid|all" },
//       ],
//     },
//     {
//       label: useArabic ? "فئات الدورة" : "Course Categories",
//       options: [
//         ...categories.map(category => ({
//           label: useArabic ? category.titleAr : category.titleEn,
//           value: `all|${category.categoryId}`,
//         })),
//       ],
//     },
//     // {
//     //   label: useArabic ? "مختلط" : "Combined Filters",
//     //   options: [
//     //     ...categories.flatMap(category => [
//     //       {
//     //         label: `${useArabic ? "مجاني" : "Free"} / ${useArabic ? category.titleAr : category.titleEn}`,
//     //         value: `free|${category.categoryId}`,
//     //       },
//     //       {
//     //         label: `${useArabic ? "مدفوع" : "Paid"} / ${useArabic ? category.titleAr : category.titleEn}`,
//     //         value: `paid|${category.categoryId}`,
//     //       },
//     //     ]),
//     //   ],
//     // },
//   ];

//   return (
//     <div className="wrapper_select">
//       <Select
//         value={currentValue}
//         style={{ width: 250 }}
//         onChange={handleChange}
//         options={options}
//         placeholder={useArabic ? "تصفية الدورات" : "Filter Courses"}
//       />
//     </div>
//   );
// }


"use client";
import React from "react";
import { Select } from "antd";

interface Category {
    categoryId: string;
    titleEn: string;
    titleAr: string;
}

interface WrapperSelectProps {
    setFilter?: (filter: { type?: string; categoryId?: string; level?: string }) => void;
    categories?: Category[];
    useArabic?: boolean;
    currentType?: string;
    currentCategory?: string;
    currentLevel?: string;
}

export default function WrapperSelect({
    setFilter,
    categories = [],
    useArabic = false,
    currentType = "all",
    currentCategory = "all",
    currentLevel = "all"
}: WrapperSelectProps) {
    // Combine current filters for display
    const currentValue = currentType === "all" && currentCategory === "all" && currentLevel === "all"
        ? "all"
        : `${currentType}|${currentCategory}|${currentLevel}`;

    const handleChange = (value: string) => {
        if (!setFilter) return; // ✅ Avoid calling undefined function


        if (value === "all") {
            // Reset all filters
            setFilter({ type: "all", categoryId: "all", level: "all" });
        } else {
            const [type, categoryId, level] = value.split("|");
            setFilter({
                type: type || undefined,
                categoryId: categoryId || undefined,
                level: level || undefined
            });
        }
    };

    // Define course levels (adjust as needed)
    const courseLevels = [
        { value: "pre-learning", label: useArabic ? "مرحلة ما قبل التعلم" : "Beginner" },
        { value: "foundation", label: useArabic ? "مرحلة التأسيس" : "Intermediate" },
        { value: "advanced", label: useArabic ? "مرحلة التأهيل لسوق العمل" : "Advanced" }
    ];

    // Create grouped options
    const options = [
        // {
        //   label: useArabic ? "نوع الدورة" : "Course Type",
        //   options: [
        //     { label: useArabic ? "مجاني" : "Free", value: "free|all|all" },
        //     { label: useArabic ? "مدفوع" : "Paid", value: "paid|all|all" },
        //   ],
        // },
        {
            label: useArabic ? "مستويات الدورة" : "Course Levels",
            options: [
                ...courseLevels.map(level => ({
                    label: level.label,
                    value: `all|all|${level.value}`,
                })),
            ],
        },
        {
            label: useArabic ? "فئات الدورة" : "Course Categories",
            options: [
                ...categories.map(category => ({
                    label: useArabic ? category.titleAr : category.titleEn,
                    value: `all|${category.categoryId}|all`,
                })),
            ],
        },
        {
            label: useArabic ? "الكل" : "All",
            value: "all",
        },

    ];

    return (
        <div className="wrapper_select">
            <Select
                value={currentValue}
                style={{ width: 200 }}
                onChange={handleChange}
                options={options}
                placeholder={useArabic ? "تصفية الدورات" : "Filter Courses"}
                dropdownMatchSelectWidth={false}
            />
        </div>
    );
}