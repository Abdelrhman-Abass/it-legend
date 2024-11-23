import { Link } from "@/navigation";

const ProfileIcon = () => {

    return (
        <div className="edublink-header-mini-profile">
            <div className="wrapper">
                <ul className={`items cart-height`}>
                    <li className="each-item">
                            <div className="content">
                                <h5 className="title flex gap-4 justify-center items-center ">
                                    {/* <Link href={`/course-details`}> */}
                                    Profile
                                    <i className="icon-4"></i>
                                    {/* </Link> */}
                                </h5>
                            </div>

                    </li>
                    
                </ul>

            </div>
        </div>
    );
};

export default ProfileIcon;
