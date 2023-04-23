import { useMemo, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { manageCharacter } from "../../features/cms/cmsSlice";
import TextEditor from "../helpers/textEditor";

function ChrManager({ data, modalControl }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: data ? data.ID : "",
    name: data ? data.Name : "",
    body: data ? data.Body : "",
    alt: data ? (data.Alt ? data.Alt : "") : "",
    imageurl: data ? (data.ImageURL ? data.ImageURL : "") : "",
  });

  const { cats } = useSelector((state) => state.cms);
  const [cat, setCats] = useState(data ? data.Category : "");
  const [selection, SetSelection] = useState(false);
  const catOptions = useMemo(() => cats.filter((i) => i.ParentID !== null), []);
  const { name, body, alt, imageurl } = formData;

  const onCatChange = (value) => {
    setCats(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const reqData = {
      id: data ? data.ID : null,
      name,
      body,
      category: cat,
      alt,
      imageurl,
    };
    if (name != "" && body != "" && cat != "") {
      dispatch(manageCharacter(reqData));
      modalControl(false);
    } else {
      modalControl(false);
      toast.error("Please fill all the necessary properties.");
    }
  };

  const handleTextSelection = (e) => {
    let text = window.getSelection().toString();
    if (text) {
      SetSelection(text);
    } else {
      SetSelection(null);
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-overlay"></div>
      <div className="modal-content">
        <section className="heading">
          <h1>Manage Character</h1>
          <FaTimes
            onClick={() => {
              modalControl(false);
            }}
          />
        </section>
        <section>
          <form className="v-items r-gap-10" onSubmit={onSubmit}>
            <label>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="enter character name"
              className="main-border"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <label>Category</label>
            <Select
              className="select"
              id="cats"
              name="cats"
              placeholder={"select category"}
              options={catOptions}
              getOptionLabel={(options) => options["Name"]}
              getOptionValue={(options) => options["ID"]}
              value={cat ? cat : data ? data.Category : ""}
              onChange={onCatChange}
            />
            <label>Alt. information</label>
            <input
              type="text"
              id="alt"
              name="alt"
              value={alt}
              placeholder="enter alt information"
              className="main-border"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <label>Image Address</label>
            <input
              type="text"
              id="imageurl"
              name="imageurl"
              value={imageurl}
              placeholder="enter image url"
              className="main-border"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <TextEditor
              body={body}
              selection={selection}
              SetSelection={SetSelection}
              setFormData={setFormData}
            />
            <label>Summary</label>
            <textarea
              type="text"
              id="body"
              name="body"
              value={body}
              placeholder="enter the summary"
              className="main-border"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
              onMouseUp={(e) => handleTextSelection(e)}
            />
            <div className="functions">
              <button type="submit" className="btn-function">
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default ChrManager;
