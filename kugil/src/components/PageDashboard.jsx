import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import MainLayout from "./layout/MainLayout";

/**
 * PageDashboard — trang chính sau khi đăng nhập.
 *
 * Menu lấy từ user.menus (login response), không cần gọi thêm API.
 * user.userName → tên hiển thị trên Header.
 */
export default function PageDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [menuItems,   setMenuItems]   = useState([]);
  const [menuLoading, setMenuLoading] = useState(true);
  const [menuError,   setMenuError]   = useState(null);

  // ── Bảo vệ route ──────────────────────────────────────
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // ── Xử lý menu từ login response ─────────────────────
  useEffect(() => {
    try {
      const rawMenus = user?.menus;

      if (!Array.isArray(rawMenus) || rawMenus.length === 0) {
        setMenuError("Không có dữ liệu menu.");
        return;
      }

      // Lọc bỏ menu EP01
      const filtered = rawMenus.filter(item => {
        const id = item.menuCd ?? item.menuId ?? item.id;
        return id?.trim() !== "EP01";
      });

      setMenuItems(buildMenuTree(filtered));
    } catch (err) {
      console.error("[Menu] Lỗi xử lý menu:", err);
      setMenuError("Lỗi xử lý dữ liệu menu.");
    } finally {
      setMenuLoading(false);
    }
  }, [user]);

  return (
    <MainLayout
      menuItems={menuItems}
      menuLoading={menuLoading}
      menuError={menuError}
    >
      <div style={{ color: "#555", fontSize: 14, padding: 24 }}>
      
      </div>
    </MainLayout>
  );
}

// ── Build menu tree ──────────────────────────────────────
/**
 * Chuyển mảng phẳng thành cây menu cha-con.
 *
 * Logic nhóm:
 *   1. Nếu API đã có parentId → dùng parentId để build tree.
 *   2. Nếu không có parentId → nhóm theo PREFIX (chữ cái đầu tiên
 *      của menuCd). Item đầu tiên gặp prefix mới = CHA,
 *      các item tiếp theo cùng prefix = CON.
 *
 * Field mapping:
 *   id      : menuCd | menuId | id
 *   name    : menuNm | menuName | name | text | title
 *   parentId: parentCd | parentMenuCd | parentId | pMenuCd
 *   icon    : iconCd | icon | menuIcon
 *   order   : sortNo | orderNo | sort
 */
function buildMenuTree(data) {
  if (!Array.isArray(data) || data.length === 0) return [];

  // Đã là dạng cây → trả luôn
  if (data[0]?.children !== undefined) return data;

  // Normalize — giữ _index để preserve thứ tự gốc từ API
  const normalized = data.map((item, idx) => ({
    id:       item.menuCd   ?? item.menuId   ?? item.id,
    name:     item.menuNm   ?? item.menuName ?? item.name  ?? item.text ?? item.title,
    parentId: item.parentCd ?? item.parentMenuCd ?? item.parentId ?? item.pMenuCd ?? null,
    icon:     item.iconCd   ?? item.icon     ?? item.menuIcon ?? null,
    order:    item.sortNo   ?? item.orderNo  ?? item.sort ?? 0,
    _index:   idx,           // vị trí gốc từ API
    raw:      item,
    children: [],
  }));

  // Sort: ưu tiên order, nếu order bằng nhau → giữ thứ tự gốc API
  normalized.sort((a, b) => a.order - b.order || a._index - b._index);

  // ── Kiểm tra xem có parentId hợp lệ không ──
  const hasParentIds = normalized.some(
    (item) => item.parentId && normalized.some((p) => p.id === item.parentId)
  );

  if (hasParentIds) {
    // Build tree theo parentId
    const map   = {};
    const roots = [];
    normalized.forEach((item) => { map[item.id] = item; });
    normalized.forEach((item) => {
      if (item.parentId && map[item.parentId]) {
        map[item.parentId].children.push(item);
      } else {
        roots.push(item);
      }
    });
    return roots;
  }

  // ── Không có parentId → nhóm theo PREFIX chữ cái đầu ──
  // Item đầu tiên với prefix mới = CHA
  // Các item tiếp theo cùng prefix = CON
  const groups = new Map(); // prefix → { parent, children[] }

  for (const item of normalized) {
    const prefix = String(item.id || "").charAt(0).toUpperCase();

    if (!groups.has(prefix)) {
      // Item đầu tiên gặp prefix mới → đây là CHA
      groups.set(prefix, item);
    } else {
      // Item cùng prefix → thêm vào children của CHA
      groups.get(prefix).children.push(item);
    }
  }

  const roots = Array.from(groups.values());

  console.log("[Menu] Built tree from prefix grouping:", roots.map(r =>
    `${r.id} "${r.name}" → ${r.children.length} children`
  ));

  return roots;
}