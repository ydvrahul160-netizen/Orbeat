import { fetchJson } from "./fetchClient";

export function getMusics() {
  return fetchJson("/music");
}

export function getAlbums() {
  return fetchJson("/music/albums");
}

export function getAlbumById(id) {
  return fetchJson(`/music/albums/${id}`);
}

export function uploadMusic(formData) {
  return fetchJson("/music/upload", {
    method: "POST",
    body: formData,
  });
}

export function createAlbum(data) {
  return fetchJson("/music/album", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}