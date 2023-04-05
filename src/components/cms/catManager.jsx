import { useMemo, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { manageCategory } from "../../features/cms/cmsSlice";

function CatManager({ data, modalControl }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: data ? data.ID : "",
    name: data ? data.Name : "",
  });

  const { cats } = useSelector((state) => state.cms);
  const [cat, setCats] = useState(data ? data.ParentID : "");
  const catOptions = useMemo(() => cats, []);
  const { name } = formData;

  const onCatChange = (value) => {
    setCats(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const reqData = {
      id: data ? data.ID : null,
      name,
      parentid: cat ? cat.ID : null,
    };
    if (name != "") {
      dispatch(manageCategory(reqData));
      modalControl(false);
    } else {
      modalControl(false);
      toast.error("Please fill all the necessary properties.");
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-overlay"></div>
      <div className="modal-content">
        <section className="heading">
          <h1>Manage Category</h1>
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
              placeholder="enter a category name"
              className="main-border"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <label>Parent Category</label>
            <Select
              className="select"
              id="cats"
              name="cats"
              placeholder={"select category"}
              options={catOptions}
              getOptionLabel={(options) => options["Name"]}
              getOptionValue={(options) => options["ID"]}
              value={cat ? catOptions.find((o) => o.ID === cat) : ""}
              onChange={onCatChange}
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

export default CatManager;
