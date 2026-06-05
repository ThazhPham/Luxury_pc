import axios from "axios";

const API = "https://api.kugil.thlone.vn";

const authService = {
  login: async (username, password) => {
    const params = new URLSearchParams();

    params.append("client_id", "ro.client");
    params.append("client_secret", "secret");
    params.append("grant_type", "password");
    params.append("username", username);
    params.append("password", password);
    params.append("connectionId", "THL-DEV");

    const res = await axios.post(
      `${API}/connect/token`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return res.data;
  },
};

export default authService;