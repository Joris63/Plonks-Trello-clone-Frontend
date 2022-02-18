import _ from "lodash";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import "animate.css";
import CardModalContent from "./content";

const CardModal = ({ card, handleCardEdit, handleClose }) => {
  return (
    <Modal
      title={card?.content}
      subtitle={
        <>
          in list <u>{card?.list_name}</u>
        </>
      }
      open={card && card?.modal}
      onClose={handleClose}
    >
      <CardModalContent card={card} handleSave={handleCardEdit} />
    </Modal>
  );
};

export default CardModal;
