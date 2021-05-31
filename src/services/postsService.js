import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/posts";
export function getPosts() {
  return http.get(apiEndpoint);
}

export function deletePost(postId) {
  return http.delete(`${apiEndpoint}/${postId}`);
}

export function getPost(id) {
  return http.get(`${apiEndpoint}/${id}`);
}

export function getPostComments(postId) {
  return http.get(`${apiEndpoint}/${postId}/comments`);
}

export function savePost(post) {
  if (post.id) {
    const body = { ...post };
    return http.put(apiEndpoint + "/" + post.id, body);
  }

  return http.post(apiEndpoint, post);
}
