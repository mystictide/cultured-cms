import { useState } from "react";
import { useDispatch } from "react-redux";
import BGManager from "./bgManager";

function BGBoxes({ data }) {
  const dispatch = useDispatch();
  const [selectedItem, setItem] = useState(null);
  const [bgModal, setBGModal] = useState(false);

  const onEdit = (item) => {
    setItem(item);
    setBGModal(true);
  };

  const getConfirm = (item) => {
    setItem(item);
    setBGModal(true);
  };

  //   const deleteListing = () => {
  //     const reqData = {
  //       id: selectedItem.ID,
  //     };
  //     dispatch(DeleteListing(reqData));
  //     setItem(null);
  //   };

  return (
    <>
      <ul className="h-list c-gap-10 r-gap-10 boxes">
        {data.map((item, index) => (
          <li key={index} className={`main-border main-box`}>
            <div className="preview">
              <img loading="lazy" src={item.ImageURL} />
            </div>
            <div className="functions c-gap-5">
              <button
                className="btn-function"
                onClick={() => {
                  onEdit(item);
                }}
              >
                Edit
              </button>
              <button
                className="btn-function"
                onClick={() => {
                  getConfirm(item);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {bgModal ? (
        <BGManager modalControl={setBGModal} data={selectedItem} />
      ) : (
        ""
      )}
    </>
  );
}

export default BGBoxes;
