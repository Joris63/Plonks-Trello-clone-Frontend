import React, { useEffect, useState } from "react";

const ActivityField = ({ card }) => {
  const [active, setActive] = useState(false);
  const [comment, setComment] = useState("");
  const [height, setHeight] = useState(105);

  useEffect(() => {
    document.addEventListener("click", handleCommentBox);

    return () => {
      document.removeEventListener("click", handleCommentBox);
    };
  }, []);

  const handleCommentBox = (e) => {
    const commentForm = document.getElementById("comment-form");
    const textarea = document.getElementById("comment-textarea");
    const status =
      commentForm?.contains(document.activeElement) ||
      textarea === document.activeElement ||
      commentForm?.contains(e.target);

    setActive(status);
  };

  function ResizeTextArea(e) {
    const textarea = e.target;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight + 30}px`;

    setHeight(textarea.scrollHeight);
  }

  return (
    <div className="activity">
      <div className="title">
        <ion-icon className="icon" name="list-outline" />
        <div className="main">
          <p className="name">Actvity</p>
        </div>
        <button className="text_button edit" onFocus={handleCommentBox}>
          Show details
        </button>
      </div>
      <div className="content">
        <div
          className="text_field"
          style={{
            height: !active && comment === "" ? 40 : height + 21,
          }}
        >
          <img
            src="https://i.pinimg.com/originals/2f/fa/e6/2ffae67cccf7d31c352649d8a3d0810c.jpg"
            alt="Profile"
          />
          <div className="comment_form" id="comment-form">
            <textarea
              id="comment-textarea"
              placeholder="Write a comment..."
              style={{ height: height - 16 }}
              value={comment}
              onInput={(e) => ResizeTextArea(e)}
              onChange={(e) => setComment(e.target.value)}
              onFocus={handleCommentBox}
            />
            {active && (
              <div className="actions">
                <button className="text_button save" disabled={comment === ""}>
                  Save
                </button>
                <div className="comment_options">
                  <button className="option">
                    <ion-icon name="at-outline" />
                  </button>
                  <button className="option">
                    <ion-icon name="happy-outline" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <ul className="comments_list"></ul>
      </div>
    </div>
  );
};

export default ActivityField;
