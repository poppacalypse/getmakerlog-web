import axios, { axiosWrapper } from "utils/axios";
import { useQuery } from "react-query";
import { StdErrorCollection } from "utils/error";
import { productSchema, productsSchema } from "schemas/products";

export const PRODUCT_QUERIES = {
	getProduct: "products.getProduct",
	getProductMakers: "products.getProductMakers",
	getProductStats: "products.getProductStats",
	getUserProducts: "products.getUserProducts",
	getRelatedProducts: "products.getRelatedProducts",
	getMyProducts: "products.getMyProducts",
};

export async function getProduct(key, { slug }) {
	const { data } = await axiosWrapper(axios.get, `/products/${slug}/`);
	const { value, error } = productSchema.validate(data);
	if (error) throw new StdErrorCollection(error);
	return value;
}

export async function getMyProducts() {
	const { data } = await axiosWrapper(axios.get, `/products/me/`);
	const { value, error } = productsSchema.validate(data);
	if (error) throw new StdErrorCollection(error);
	return value;
}

export async function getProductMakers(key, { slug }) {
	const { data } = await axiosWrapper(axios.get, `/products/${slug}/people/`);
	return data;
}

export async function getRelatedProducts(key, { slug }) {
	const { data } = await axiosWrapper(
		axios.get,
		`/products/${slug}/related_products/`
	);
	return data;
}

export async function getProductStats(key, { slug }) {
	const { data } = await axiosWrapper(axios.get, `/products/${slug}/stats/`);
	return data;
}

export async function getUserProducts(key, { username }) {
	const { data } = await axiosWrapper(
		axios.get,
		`/users/${username}/products/`
	);
	const { value, error } = productsSchema.validate(data);
	if (error) throw new StdErrorCollection(error);
	return value;
}

export function useProduct(slug) {
	return useQuery([PRODUCT_QUERIES.getProduct, { slug }], getProduct);
}

export function useProductMakers(slug) {
	return useQuery(
		[PRODUCT_QUERIES.getProductMakers, { slug }],
		getProductMakers
	);
}

export function useRelatedProducts(slug) {
	return useQuery(
		[PRODUCT_QUERIES.getRelatedProducts, { slug }],
		getRelatedProducts
	);
}

export function useProductStats(slug) {
	return useQuery(
		[PRODUCT_QUERIES.getProductStats, { slug }],
		getProductStats
	);
}

export function useUserProducts(username) {
	return useQuery(
		[PRODUCT_QUERIES.getUserProducts, { username }],
		getUserProducts
	);
}

export function useMyProducts() {
	return useQuery([PRODUCT_QUERIES.getUserProducts], getMyProducts);
}
