// const cache = new Set();

// export const registerKeyToLocize = async (key, value) => {
//   if (cache.has(key)) return;
//   cache.add(key);

//   try {
//     await fetch("https://api.locize.app/manage/key", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer 301326bb-9c3e-488d-9e32-32c444ac66b1"
//       },
//       body: JSON.stringify({
//         key,
//         value,
//         language: "en"
//       })
//     });
//   } catch (err) {
//     console.error("Locize register failed:", err);
//   }
// };
const cache = new Set();

export const registerKeyToLocize = async (key, value) => {
  if (cache.has(key)) return;

  const languages = ['en', 'vi-VN', 'ko-KR'];

  try {
    const promises = languages.map(lng => 
      fetch(
        `https://api.locize.app/missing/301326bb-9c3e-488d-9e32-32c444ac66b1/latest/${lng}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer lz_api_hi53xY1rS3vL967GscNL4j1VXt3PR90Z"
          },
          body: JSON.stringify({
            [key]: value
          })
        }
      )
    );

    const results = await Promise.all(promises);

    if (results.every(res => res.ok)) {
      cache.add(key);
      console.log(`LOCIZE: Đã push thành công key "${key}" lên ${languages.join(', ')}`);
    } else {
      console.error("LOCIZE: Có lỗi khi push key lên một số ngôn ngữ.");
    }
  } catch (err) {
    console.error("Locize register failed:", err);
  }
};