export function setExpirationDate(days) {
  var date = new Date(Date.now());
  date.setDate(date.getDate() + days);
  return date;
}

export function storeWithDate(key, value, days) {
  const item = {
    value: value,
    expiry: setExpirationDate(days),
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getWithDate(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

export function buildFilterURL(reqData) {
  let url = "?Keyword=" + reqData.keyword;
  if (reqData.page > 1) {
    url += "&page=" + reqData.page;
  } else {
    url += "&page=1";
  }
  if (reqData.filterModel) {
    if (reqData.filterModel.genres) {
      let mapped = reqData.filterModel.genres.map((item) => item.ID);
      let ids = mapped.join(",");
      url += "&genres=" + ids;
    }
    if (reqData.filterModel.country) {
      url += "&country=" + reqData.filterModel.country;
    }
    if (reqData.filterModel.author) {
      url += "&author=" + reqData.filterModel.author;
    }
  }
  return url;
}

export function buildHTMLText(method, selection, body) {
  //0 = category, 1 = character
  let result = "";
  if (!method) {
    result = body.replaceAll(
      selection,
      `<Link to="/c/${selection}" className="category">${selection}</Link>`
    );
  } else {
    result = body.replaceAll(
      selection,
      `<Link to="/${selection}" className="character">${selection}</Link>`
    );
  }
  return result;
}
