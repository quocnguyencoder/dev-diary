export const sortByOptions = ['Most Relevant', 'Newest', 'Oldest'] as const
export const filterByOptions = ['Posts', 'People', 'Tags', 'My posts only']

export type SearchSortBy = typeof sortByOptions[number]
export type SearchFilterBy = typeof filterByOptions[number]
