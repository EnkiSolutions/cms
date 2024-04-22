export type Sitemap = {
	[key: string]: {
	   path: string;
	   title: string;
   }[];
}
export type Content = {
	image: string;
	title: string;
	description: string;
	class?: string;
}
export type ListContent<T> = {
	items: T[]
};