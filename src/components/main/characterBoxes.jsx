import { useState } from "react";
import { useDispatch } from "react-redux";
import ChrManager from "../cms/chrManager";

function CharacterBoxes({ data, isCMS }) {
  const dispatch = useDispatch();
  const [selectedItem, setItem] = useState(null);
  const [chrModal, setChrModal] = useState(false);

  const onEdit = (item) => {
    setItem(item);
    setChrModal(true);
  };

  const handleClick = (item) => {
    setItem(item);
  };

  const getConfirm = (item) => {
    setItem(item);
    setChrModal(true);
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
          <li key={index} className={`main-border`}>
            <div className="info">
              <h4>{item.Name}</h4>
            </div>
            {item.Images.length > 0 ? (
              <div className="preview">
                <img src={item.Images[0].ImageURL} />
              </div>
            ) : (
              <div className="info">
                <h5>
                  <span>of</span>
                  <br /> {item.Category.Name}
                </h5>
              </div>
            )}
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
      {chrModal ? (
        <ChrManager modalControl={setChrModal} data={selectedItem} />
      ) : (
        ""
      )}
    </>
  );
}

export default CharacterBoxes;
