"use client";
import { useState } from "react";

const useModal = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return { isVideoOpen, setIsVideoOpen };
};

export default useModal;
