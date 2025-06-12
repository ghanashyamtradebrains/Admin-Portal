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

export const getUserManagementUserList = async (searchInput) => {
  const response = await get(
    `/user-management/admin/${searchInput ? `?search=${searchInput}` : ""}`
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const deleteAdminStockRecommendation = async (id) => {
  const response = await del(`/stock/recommendations/delete/${id}/`).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const putUserRoleUpdate = async (data) => {
  const response = await put(`user/type/`, data).then((resp) => {
    return resp?.data;
  });
  return response;
};

export const getUserAccountStatus = async (user_id) => {
  const response = await get(
    `/user-management/admin/account-status/${user_id}/`
  ).then((resp) => {
    return resp?.data;
  });
  return response;
};

export const putUserManagementUserData = async (updatedData) => {
  const response = await put(
    `/user-management/admin/user-details/edit/`,
    updatedData
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const putUserAccountStatus = async (data) => {
  const response = await put(
    `/user-management/admin/account-status/edit/`,
    data
  ).then((resp) => {
    return resp?.data;
  });
  return response;
};

export const getUserManagementUserData = async (user_id) => {
  const response = await get(
    `/user-management/admin/user-details/${user_id}/`
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getAllStockDetails = async (input) => {
  const response = await get(
    `stocks/about-admin-all/?${
      input === undefined ? `&search=` : `&search=${input}`
    }`
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const addStockToStockDetails = async (data) => {
  const data1 = {
    ...data,
    research_report: "",
  };
  const response = await post(`stocks/about-admin/`, data1).then((resp) => {
    return resp;
  });
  return response;
};

export const getStockDetails = async (input) => {
  const response = await get(`test-search?keyword=${input}&length=4`).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const putStockToStockDetails = async (data, id) => {
  const data1 = {
    description: data?.description,
    research_report: data?.research_report,
    fincode: id,
  };
  const response = await put(`stocks/about-admin/?fincode=${id}`, data1).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const getStockToStockDetails = async (id) => {
  const response = await get(`stocks/about-admin/?fincode=${id}`).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const getAllSignUps = async (Page, Search, dateString) => {
  const response = await get(`/affiliate/admin/all-affiliate-signups/?page=${
    Page.page
  }&page_size=${Page.perPage}
  ${Search === undefined || Search.length === 0 ? "" : `&search=${Search}`}
  ${dateString[0] === undefined ? "" : `&min_date=${dateString[0]}`}${
    dateString[1] === undefined ? "" : `&max_date=${dateString[1]}`
  }
    `).then((resp) => {
    return resp;
  });
  return response;
};

export const getAllAffiliateData = async (Page, input, dateString) => {
  const response = await get(
    `/affiliate/admin/overvew/?page=${Page.page}&page_size=${Page.perPage}&${
      input !== undefined ? `&search=${input}` : ""
    }  ${dateString !== undefined ? `&max_date=${dateString[1]}` : ""} ${
      dateString !== undefined ? `&min_date=${dateString[0]}` : ""
    }`
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getAllAffiliateGraphData = async (
  filter,
  monthString,
  isDateRange,
  dateString
) => {
  var url = `/affiliate/admin/affilate-signup/?filter=${filter}`;
  if (isDateRange) {
    url = `/affiliate/admin/affilate-signup/?min_date=${filter[0].format(
      "YYYY-MM-DD"
    )}&max_date=${filter[1].format("YYYY-MM-DD")}`;
  } else if (monthString) {
    url = `/affiliate/admin/affilate-signup/?min_date=${filter.format(
      "YYYY-MM-01"
    )}`;
  }

  const response = await get(url).then((resp) => {
    return resp;
  });
  return response;
};

export const getOverallAffiliateSales = async (
  Filter,
  revenue,
  commi,
  earnings,
  Page
) => {
  const response = await get(
    `affiliate/admin/overall-sales/?&page=${Page.page}&perPage=${Page.perPage}${
      Filter?.search !== undefined && Filter?.search?.length !== 0
        ? `&search=${Filter?.search}`
        : ""
    }${
      Filter?.revenue !== undefined && Filter?.revenue?.length > 0
        ? `&${revenue}=${Filter?.revenue}`
        : ""
    }${
      Filter?.earnings !== undefined && Filter?.earnings?.length > 0
        ? `&${earnings}=${Filter?.earnings}`
        : ""
    }${
      Filter?.commi !== undefined && Filter?.commi?.length > 0
        ? `&${commi}=${Filter?.commi}`
        : ""
    }${
      Filter?.mindate !== undefined && Filter?.mindate?.length > 0
        ? `&min_date=${Filter?.mindate}`
        : ""
    }${
      Filter?.maxdate !== undefined && Filter?.maxdate?.length > 0
        ? `&max_date=${Filter?.maxdate}`
        : ""
    }`
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getAdminAffiliatePayoutDetails = async () => {
  const response = await get(`affiliate/admin/payout/`).then((resp) => {
    return resp;
  });
  return response;
};

export const updateAffiliatePayoutStatus = async (id, setSelected) => {
  const data = {
    status: setSelected,
  };
  const response = await put(`affiliate/admin/payout/set/${id}/`, data).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const deleAffiliatePromotionImage = async (id) => {
  const data = {
    id: id,
  };
  const response = await delWithParams(
    `affiliate/admin/promotion-images/`,
    data
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getAffiliatePromotionImage = async () => {
  const response = await get(`affiliate/admin/promotion-images/`).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const postAffiliatePromotionImage = async (data) => {
  const response = await post(`affiliate/admin/promotion-images/`, data).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};
