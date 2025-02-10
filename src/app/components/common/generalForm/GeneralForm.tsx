import { IGeneralFormik } from "@/app/types/Types";
import { Formik, Form } from "formik";
import React from "react";

export default function GeneralForm({ initialValues, validationSchema, onSubmit, children }: IGeneralFormik) {
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({}) => <Form>{children}</Form>}
        </Formik>
    );
}
