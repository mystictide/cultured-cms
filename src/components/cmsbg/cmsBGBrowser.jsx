import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BGManager from "../../components/cmsbg/bgManager";
import { filterBackgrounds } from "../../features/cms/cmsSlice";
import Pager from "../helpers/pager";
import BGBoxes from "./bgBoxes";

function CMSBGBrowser({ filteredData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [filter, setFilterModel] = useState(null);
  const [bgModal, setBGModal] = useState(false);
  const { bg } = useSelector((state) => state.cms);

  useEffect(() => {
    if (bg) {
      const reqData = {
        handle: true,
        filter: { Keyword: keyword, page: 1 },
      };
      dispatch(filterBackgrounds(reqData));
    }
  }, [bg]);

  const setFilter = (e, page, filter) => {
    setFilterModel(filter);
    const reqData = {
      handle: true,
      filter: {
        Keyword: keyword,
        page: page,
      },
    };
    dispatch(filterBackgrounds(reqData));
  };

  return (
    <>
      <div className="h-items form-gap c-gap-10">
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
                  setBGModal(true);
                }}
              >
                Add Background
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
              <BGBoxes data={filteredData.data} isCMS={true} />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      {bgModal ? <BGManager modalControl={setBGModal} /> : ""}
    </>
  );
}

export default CMSBGBrowser;
