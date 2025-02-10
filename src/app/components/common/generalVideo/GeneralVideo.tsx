import { IGeneralVideo } from "@/app/types/Types";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ReactPlayer = dynamic(() => import("react-player"), {
    ssr: false,
    loading: () => <div>Loading video...</div>,
});

const GeneralVideo: React.FC<IGeneralVideo> = ({ videoLink, controls }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        if (!videoLink) return;

        const debounce = (func: (...args: any[]) => void, delay: number): (() => void) => {
            let timer: NodeJS.Timeout;
            return (...args: any[]) => {
                clearTimeout(timer);
                timer = setTimeout(() => func(...args), delay);
            };
        };

        const handleScroll = debounce(() => {
            const element = document.getElementById("video-player");
            if (element && element.getBoundingClientRect().top < window.innerHeight) {
                setIsVisible(true);
            }
        }, 100);

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [videoLink]);

    if (!videoLink) return null;

    return (
        <div id="video-player" className="general_video">
            {isVisible && (
                <ReactPlayer
                    url={videoLink}
                    controls={controls}
                    width={"100%"}
                    height={"100%"}
                    config={{
                        youtube: {
                            playerVars: {
                                modestbranding: 1,
                                rel: 0,
                                showinfo: 0,
                                iv_load_policy: 3, // Removes annotations
                                disablekb: 1,
                            },
                        },
                    }}
                />
            )}
        </div>
    );
};

export default GeneralVideo;
