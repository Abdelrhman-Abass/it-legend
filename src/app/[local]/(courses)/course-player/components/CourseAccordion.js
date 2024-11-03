import React from "react";
import CourseModules from "./CourseModules";

const CourseAccordion = ({
  nodes = [],
  stoppedIndex,
  moduleId: currentModules,
}) => {
  const currentModulesUserNotSolveIt = nodes.find(({ nodes }) =>
    nodes.some(
      ({ type, isRequiredExam, isPassedExam }) =>
        type == 1 && isRequiredExam && !isPassedExam
    )
  );

  const currentExam = currentModulesUserNotSolveIt?.nodes.find(({ type }) => {
    return type == 1;
  });

  const updatedNodes = nodes.map((module) => {
    const shouldDisable =
      currentModulesUserNotSolveIt?.moduleOrder != undefined &&
      module.moduleOrder > currentModulesUserNotSolveIt?.moduleOrder;

    return {
      ...module,
      nodes: module.nodes.map((node) => ({
        ...node,
        disable: shouldDisable,
      })),
    };
  });

  return (
    <div className="accordion edu-accordion" id="accordionExample">
      {updatedNodes?.map(({ titleEn, titleAr, moduleId, nodes }) => {
        return (
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
        );
      })}
    </div>
  );
};

export default CourseAccordion;
