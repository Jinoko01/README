const getPostDetailAPI = async (postId, token) => {
  try {
    const res = await fetch(`https://mandarin.api.weniv.co.kr/post/${postId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();
    return json?.post;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getPostDetailAPI;