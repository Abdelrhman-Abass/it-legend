import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { LuLoaderCircle } from "react-icons/lu";
import { RiLoader5Fill } from "react-icons/ri";
export default function Loader() {
    return (
        <div className={`loader`}>
            <RiLoader5Fill />
        </div>
    );
}
