import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CMSLogin from "../components/cms/cmsLogin";
import CMSBGBrowser from "../components/cmsbg/cmsBGBrowser";

function CMS() {
  const dispatch = useDispatch();
  const { filteredBG, filteredData, isError } = useSelector(
    (state) => state.cms
  );
  const [data, setData] = useState(filteredBG ? filteredBG : null);

  return (
    <div className="main cms">
      <section className="content content-wrapper access">
        {filteredData ? (
          filteredData.filter ? (
            <CMSBGBrowser filteredData={filteredBG} />
          ) : (
            <CMSLogin />
          )
        ) : (
          <CMSLogin />
        )}
      </section>
    </div>
  );
}

export default CMS;
