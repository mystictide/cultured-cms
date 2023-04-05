import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterCharacters } from "../../features/cms/cmsSlice";
import Pager from "../helpers/pager";
import Search from "../helpers/search";
import CharacterBoxes from "../main/characterBoxes";
import CatManager from "./catManager";
import ChrManager from "./chrManager";

function CMSBrowser({ filteredData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState(0);
  const [filter, setFilterModel] = useState(null);
  const [catModal, setCatModal] = useState(false);
  const [chrModal, setChrModal] = useState(false);
  const { character } = useSelector((state) => state.cms);

  useEffect(() => {
    if (character) {
      const reqData = {
        handle: true,
        filter: { Keyword: keyword, page: 1, CategoryID: 0 },
      };
      dispatch(filterCharacters(reqData));
    }
  }, [character]);

  const setFilter = (e, page, filter) => {
    setFilterModel(filter);
    const reqData = {
      handle: true,
      filter: {
        Keyword: keyword,
        page: page,
        CategoryID: filter ? filter.category.ID : 0,
      },
    };
    dispatch(filterCharacters(reqData));
  };

  return (
    <>
      <div className="h-items form-gap c-gap-20">
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
                  setCatModal(true);
                }}
              >
                Add Category
              </button>
            </li>
            <li>
              <button
                type="button"
                className="btn-function"
                onClick={() => {
                  setChrModal(true);
                }}
              >
                Add Character
              </button>
            </li>
            <li>
              <button
                type="button"
                className="btn-function"
                onClick={() => {
                  navigate("cats");
                }}
              >
                Browse Categories
              </button>
            </li>
            <li>
              <button
                type="button"
                className="btn-function"
                onClick={() => {
                  navigate("bg");
                }}
              >
                Browse Backgrounds
              </button>
            </li>
          </ul>
          {filteredData && filteredData.data ? (
            <>
              <span className="f-end">
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
              />
              <CharacterBoxes data={filteredData.data} isCMS={true} />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      {catModal ? <CatManager modalControl={setCatModal} /> : ""}
      {chrModal ? <ChrManager modalControl={setChrModal} /> : ""}
    </>
  );
}

export default CMSBrowser;
