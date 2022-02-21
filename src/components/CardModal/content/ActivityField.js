import _ from "lodash";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CommentForm from "./CommentForm";

const ActivityField = ({ card, handleSave }) => {
  return (
    <div className="activity">
      <div className="title">
        <ion-icon className="icon" name="list-outline" />
        <div className="main">
          <p className="name">Actvity</p>
        </div>
        <button className="text_button edit">Show details</button>
      </div>
      <div className="content">
        <div className="text_field">
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
                <div className="info">
                  <header>
                    <p className="sender">JorisK</p>
                    <p className="time">- {activity.sentAt}</p>
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
