export const sortByOptions = ['Most Relevant', 'Newest', 'Oldest']
export const filterByOptions = ['Posts', 'People', 'Tags', 'My posts only']

export type SearchSortBy = typeof sortByOptions[number]
export type SearchFilterBy = typeof filterByOptions[number]
