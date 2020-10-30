export function isProductTeam(product, user) {
	return !!product.team.includes(user.id);
}

export function isInProduct(product, user) {
	return !!(product.user === user.id || isProductTeam(product, user));
}
