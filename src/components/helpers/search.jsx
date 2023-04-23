import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

function Search({ setFilter, setKeyword, setSorting, keyword }) {
  const { filteredData, cats } = useSelector((state) => state.cms);
  const categoryOptions = useMemo(() => cats, []);
  const sortOptions = [
    { value: "desc", label: "Latest" },
    { value: "asc", label: "Oldest" },
  ];

  const [category, setCategories] = useState(
    filteredData.filter.CategoryID ? filteredData.filter.CategoryID : ""
  );

  const [filterModel, setFilterModel] = useState({
    category: category,
  });

  const onCategoryChange = (value) => {
    setCategories(value);
    setFilterModel((prevState) => ({
      ...prevState,
      CategoryID: value.ID,
    }));
  };

  const onSortingChange = (value) => {
    setSorting(value.value);
    setFilterModel((prevState) => ({
      ...prevState,
      SortBy: value,
    }));
    setFilter(1, filterModel);
  };

  const resetFilter = () => {
    setCategories("");
    setKeyword("");
    setSorting("desc");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setFilter(1, filterModel);
    }
  };

  return (
    <div className="v-items c-gap-10 r-gap-10">
      <label>Categories</label>
      <Select
        className="select"
        id="category"
        name="category"
        placeholder={"select categories"}
        options={categoryOptions}
        getOptionLabel={(options) => options["Name"]}
        getOptionValue={(options) => options["ID"]}
        value={categoryOptions.find(
          (x) => x.ID === filteredData.filter.CategoryID
        )}
        onChange={onCategoryChange}
      />
      <Select
        className="select"
        id="sorting"
        name="sorting"
        placeholder={"sort by"}
        options={sortOptions}
        getOptionLabel={(options) => options["label"]}
        getOptionValue={(options) => options["value"]}
        value={sortOptions.find((x) => x.value === filteredData.filter.SortBy)}
        onChange={onSortingChange}
      />
      <input
        type="text"
        id="keyword"
        name="keyword"
        className="main-border"
        value={keyword}
        placeholder={"filter by name.."}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="btn-function"
        onClick={(e) => setFilter(1, filterModel)}
      >
        Search
      </button>
      <button className="btn-function" onClick={(e) => resetFilter()}>
        Reset Filter
      </button>
    </div>
  );
}

export default Search;
