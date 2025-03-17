
import React, { useCallback, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { UseMutationResult } from "@tanstack/react-query";
import { postServerRequest } from "@/app/utils/generalServerRequest";
import GeneralToaster from "../generalToaster/GeneralToaster";
// import GeneralToaster from "../common/generalToaster/GeneralToaster";


interface AddCommentProps {
  videoCommentsMutation: any;
  nodeId: string;
}

export default function AddComment({ videoCommentsMutation, nodeId }: AddCommentProps) {
  const [review, setReview] = useState("");

  const handleSubmit = useCallback(async () => {
    if (!review.trim()) {
      alert("Please enter a comment before submitting.");
      return;
    }
    // const watched = localStorage.getItem("watchedPercentage");
    let watchedDuration = "00:00:00"; // Default value

    try {
      const storedData = localStorage.getItem("watchedPercentage");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (typeof parsedData?.duration === "number" && !isNaN(parsedData.duration)) {
          const totalSeconds = parsedData.duration;

          // Convert to HH:MM:SS format
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;

          watchedDuration = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        }
      }
    } catch (error) {
      console.error("Error parsing watchedPercentage:", error);
    }


    try {
      const coursedata = {
        message: review,
        videoMinute: watchedDuration,
        videoId: nodeId
      }
      console.log(coursedata)
      const response = await postServerRequest("/VideoComment/add", {
        message: review,
        videoMinute: watchedDuration,
        videoId: nodeId,
      });
      // https://itlegend.net/Endpoint/api/MemberNode/fa6d7061-be3a-4242-9471-8342fd403332/view

      if (response?.status !== 200) {
        GeneralToaster("Failed to submit comment", "fail");
        throw new Error("Failed to submit comment");
      }

      GeneralToaster("Comment submitted successfully!", "success");

      setReview(""); // Clear the textarea
      videoCommentsMutation.mutate(nodeId); // Refresh comments
    } catch (error) {
      console.error("Error submitting comment:", error);
      GeneralToaster("Something went wrong. Please try again.", "error");
    }
  }, [review, nodeId, videoCommentsMutation]);

  return (
    <div className="review-container">
      {/* <h2>Write a Review</h2> */}
      <div className="textarea-container">
        <textarea
          placeholder="Add Comment"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          maxLength={600}
        />
      </div>
      <div className="submit-button">
        <button onClick={handleSubmit}>
          <p>ارسال </p>  <FaLongArrowAltLeft className="arrow" />
        </button>
      </div>
    </div>
  );
};

