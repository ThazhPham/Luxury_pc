import axios from "axios";

const API_BASE = "https://api.kugil.thlone.vn";

/**
 * Gọi API lấy data grid — dùng chung cho mọi trang.
 *
 * @param {string} signature   – Tên module (Item, Plant, BOM, ...)
 * @param {string} menuCd      – Mã menu (B009, B003, ...)
 * @param {object} options      – { page, perPage, filtering, sortings }
 */
export async function fetchGridData(signature, menuCd, options = {}) {
  const {
    page      = 1,
    perPage   = 20,
    filtering = [],
    sortings  = [{ ColumName: "CreateDate", TypeSorting: "DESC" }],
  } = options;

  const skip = (page - 1) * perPage;

  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${API_BASE}/Masterdata/DataService/GetData`,
    {
      signature,
      functionCode: "GETDATABYGRID",
      skip,
      take: perPage,
      page,
      perPage,
      MenuCd: menuCd,
      filtering,
      sortings,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data; // Array of items, mỗi item có totalRows
}

/**
 * Base URL cho ảnh (MainImagePath)
 * Ví dụ: "/SCM/testV12/xxx.png" → full URL
 */
export function getImageUrl(path) {
  if (!path) return null;
  return `${API_BASE}${path}`;
}

export { API_BASE };
