import { useState } from "react";
import { useDispatch } from "react-redux";
import CatManager from "../cms/catManager";

function CatBoxes({ data }) {
  const dispatch = useDispatch();
  const [selectedItem, setItem] = useState(null);
  const [catModal, setCatModal] = useState(false);

  const onEdit = (item) => {
    setItem(item);
    setCatModal(true);
  };

  const getConfirm = (item) => {
    setItem(item);
    setCatModal(true);
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
            {item.ImageURL ? (
              <div className="preview">
                <img src={item.ImageURL} />
              </div>
            ) : (
              ""
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
      {catModal ? (
        <CatManager modalControl={setCatModal} data={selectedItem} />
      ) : (
        ""
      )}
    </>
  );
}

export default CatBoxes;
