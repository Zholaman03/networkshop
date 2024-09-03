import React, { useState } from "react";

const LongText = ({desc}) => {
  // Мәтінді көрсету күйін сақтау үшін useState қолданамыз
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Мәтінді көрсету/жасыру батырмасын басқан кезде шақырылатын функция
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Ұзын мәтіннің мысалы
  const fullText = desc;

  // Көрсетілетін мәтіннің қысқа бөлігі
  const shortText = fullText.slice(0, 400); // 100 символ ғана көрсетеміз

  return (
    <div className="text-body-secondary">
      <p>
        {isExpanded ? fullText : shortText} {/* Толық немесе қысқа мәтінді көрсету */}
        {!isExpanded && fullText.length > 400 && "..." /* Мәтін аяқталған жерден ... көрсету */}
        {fullText.length > 400 &&(
            <span
            onClick={toggleExpand}
            className="link-primary"
            style={{
              cursor: "pointer",
            }}
          >
            {isExpanded ? " Скрыть" : " Показать"}
          </span>
        )}
      
      </p>
    </div>
  );
};

export default LongText;
