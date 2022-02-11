import { divide } from "lodash";
import React, { useCallback, useEffect, useState } from "react";

const CardModal = ({
  open,
  card = {
    content: "Random title",
    list_name: "Vragen?",
  },
  handleClose,
}) => {
  const [cardEdit, setCardEdit] = useState({ ...card });
  const [comment, setComment] = useState("");
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState(125);

  const cardHasNoDescription =
    cardEdit?.description === "" || !cardEdit?.description;

  const handleClick = (e) => {
    setActive(
      document.getElementById("comment-textarea") === document.activeElement
    );
  };

  function ResizeTextArea(e, extraHeight = 0, changeHeight = false) {
    const textarea = e.target;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight + 10 + extraHeight}px`;

    if (changeHeight) {
      setHeight(textarea.scrollHeight);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="modal_overlay">
      <div className="modal">
        <div className="title">
          <ion-icon className="icon" name="card-outline" />
          <div className="main">
            <p className="name">{cardEdit?.content}</p>
            <p>
              in list <u>{cardEdit?.list_name}</u>
            </p>
          </div>
          <button className="cancel" onClick={() => handleClose()}>
            <ion-icon name="add-outline" />
          </button>
        </div>
        <div className="modal_content">
          <div className="left_side">
            <div className="description">
              <div className="title">
                <ion-icon className="icon" name="document-text-outline" />
                <div className="main">
                  <p className="name">Description</p>
                </div>
                {!cardHasNoDescription && !cardEdit.editable && (
                  <button
                    className="text_button edit"
                    onClick={() => setCardEdit({ ...cardEdit, editable: true })}
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="content">
                {cardHasNoDescription && !cardEdit.editable && (
                  <button
                    className="add_description"
                    onClick={() => setCardEdit({ ...cardEdit, editable: true })}
                  >
                    <p>Add a more detailed description...</p>
                  </button>
                )}
                {cardEdit.editable && (
                  <div className="description_form">
                    <textarea
                      placeholder="Add a more detailed description..."
                      value={cardEdit?.description}
                      onInput={(e) => ResizeTextArea(e)}
                      onChange={(e) =>
                        setCardEdit({
                          ...cardEdit,
                          description: e.target.value,
                        })
                      }
                    />
                    <div className="actions">
                      <button className="text_button save">Save</button>
                      <button
                        className="cancel"
                        onClick={() =>
                          setCardEdit({ ...cardEdit, editable: false })
                        }
                      >
                        <ion-icon name="add-outline" />
                      </button>
                    </div>
                  </div>
                )}
                {!cardEdit.editable && !cardHasNoDescription && (
                  <p className="description_container">{cardEdit.description}</p>
                )}
              </div>
            </div>
            <div className="activity">
              <div className="title">
                <ion-icon className="icon" name="list-outline" />
                <div className="main">
                  <p className="name">Actvity</p>
                </div>
                <button className="text_button edit">Show details</button>
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
                  <div className="comment_form">
                    <textarea
                      id="comment-textarea"
                      placeholder="Write a comment..."
                      style={{ height: height - 16 }}
                      value={comment}
                      onInput={(e) => ResizeTextArea(e, 40, true)}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="actions">
                      <button
                        className="text_button save"
                        disabled={comment === ""}
                      >
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
                  </div>
                </div>
                <ul className="comments_list"></ul>
              </div>
            </div>
          </div>
          <div className="right_side">
            <div className="module">
              <p className="module_title">Add to card</p>
              <ul className="module_list">
                <li className="module_action">
                  <button className="icon_text_button">
                    <ion-icon name="person-outline" />
                    <p>Members</p>
                  </button>
                </li>
                <li className="module_action">
                  <button className="icon_text_button">
                    <ion-icon name="pricetag-outline" />
                    <p>Labels</p>
                  </button>
                </li>
                <li className="module_action">
                  <button className="icon_text_button">
                    <ion-icon name="checkbox-outline" />
                    <p>Checkist</p>
                  </button>
                </li>
              </ul>
            </div>
            <div className="module">
              <p className="module_title">Actions</p>
              <ul className="module_list">
                <li className="module_action">
                  <button className="icon_text_button">
                    <ion-icon name="arrow-forward-outline" />
                    <p>Move</p>
                  </button>
                </li>
                <li className="module_action">
                  <button className="icon_text_button">
                    <ion-icon name="card-outline" />
                    <p>Make template</p>
                  </button>
                </li>
                <li>
                  <hr />
                </li>
                <li className="module_action">
                  <button className="icon_text_button">
                    <ion-icon name="archive-outline" />
                    <p>Archive</p>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
