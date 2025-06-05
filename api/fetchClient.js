import { authPost } from "./authClient";
import { get, post, put } from "./MainClient";

export const getSearchData = async (input) => {
  const searchResp = await get(`company/search/portal/`).then((resp) => {
    return resp;
  });
  return searchResp;
};

export const getAdminPremiumSupport = async (Filter, Page) => {
  const response = await get(
    `/premium-support/dashboard/?${
      Filter?.search ? `search=${Filter?.search}` : ""
    }&page=${Page.page}&page_size=${Page.perPage}${
      Filter?.mindate !== undefined && Filter?.mindate.length > 0
        ? `&start_date=${Filter?.mindate}`
        : ""
    }${
      Filter?.maxdate !== undefined && Filter?.maxdate.length > 0
        ? `&end_date=${Filter?.maxdate}`
        : ""
    } `
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getAdminTransactionDetails = (
  Page,
  Filter,
  dropdown,
  sourceFilter
) => {
  const response = get(
    `user-transections/dashboard/?page=${Page.page}&page_size=${
      Page.perPage
    }&source=${sourceFilter}${dropdown !== " " ? `&plan=${dropdown}` : " "}${
      Filter?.search !== undefined && Filter?.search?.length !== 0
        ? `&search=${Filter?.search}`
        : ""
    }${
      Filter?.mindate !== undefined && Filter?.mindate.length > 0
        ? `&min_date=${Filter?.mindate}`
        : ""
    }${
      Filter?.maxdate !== undefined && Filter?.maxdate.length > 0
        ? `&max_date=${Filter?.maxdate}`
        : ""
    }`
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const postAddCoupon = async (data) => {
  const response = await post(`coupons/add/`, data).then((resp) => {
    return resp;
  });
  return response;
};
export const getAdminCoupon = (page, perPage, Search) => {
  const response = get(
    `coupons/list/?page=${page}&per_page=${perPage}${
      Search === undefined ? "" : `&search=${Search}`
    }`
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const putEditCoupon = async (data, id) => {
  const response = await put(`coupons/edit/${id}/`, data).then((resp) => {
    return resp;
  });
  return response;
};

export const deleteCoupon = async (id) => {
  const response = await del(`coupons/edit/${id}/`).then((resp) => {
    return resp;
  });
  return response;
};

export const getAdminSuperStar = (searchInput) => {
  const response = get(
    `prices/admin/superstars/list/${
      searchInput ? `?search=${searchInput}` : ""
    }`
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const addAdminStarCreate = async (data) => {
  const response = await post(`prices/admin/superstars/create/`, data).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const getAdminSuperStarEdit = (id) => {
  const response = get(
    `prices/admin/superstars/data/?investor_code=${id}`
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const putStarPortfolioNew = async (id, data) => {
  const response = await put(`prices/admin/superstars/edit/${id}`, data).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const getFeedbackDataAdmin = async (search, page) => {
  const response = await get(
    `contact/admin/user-testimonial-report/?search=${search}&page=${page}`
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const postLoginData = async (data) => {
  const loginResp = await authPost(`rest-auth/login/`, data).then((resp) => {
    return resp;
  });
  return loginResp;
};
