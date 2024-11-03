import React, { useCallback, useState } from "react";
import YouTube from "react-youtube";

const YouTubePlayer = ({ node, handleIsWatched, handleIsVideoEnd }) => {
  const [player, setPlayer] = useState(null);
  const [hasReached80, setHasReached80] = useState(false);

  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };

  // const YoutubeParser = (url = "") => {
  //   var regExp =
  //     /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.\&)?vi?=|\&vi?=|\?(?:.\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
  //   var match = url?.match(regExp);
  //   return match && match[1]?.length == 11 ? match[1] : false;
  // };

  const YoutubeParser = (url = "") => {
    const regExp =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const onStateChange = useCallback(
    async (event) => {
      if (player) {
        const duration = player.getDuration();
        const currentTime = player.getCurrentTime();
        if (!hasReached80 && currentTime / duration >= 0.8) {
          setHasReached80(true);
          console.log("Video has reached 80% of the viewership.");
          await handleIsWatched();
        }
      }
    },
    [player, hasReached80]
  );

  return (
    <YouTube
      onEnd={handleIsVideoEnd}
      style={{ width: "100%", height: "100%" }}
      videoId={YoutubeParser(node?.path)}
      opts={opts}
      onReady={onReady}
      onStateChange={onStateChange}
    />
  );
};

export default YouTubePlayer;
