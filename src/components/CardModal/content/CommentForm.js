import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CommentForm = ({ comment, card, onSave }) => {
  const [active, setActive] = useState(false);
  const [text, setText] = useState(comment?.message || "");
  const [height, setHeight] = useState(105);

  const open = comment ? active : active || text !== "";

  function ResizeTextArea(e) {
    const textarea = e.target;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight + 30}px`;

    setHeight(textarea.scrollHeight);
  }

  const handleCommentBox = (e) => {
    const commentForm = document.getElementById(
      `comment-form${comment ? `-${comment.id}` : ""}`
    );
    const textarea = document.getElementById(
      `comment-textarea${comment ? `-${comment.id}` : ""}`
    );
    const status =
      commentForm?.contains(document.activeElement) ||
      textarea === document.activeElement ||
      (commentForm?.contains(e.target) && e.type === "click");

    setActive(status);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (text !== "" && !e.shiftKey) {
        document
          .getElementById(`comment-textarea${comment ? `-${comment.id}` : ""}`)
          .blur();
        handleSave();
      }
    }
  };

  const handleSave = () => {
    const { activity = [] } = card;

    if (!comment) {
      const date = new Date();

      activity.push({
        id: uuidv4(),
        card_id: card.id,
        sender_id: "870c716b-0acb-43f9-ab9d-2c59b3e1deb7",
        message: text,
        type: "comment",
        sentAt: date.getTime(),
      });

      setText("");
    } else {
      const commentIndex = activity?.findIndex(
        (item) => item.id === comment?.id
      );

      activity.splice(commentIndex, 1, {
        ...comment,
        message: text,
      });
    }

    setActive(false);
    onSave({ ...card, activity });
  };

  const handleDelete = (id) => {
    const { activity = [] } = card;
    const commentIndex = activity?.findIndex((item) => item.id === id);

    activity.splice(commentIndex, 1);

    onSave({ ...card, activity });
  };

  useEffect(() => {
    document.removeEventListener("click", handleCommentBox);

    if (active) {
      document.addEventListener("click", handleCommentBox);
    }

    return () => {
      document.removeEventListener("click", handleCommentBox);
    };
  }, [active]);

  return (
    <>
      <div
        style={{
          height: !open ? 40 : height + 5,
          transition: text === "" ? "all 0.225s ease" : "",
        }}
        className="comment_form"
        id={`comment-form${comment ? `-${comment.id}` : ""}`}
      >
        <textarea
          readOnly={comment && !active}
          id={`comment-textarea${comment ? `-${comment.id}` : ""}`}
          placeholder="Write a comment..."
          style={{ height: !open ? 20 : height - 16 }}
          value={text}
          onInput={ResizeTextArea}
          onKeyDown={handleKeyPress}
          onChange={(e) => setText(e.target.value)}
          onFocus={handleCommentBox}
        />
        {open && (
          <div className="actions animate__animated animate__fadeIn animate__slow">
            <button
              className="text_button save"
              disabled={text === ""}
              onClick={handleSave}
            >
              {comment ? "Save" : "Send"}
            </button>
            <div className="comment_options">
              <button className="option">
                <ion-icon name="at-outline" />
              </button>
              <button
                className="option"
                onFocus={handleCommentBox}
                onBlur={handleCommentBox}
              >
                <ion-icon name="happy-outline" />
              </button>
            </div>
          </div>
        )}
      </div>
      {comment && !active && (
        <div className="comment_actions">
          <button onClick={() => setActive(true)}>Edit</button>
          <span>-</span>
          <button onClick={() => handleDelete(comment.id)}>Delete</button>
        </div>
      )}
    </>
  );
};

export default CommentForm;
