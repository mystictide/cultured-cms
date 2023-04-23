import axios from "axios";
import { storeWithDate } from "../../assets/js/helpers";

// const API_URL = "http://localhost:7474/cms/";
const API_URL = "https://capi.herrguller.cc/cms/";
const secret = import.meta.env.VITE_SECRET;

const getCategories = async () => {
  var config = {
    method: "get",
    url:
      "https://capi.herrguller.cc/main" +
      "/get/categories?main=" +
      false +
      "&prev=" +
      false +
      "&parentid=" +
      0,
    headers: {
      Authorization: "Bearer " + secret,
      "Content-Type": "application/json",
    },
  };

  var data = await axios(config)
    .then(function (response) {
      storeWithDate("categories", JSON.stringify(response.data), 1);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const filterCharacters = async (reqData) => {
  const secretHandle = reqData.handle ? secret : reqData.secret;
  var config = {
    method: "post",
    url: API_URL + "filter/characters",
    headers: {
      Authorization: "Bearer " + secretHandle,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(reqData.filter),
  };
  var data = await axios(config)
    .then(function (response) {
      storeWithDate("filteredCharacters", JSON.stringify(response.data), 1);
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const filterBackgrounds = async (reqData) => {
  const secretHandle = reqData.handle ? secret : reqData.secret;
  var config = {
    method: "post",
    url: API_URL + "filter/backgrounds",
    headers: {
      Authorization: "Bearer " + secretHandle,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(reqData.filter),
  };
  var data = await axios(config)
    .then(function (response) {
      storeWithDate("filteredBackgrounds", JSON.stringify(response.data), 1);
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const manageCharacter = async (reqData) => {
  var config = {
    method: "post",
    url: API_URL + "manage/character",
    headers: {
      Authorization: "Bearer " + secret,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(reqData),
  };

  var data = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const manageBackground = async (reqData) => {
  var config = {
    method: "post",
    url: API_URL + "manage/background",
    headers: {
      Authorization: "Bearer " + secret,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(reqData),
  };

  var data = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const manageCategory = async (reqData) => {
  var config = {
    method: "post",
    url: API_URL + "manage/category",
    headers: {
      Authorization: "Bearer " + secret,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(reqData),
  };

  var data = await axios(config)
    .then(function (response) {
      storeWithDate("categories", JSON.stringify(response.data), 1);
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const cmsService = {
  getCategories,
  filterCharacters,
  filterBackgrounds,
  manageCharacter,
  manageCategory,
  manageBackground,
};

export default cmsService;
