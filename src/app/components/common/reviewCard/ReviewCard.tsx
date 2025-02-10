import generalActivePopup from "@/app/store/ActivePopup";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoPlay } from "react-icons/io5";

export default function ReviewCard({ item }: any) {
    const { openPopup, isActivePopup, setExtraData } = generalActivePopup();
    const [thumbnailUrl, setThumbnailUrl] = useState<string>(
        "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?t=st=1738164227~exp=1738167827~hmac=97ea755fd512e0e56f02c53ae5ac973ac30880ca2f54ca863bde3d0065f50886&w=740",
    );

    useEffect(() => {
        if (item.video) {
            // تحسين استخراج ID الفيديو لدعم المزيد من روابط YouTube
            const videoIdMatch = item.video.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([0-9A-Za-z_-]{11})/);
            const videoId = videoIdMatch ? videoIdMatch[1] : "";

            if (videoId) {
                setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
            } else {
                setThumbnailUrl("/default-thumbnail.jpg"); // صورة افتراضية عند الفشل
            }
        }
    }, [item.video]);

    return (
        <div className="review_card">
            {item.comment ? (
                <p className="p1 review_card_comment">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo pariatur similique doloremque assumenda odio voluptates ducimus!</p>
            ) : (
                <div className="review_card_video">
                    <div className="review_card_video_overlay">
                        <div
                            className="review_card_video_overlay_icon"
                            onClick={() => {
                                openPopup();
                                setExtraData({ videoUrl: item.video });
                            }}>
                            <IoPlay />
                        </div>
                    </div>
                    {/* ✅ تحسين الأداء باستخدام `next/image` */}
                    <Image
                        src={thumbnailUrl}
                        alt="Video Thumbnail"
                        width={400} // يمكن تغييره حسب الحاجة
                        height={225}
                        className="w-full h-auto rounded-lg"
                        priority // لتحميل الصورة بشكل أسرع
                        unoptimized
                    />
                </div>
            )}
            {item.comment && (
                <div className="review_card_client">
                    <div className="review_card_client_image">
                        <Image
                            src="https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?t=st=1738164227~exp=1738167827~hmac=97ea755fd512e0e56f02c53ae5ac973ac30880ca2f54ca863bde3d0065f50886&w=740"
                            alt="review_card_client_image"
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                    </div>
                    <div className="review_card_client_content">
                        <h4>John Doe</h4>
                        <p className="p1">Software Engineer</p>
                    </div>
                </div>
            )}
        </div>
    );
}
