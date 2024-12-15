export function searchMultipleMovies() {
  const myPromise = fetch("https://httpbin.org/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: "",
  });

  return myPromise;
}

export function searchSingleMovie() {
  const myPromise = fetch("https://httpbin.org/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: "",
  });

  return myPromise;
}
