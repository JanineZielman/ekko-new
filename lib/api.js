export const API_URL = 'https://ekko.no/api';
export const API_TOKEN = 'LlA7aDed2U-oSwxWF86vMRhJscwoWpCh';

async function fetchAPI(query, { previewData, variables } = {}) {
    let craftUrl = API_URL;

    if (previewData && previewData !== '') {
        craftUrl += '?token=' + previewData;
    }

    const res = await fetch(craftUrl, {
        method: 'POST',
        body: JSON.stringify({
            query,
            variables,
        }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_TOKEN}`,
        },
    });

    if (res.status !== 200) {
        console.log(await res.text());
        throw new Error('Failed to fetch API');
    }

    const json = await res.json();

    if (json.errors) {
        console.error(json.errors);
        throw new Error('Failed to fetch API');
    }

    return json.data;
}


export async function getRecentEvents() {
    const data = await fetchAPI(`
        {
            entries (section: "Events", orderBy: "date DESC", limit: 5) {
                slug
                date
                title
                location
                eventFeaturedPhoto {
                    url
                }
            }
        }
    `);
    return data.entries;
}

export async function getAllEvents() {
    const data = await fetchAPI(`
        {
            entries (section: "Events", orderBy: "date DESC") {
                slug
                date
                title
                location
                eventFeaturedPhoto {
                    url
                }
            }
        }
    `);
    return data.entries;
}

export async function getNavigation() {
    const data = await fetchAPI(`
        {
            nodes (level: 1) {
                ... on newNavigation_Node {
                    id
                    title
                    url
                }
            }
        }
    `);
    return data.nodes;
}



// export async function getAllPostsWithSlug() {
//     const data = await fetchAPI(`
//         {
//             entries (section: "blog") {
//                 slug
//             }
//         }
//     `);
//     return data.entries;
// }

// export async function getAllPostsForHome(previewData) {
//     const data = await fetchAPI(
//         `
//         {
//             entries (section: "blog") {
//                 dateCreated @formatDateTime (format: "Y-m-d")
//                 title
//                 slug
//                 url
//                 author {
//                     username
//                     fullName
//                     photo {
//                         title
//                         url @transform (handle: "thumb")
//                     }
//                 }
//                 ... on blog_blog_Entry {
//                     richText
//                     coverImage {
//                         title
//                         url @transform (handle: "thumb")
//                     }
//                 }
//             }
//         }
//         `,
//         { previewData }
//     );

//     return data.entries;
// }

// export async function getAllCategories() {
//     const data = await fetchAPI(
//         `
//         {
//             blog: categories(group: "blogTag") {
//                 title
//                 id
//             }

//             countries: categories(group: "countryTag") {
//                 title
//                 id
//             }
//         }
//         `
//     );

//     return data;
// }

// export async function getPostAndMorePosts(slug, previewData) {
//     const data = await fetchAPI(
//         `
//         query($slug: [String]) {
//             post: entry (slug: $slug) {
//                 dateCreated @formatDateTime (format: "Y-m-d")
//                 title
//                 slug
//                 url
//                 author {
//                     username
//                     fullName
//                     photo {
//                         title
//                         url @transform (handle: "thumb")
//                     }
//                 }
//                 ... on blog_blog_Entry {
//                     richText
//                     coverImage {
//                         title
//                         url @transform (handle: "thumb")
//                     }
//                 }
//             }

//             morePosts: entries(section: "blog", limit: 3) {
//                 dateCreated @formatDateTime (format: "Y-m-d")
//                 title
//                 slug
//                 url
//                 author {
//                     username
//                     fullName
//                     photo {
//                         title
//                         url @transform (handle: "thumb")
//                     }
//                 }
//                 ... on blog_blog_Entry {
//                     richText
//                     coverImage {
//                         title
//                         url @transform (handle: "thumb")
//                     }
//                 }
//             }
//         }
//         `,
//         {
//             previewData,
//             variables: {
//                 slug,
//             },
//         }
//     );

//     data.morePosts = data.morePosts.filter((post) => post.slug !== slug).slice(0, 2);

//     return data;
// }

// export async function searchEntries(variables) {
//     const data = await fetchAPI(
//         `
//         query($query: String, $id: [Int]) {
//             entries (search: $query, relatedToAll: $id) {
//                 dateCreated @formatDateTime (format: "Y-m-d")
//                 title
//                 slug
//                 url
//                 author {
//                     username
//                     fullName
//                     photo {
//                         title
//                         url @transform (handle: "thumb")
//                     }
//                 }
//             }
//         }
//         `,
//         {
//             variables,
//         }
//     );

//     return data.entries;
// }

// export async function getPostBySlug(slug) {
//     const data = await fetchAPI(
//         `
//         query($slug: [String]) {
//             post: entry (slug: $slug) {
//                 url
//             }
//         }
//         `,
//         {
//             variables: {
//                 slug,
//             },
//         }
//     );

//     return data.post;
// }
