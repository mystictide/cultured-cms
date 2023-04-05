import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CatBrowser from "../components/cms/catBrowser";
import CMSLogin from "../components/cms/cmsLogin";

function CMSCats() {
  const dispatch = useDispatch();
  const { cats } = useSelector((state) => state.cms);
  const [data, setData] = useState(cats ? cats : null);

  return (
    <div className="main cms">
      <section className="content content-wrapper access">
        {cats ? <CatBrowser filteredData={cats} /> : <CMSLogin />}
      </section>
    </div>
  );
}

export default CMSCats;
