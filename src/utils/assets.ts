/**
 * Utilidad para construir URLs de assets con el base path correcto
 */

export const R2_BASE_URL = 'https://pub-146edcb977de463eb79397c4bb7d8d06.r2.dev';

export type ImageQuality = 'low' | 'med' | 'high';

/**
 * Construye la URL completa de un asset incluyendo el base path
 * @param path Ruta relativa del asset (ej: "/img/photo.jpg")
 * @returns URL completa con base path (ej: "/img/photo.jpg" o "/clinica-sada-borras/img/photo.jpg" si hay subdirectorio)
 */
export function asset(path: string): string {
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	const base = import.meta.env.BASE_URL;
	if (base === '/') {
		return normalizedPath;
	}
	return `${base.replace(/\/$/, '')}${normalizedPath}`;
}

/**
 * Construye la URL de un asset en R2 con sufijo de calidad
 * @param path Ruta base sin extensión (ej: "img/servicios_cards/implante")
 * @param quality Nivel de calidad: low, med, high
 */
export function r2Asset(path: string, quality: ImageQuality): string {
	let normalized = path.startsWith('/') ? path.slice(1) : path;
	const dotIndex = normalized.lastIndexOf('.');
	const slashIndex = normalized.lastIndexOf('/');
	if (dotIndex > slashIndex) {
		normalized = normalized.slice(0, dotIndex);
	}
	return `${R2_BASE_URL}/${normalized}-${quality}.webp`;
}

/** Devuelve las tres variantes de calidad para un path base */
export function r2Variants(path: string): { low: string; med: string; high: string } {
	return {
		low: r2Asset(path, 'low'),
		med: r2Asset(path, 'med'),
		high: r2Asset(path, 'high'),
	};
}

