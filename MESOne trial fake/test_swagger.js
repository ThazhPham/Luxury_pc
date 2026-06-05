import axios from "axios";

async function test() {
    const loginRes = await axios.post(
        "http://116.118.95.174:1115/connect/token",
        new URLSearchParams({
            username: "1admin",
            password: "Hoanghuyday1!",
            grant_type: "password",
            client_id: "ro.client",
            client_secret: "secret"
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const token = loginRes.data.access_token;

    const body = {
        signature: 398,
        functionCode: "GETDATACUSTOMIZE",
        menuCd: "DB01",
        type: 10,
        skip: 0,
        take: 20,
        filtering: [],
        sortings: []
    };

    try {
        const res = await axios.post(
            "http://116.118.95.174:1115/GetData",
            body,
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("OK:", res.data);
    } catch (err) {
        console.log("ERROR:", err.response?.status);
        console.log("DETAIL:", err.response?.data);
    }
}

test();