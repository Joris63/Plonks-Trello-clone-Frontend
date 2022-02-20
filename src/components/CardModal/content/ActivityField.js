import _ from "lodash";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ActivityField = ({ card, handleSave }) => {
  const [active, setActive] = useState(false);
  const [comment, setComment] = useState("");
  const [height, setHeight] = useState(105);

  const handleCommentBox = (e) => {
    const commentForm = document.getElementById("comment-form");
    const textarea = document.getElementById("comment-textarea");
    const status =
      commentForm?.contains(document.activeElement) ||
      textarea === document.activeElement ||
      (commentForm?.contains(e.target) && e.type === "click");

    setActive(status);
  };

  function ResizeTextArea(e) {
    const textarea = e.target;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight + 30}px`;

    setHeight(textarea.scrollHeight);
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (comment !== "" && !e.shiftKey) {
        document.getElementById("comment-textarea").blur();
        handleSend();
      }
    }
  };

  const handleSend = () => {
    const { activity = [] } = card;
    const date = new Date();

    activity.push({
      id: uuidv4(),
      card_id: card.id,
      sender_id: "870c716b-0acb-43f9-ab9d-2c59b3e1deb7",
      message: comment,
      type: "comment",
      sentAt: date.getTime(),
    });

    setComment("");
    setActive(false);
    handleSave({ ...card, activity });
  };

  const handleEdit = () => {};

  const handleDelete = (id) => {
    const { activity = [] } = card;
    const commentIndex = activity?.findIndex((item) => item.id === id);

    activity.splice(commentIndex, 1);

    handleSave({ ...card, activity });
  };

  useEffect(() => {
    document.addEventListener("click", handleCommentBox);

    return () => {
      document.removeEventListener("click", handleCommentBox);
    };
  }, []);

  return (
    <div className="activity">
      <div className="title">
        <ion-icon className="icon" name="list-outline" />
        <div className="main">
          <p className="name">Actvity</p>
        </div>
        <button
          className="text_button edit"
          onFocus={handleCommentBox}
          onBlur={handleCommentBox}
        >
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
              style={{ height: !active && comment === "" ? 20 : height - 16 }}
              value={comment}
              onInput={ResizeTextArea}
              onKeyDown={handleKeyPress}
              onChange={(e) => setComment(e.target.value)}
              onFocus={handleCommentBox}
            />
            {(active || comment !== "") && (
              <div className="actions animate__animated animate__fadeIn animate__slow">
                <button
                  className="text_button save"
                  disabled={comment === ""}
                  onClick={handleSend}
                >
                  Send
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
        </div>
        <ul className="activity_list">
          {_.sortBy(card?.activity, ["sentAt"]).map((activity) =>
            activity.type === "comment" ? (
              <li key={`activity-${activity.id}`} className="comment">
                <img
                  src="https://i.pinimg.com/originals/2f/fa/e6/2ffae67cccf7d31c352649d8a3d0810c.jpg"
                  alt="Profile"
                />
                <div className="info">
                  <header>
                    <p className="sender">JorisK</p>
                    <p className="time">- {activity.sentAt}</p>
                  </header>
                  <div className="message">
                    <textarea readOnly value={activity.message} />
                    <div className="actions">
                      <button>Edit</button>
                      <span>-</span>
                      <button onClick={() => handleDelete(activity.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ) : (
              <li key={`activity-${activity.id}`} className="event">
                <img
                  src="https://i.pinimg.com/originals/2f/fa/e6/2ffae67cccf7d31c352649d8a3d0810c.jpg"
                  alt="Profile"
                />
                <div className="info">
                  <p className="history">
                    <b>JorisK</b> {activity.message}
                  </p>
                  <p className="time">{activity.time}</p>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default ActivityField;
