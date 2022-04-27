export const makeRequest = async (url, method, body) => {
  let response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const getAvgRating = (comments) => {
  let rated = [];
  comments.map((comment) => rated.push(comment.rated));
  let avg = rated.reduce((a, b) => a + b, 0) / comments.length || 0;
  return avg.toFixed(1);
};
