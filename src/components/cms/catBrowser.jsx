import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../features/cms/cmsSlice";
import Search from "../helpers/search";
import CatBoxes from "../main/catBoxes";
import CatManager from "./catManager";

function CatBrowser({ filteredData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState(0);
  const [filter, setFilterModel] = useState(null);
  const [catModal, setCatModal] = useState(false);
  const { cats } = useSelector((state) => state.cms);

  useEffect(() => {
    if (!cats) {
      dispatch(getCategories());
    }
  }, [cats]);

  const setFilter = (e, page, filter) => {
    dispatch(getCategories());
  };

  return (
    <>
      <div className="h-items form-gap c-gap-10">
        <div className="v-items sidebar">
          {filteredData && filteredData.filterModel ? (
            <Search
              setFilter={setFilter}
              setCategory={setCategory}
              setKeyword={setKeyword}
              keyword={keyword}
              category={category}
            />
          ) : (
            ""
          )}
        </div>
        <div className="h-items single c-gap-10 r-gap-10">
          <ul className="h-list c-gap-10 f-end">
            <li>
              <button
                type="button"
                className="btn-function"
                onClick={() => {
                  navigate("/");
                }}
              >
                Back
              </button>
            </li>
            <li>
              <button
                type="button"
                className="btn-function"
                onClick={() => {
                  setCatModal(true);
                }}
              >
                Add Category
              </button>
            </li>
          </ul>
          {filteredData ? (
            <>
              {/* <span className="f-end">
                {filteredData.filter.Keyword
                  ? filteredData.totalItems > 0
                    ? `Found ${filteredData.totalItems} items for "${filteredData.filter.Keyword}"`
                    : `No matching results found for "${keyword}"`
                  : `Found ${filteredData.totalItems} items`}
              </span>
              <Pager
                data={filteredData}
                setFilter={setFilter}
                filterModel={filter}
              /> */}
              <CatBoxes data={filteredData} />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      {catModal ? <CatManager modalControl={setCatModal} /> : ""}
    </>
  );
}

export default CatBrowser;
