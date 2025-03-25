import React from "react";

export default function TestPubliyo({ videoPath }: any) {
    return (
        <div>
            <div style={{ left: "0", width: "100%", height: "0", position: "relative", paddingBottom: "55.29%" }}>
                <figure
                    style={{
                        left: "0",
                        width: "100%",
                        height: "0",
                        position: "relative",
                        paddingBottom: "55.29%",
                        marginBlockEnd: "0",
                        marginBlockStart: "0",
                        marginInlineStart: "0",
                        marginInlineEnd: "0",
                    }}>
                    <iframe
                        id="pv_NeR5g5Te"
                        src={videoPath}
                        scrolling="no"
                        style={{ border: "0", top: "0", left: "0", width: "100%", height: "100%", position: "absolute", overflow: "hidden" }}
                        allowFullScreen={true}
                        // ref={playerRef}
                        // onLoad={() => {
                        //     // Send a message to the iframe to listen for the video end event
                        //     const iframe = document.getElementById("pv_NeR5g5Te") as any;
                        //     if (iframe) {
                        //         iframe.contentWindow.postMessage("listenForVideoEnd", "*");
                        //         iframe.contentWindow.postMessage("listenForVideoProgress", "*");
                        //     }
                        // }}
                    />
                </figure>
            </div>
        </div>
    );
}