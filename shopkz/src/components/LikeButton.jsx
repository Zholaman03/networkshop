
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  const isLiked = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <>
      
      <FontAwesomeIcon onClick={isLiked} icon={liked ? faHeartSolid : faHeart}style={{ color: 'red', fontSize: '25px', cursor:'pointer' }}/>
    </>
  );
};

export default LikeButton;
