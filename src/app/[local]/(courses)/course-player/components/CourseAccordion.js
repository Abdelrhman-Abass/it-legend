import React from "react";
import CourseModules from "./CourseModules";

const CourseAccordion = ({
  nodes = [],
  stoppedIndex = 0,
  moduleId: currentModules,
  data = [],
  moduleIdtest,
}) => {
  // const currentModulesUserNotSolveIt = nodes.find(({ nodes }) =>
  //   nodes.some(
  //     ({ type, isRequiredExam, isPassedExam }) =>
  //       type == 1 && isRequiredExam && !isPassedExam
  //   )
  // );

  // const currentExam = currentModulesUserNotSolveIt?.nodes.find(({ type }) => {
  //   return type == 1;
  // });

  // const updatedNodes = nodes.map((module) => {
  //   const shouldDisable =
  //     currentModulesUserNotSolveIt?.moduleOrder != undefined &&
  //     module.moduleOrder > currentModulesUserNotSolveIt?.moduleOrder;

  //   return {
  //     ...module,
  //     nodes: module.nodes.map((node) => ({
  //       ...node,
  //       disable: shouldDisable,
  //     })),
  //   };
  // });
  {data.map((item, index) => (
    <div key={index}>
      <h3>{item.titleAr}</h3>
      <p>{item.contentId}</p>
    </div>
  ))}
  // console.log("from accordion : " + data)
  return (
    <div className="accordion edu-accordion" id="accordionExample">
      {/* {updatedNodes?.map(({ titleEn, titleAr, moduleId, nodes }) => {
        return (
          <>
          <CourseModules
            key={moduleId}
            id={moduleId}
            show={currentModules == moduleId}
            titleAr={titleAr}
            titleEn={titleEn}
            modules={nodes}
            stoppedIndex={stoppedIndex}
            currentExam={currentExam}
          />
          <div>{
            data.map((cour, idx)=>(
              <p>{cour.nodeId}</p>
            ))
            }</div>
          </>
        );
      })} */}

      {/* <div>{
        // data.map((cour, idx) => (
        //   <p>{cour.nodeId}</p>
        // ))
      }</div> */}
    </div>
  );
};

export default CourseAccordion;
