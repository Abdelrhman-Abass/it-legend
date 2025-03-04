// import React from 'react'

// export default function AddComment() {
//   return (
//       <div className='add_comment'>
//           <h3>Add Comment</h3>
//     </div>
//   )
// }


import React, { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";

export default function AddComment() {
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    if (review.trim() !== "") {
      alert("Review Submitted!");
      setReview(""); // Clear the textarea after submission
    } else {
      alert("Please enter a review before submitting.");
    }
  };

  return (
    <div className="review-container">
      {/* <h2>Write a Review</h2> */}
      <div className="textarea-container">
        <textarea
          placeholder="Add Comment"
          value={review}
          onChange={(e) => setReview(e.target.value)}
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

