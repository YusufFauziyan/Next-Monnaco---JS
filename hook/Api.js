import axios from "axios";

export const GetTokenId = async () => {
  try {
    const { data } = await axios.get(`${process.env.API_URL}/getIdAndToken`);

    Cookies.set("__tknId", JSON.stringify(data));
  } catch (error) {
    console.log("failed to get token");
  }
};
