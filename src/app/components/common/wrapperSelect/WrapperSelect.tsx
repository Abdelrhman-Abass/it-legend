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

"use client";
import React from "react";
import { Select, Space } from "antd";

export default function WrapperSelect({ setFilter }: { setFilter?: (value: string) => void }) {
    const handleChange = (value: string) => {
        // Call the setFilter function with the selected value
        if(setFilter){
            setFilter(value);
        }
    };

    return (
        <div className="wrapper_select">
            <Space wrap>
                <Select
                    defaultValue="all" // Set the default value to "All"
                    style={{ width: 150 }} // Adjust the width as needed
                    onChange={handleChange} // Pass the handleChange function
                    options={[
                        { value: "all", label: "All" },
                        { value: "free", label: "Free" },
                        { value: "paid", label: "Paid" },
                    ]}
                />
            </Space>
        </div>
    );
}