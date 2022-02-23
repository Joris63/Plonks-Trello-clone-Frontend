import _ from "lodash";
import React from "react";
import CommentForm from "./CommentForm";

const ActivityField = ({ card, handleSave }) => {
  return (
    <div className="activity">
      <div className="card_detail_title_wrapper">
        <ion-icon className="icon" name="list-outline" />
        <div className="card_detail_title">
          <p className="detail_title">Actvity</p>
        </div>
        <button className="text_button detail_title_action">Show details</button>
      </div>
      <div className="card_detail_content">
        <div className="add_comment_wrapper">
          <img
            src="https://i.pinimg.com/originals/2f/fa/e6/2ffae67cccf7d31c352649d8a3d0810c.jpg"
            alt="Profile"
          />
          <CommentForm card={card} onSave={handleSave} />
        </div>
        <ul className="activity_list">
          {_.sortBy(card?.activity, ["sentAt"]).map((activity) =>
            activity.type === "comment" ? (
              <li key={`activity-${activity.id}`} className="comment">
                <img
                  src="https://i.pinimg.com/originals/2f/fa/e6/2ffae67cccf7d31c352649d8a3d0810c.jpg"
                  alt="Profile"
                />
                <div className="comment_info">
                  <header className="comment_header">
                    <p className="comment_sender">JorisK</p>
                    <p className="comment_date">- {activity.sentAt}</p>
                  </header>
                  <CommentForm
                    comment={activity}
                    card={card}
                    onSave={handleSave}
                  />
                </div>
              </li>
            ) : (
              <li key={`activity-${activity.id}`} className="event">
                <img
                  src="https://i.pinimg.com/originals/2f/fa/e6/2ffae67cccf7d31c352649d8a3d0810c.jpg"
                  alt="Profile"
                />
                <div className="event_info">
                  <p className="event_history">
                    <b>JorisK</b> {activity.message}
                  </p>
                  <p className="event_date">{activity.time}</p>
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
