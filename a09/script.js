/**
 * Course: COMP 426
 * Assignment: a09
 * Author: <Haochen Qi>
 *
 * A twitter-like web app
 */

/**
 * index
 */
async function index(skip) {
    const response = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        params: {
            limit: 50,
            skip: skip
        }
    });
    return response.data;
}
/**
 * create new tweet
 */
async function create(content) {
    const response = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
            body: content
        },
    });
    return response.data;
}
/**
 * read
 */
async function read(id) {
    const response = await axios({
        method: 'get',
        url: `https://comp426fa19.cs.unc.edu/a09/tweets/${id}`,
        withCredentials: true,
    });
    return response.data;
}
/**
 * update
 */
async function update(id, content) {
    const response = await axios({
        method: 'put',
        url: `https://comp426fa19.cs.unc.edu/a09/tweets/${id}`,
        withCredentials: true,
        data: {
            body: content
        },
    });
    return response.data;
}
/**
 * destroy
 */
async function deleteT(id) {
    const response = await axios({
        method: 'delete',
        url: `https://comp426fa19.cs.unc.edu/a09/tweets/${id}`,
        withCredentials: true,
    });
    return response.data;
}
/**
 * like
 */
async function like(id) {
    const response = await axios({
        method: 'put',
        url: `https://comp426fa19.cs.unc.edu/a09/tweets/${id}/like`,
        withCredentials: true,
    });
    return response.data;
}
/**
 * like
 */
async function unlike(id) {
    const response = await axios({
        method: 'put',
        url: `https://comp426fa19.cs.unc.edu/a09/tweets/${id}/unlike`,
        withCredentials: true,
    });
    return response.data;
}
/**
 * reply
 */
async function reply(id, content) {
    let response = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
            "type": "reply",
            "parent": id,
            "body": content,
        },
    });
    return response.data;
}
/**
 * retweet
 */
async function retweet(id, content) {
    const response = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
            "type": "retweet",
            "parent": id,
            "body": content,
        },
    });
    return response.data;
}