import { Link } from "@/navigation";

const ProfileIcon = () => {

    return (
        <div className="edublink-header-mini-cart">
            <div className="wrapper">
                <ul className={`items cart-height`}>
                    <li className="each-item">
                        <div
                            style={{ display: "flex", alignItems: "flex-start", gap: 6 }}
                        >
                            <div className="content">
                                <h5 className="title">
                                    {/* <Link href={`/course-details`}> */}
                                    Profile
                                    {/* </Link> */}
                                </h5>
                            </div>
                        </div>

                    </li>
                </ul>

            </div>
        </div>
    );
};

export default ProfileIcon;
