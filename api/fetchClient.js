import { get } from "./MainClient";

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
