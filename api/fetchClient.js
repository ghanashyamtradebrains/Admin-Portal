import { get } from "./MainClient";

export const getSearchData = async (input) => {
  const searchResp = await get(`company/search/portal/`).then((resp) => {
    return resp;
  });
  return searchResp;
};
