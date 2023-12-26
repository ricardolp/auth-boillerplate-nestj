export function processQuery(query: any) {
    const processedQuery = {};

    for (const key in query) {
        if (query.hasOwnProperty(key)) {
            const value = query[key];
            processedQuery[key] = { contains: value };
        }
    }

    return processedQuery;
}
