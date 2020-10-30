import axios, { axiosWrapper } from "utils/axios";
import { useMutation, useQuery } from "react-query";
import { StdErrorCollection } from "utils/error";
import { productSchema, productsSchema } from "schemas/products";
import { getLogger } from "utils/logging";

const log = getLogger("products");

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

export async function createProduct({ payload: form }) {
	let formCopy = form;
	let data = new FormData();
	const headers = {
		"Content-Type": "multipart/form-data",
	};
	if (formCopy.icon !== null && formCopy.icon !== undefined) {
		data.append("icon", form.icon);
	}
	if (formCopy.tags !== null) {
		data.append("tags", JSON.stringify(form.tags));
	}
	Object.keys(formCopy).forEach(function (key) {
		if (key === "icon") return;
		if (key === "tags") return;
		data.append(key, formCopy[key]);
	});
	const response = await axiosWrapper(axios.post, "/products/", data, {
		headers,
	});
	return response.data;
}

export async function editProduct({ slug, payload: form }) {
	let formCopy = form;
	let data = new FormData();
	const headers = {
		"Content-Type": "multipart/form-data",
	};
	if (formCopy.icon !== null && formCopy.icon !== undefined) {
		data.append("icon", form.icon);
	}
	if (formCopy.tags !== null) {
		data.append("tags", JSON.stringify(form.tags));
	}
	Object.keys(formCopy).forEach(function (key) {
		if (key === "icon") return;
		if (key === "tags") return;
		data.append(key, formCopy[key]);
	});
	const response = await axiosWrapper(
		axios.patch,
		`/products/${slug}/`,
		data,
		{
			headers,
		}
	);
	return response.data;
}

export async function deleteProduct({ slug }) {
	await axiosWrapper(axios.delete, `/products/${slug}/`);
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

// TODO: Add optimistic loading here

export function useCreateProduct() {
	return useMutation(createProduct, {
		onSuccess: (data) => {
			log(`Created new product (#${data.slug})`);
		},
	});
}

export function useEditProduct() {
	return useMutation(editProduct, {
		onSuccess: (data) => {
			log(`Edited product (#${data.slug})`);
		},
	});
}

export function useDeleteProduct() {
	return useMutation(deleteProduct);
}
