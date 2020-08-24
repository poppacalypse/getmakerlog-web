import axios, { axiosWrapper } from "utils/axios";

export const PRAISE_QUERIES = {
	getPraise: "praise.getPraise",
};

export async function getPraise(key, { indexUrl }) {
	const { data } = await axiosWrapper(axios.get, `${indexUrl}/praise/`);
	return data;
}

export async function setPraise(indexUrl) {
	const { data } = await axiosWrapper(axios.post, `${indexUrl}/praise/`);
	return data;
}
