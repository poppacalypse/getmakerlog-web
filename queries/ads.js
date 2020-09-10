import axios, { axiosWrapper } from "utils/axios";
import { useQuery } from "react-query";

export const AD_QUERIES = {
	getAd: "ads.getAd",
};

export async function getAd() {
	const { data } = await axiosWrapper(axios.get, `/ads/serve/`);
	return data;
}

export function useAd() {
	return useQuery([AD_QUERIES.getAd], getAd);
}
