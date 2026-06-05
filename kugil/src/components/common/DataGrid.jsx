import React, { useMemo } from 'react';
import '../../css/DataGrid.css';
import { getImageUrl } from "../../Api/gridService";
import { CheckIcon, EditIcon, ImageIcon, SearchIcon } from "./Icons";
import { useAutoI18n } from "../../i18n/useAutoI18n";

function PlaceholderImg() {
  return (
    <div className="data-grid-img-placeholder">
      <ImageIcon />
    </div>
  );
}
const DEFAULT_PAGE_SIZES = [20, 50, 100, 200, 500, "All"];

export default function DataGrid({
  columns = [],
  data = [],
  keyField = "id",
  loading = false,
  error = null,
  selectedIds = new Set(),
  onSelectionChange,
  pagination = { page: 1, perPage: 20, totalRows: 0 },
  onPageChange,
  onPerPageChange,
  pageSizes = DEFAULT_PAGE_SIZES,
  customRenderCell,
  onEdit
}) {
const [filters, setFilters] = React.useState({});
  const { page, perPage, totalRows } = pagination;
  const totalPages = perPage === "All" ? 1 : Math.ceil(totalRows / perPage);
  const { translate } = useAutoI18n();
  
  const filteredData = useMemo(() => {
  return data.filter((row) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;

      const cell = row[key];

      return String(cell ?? "")
        .toLowerCase()
        .includes(value.toLowerCase());
    });
  });
}, [data, filters]);

  /* ── Pagination Logic ──────────────────────────────────── */
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, 4, 5);
      if (page > 5) { pages.push("..."); pages.push(page); }
      if (totalPages > 6) { pages.push("..."); pages.push(totalPages); }
    }
    return [...new Set(pages)];
  };

  /* ── Selection Logic ───────────────────────────────────── */
  const allSelected = filteredData.length > 0 && 
  filteredData.every(r => selectedIds.has(r[keyField]));

  const toggleAll = () => {
    if (allSelected) {
      onSelectionChange?.(new Set());
    } else {
      onSelectionChange?.(new Set(filteredData.map(r => r[keyField])));
    }
  };

  const toggleRow = (id) => {
    const next = new Set(selectedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    onSelectionChange?.(next);
  };

  /* ── Render cell ─────────────────────────────────────── */
  const renderCell = (col, row) => {
    if (customRenderCell) {
      const customRender = customRenderCell(col, row);
      if (customRender !== undefined) return customRender;
    }

    switch (col.type) {
      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={selectedIds.has(row[keyField])}
            onChange={() => toggleRow(row[keyField])}
          />
        );

      case "image": {
        // Fallback for MainImagePath or dynamically get key if defined
        const src = getImageUrl(row[col.key] || row.MainImagePath);
        return src
          ? <img className="data-grid-img" src={src} alt="" onError={(e) => { e.target.style.display = 'none'; }} />
          : <PlaceholderImg />;
      }

      case "item":
        return (
          <div className="data-grid-cell-name">
            <div className="data-grid-cell-name__code">{row[col.key]}</div>
            <div className="data-grid-cell-name__desc">{row.ItemName || row.name || ""}</div>
          </div>
        );

      case "pill": {
        const pillVal = row[col.key];
        if (!pillVal) return "";
        let hash = 0;
        for (let i = 0; i < pillVal.length; i++) hash = pillVal.charCodeAt(i) + ((hash << 5) - hash);
        const PILL_COLORS = [
          { bg: "#e3f0ff", color: "#2b6cb0" },
          { bg: "#e6f9ee", color: "#276749" },
          { bg: "#fef3e2", color: "#b7791f" },
          { bg: "#fce4ec", color: "#c62828" },
          { bg: "#ede7f6", color: "#5e35b1" },
          { bg: "#e0f7fa", color: "#00695c" },
        ];
        const pc = PILL_COLORS[Math.abs(hash) % PILL_COLORS.length];
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span className="data-grid-pill" style={{ background: pc.bg, color: pc.color }}>
              {pillVal}
            </span>
          </div>
        );
      }

      case "lookup": {
        const nameVal = col.nameKey ? row[col.nameKey] : null;
        const codeVal = row[col.key];
        return nameVal || codeVal || "";
      }

      case "onhand": {
        const qty = row.OnHand ?? row.SumOnHand;
        const uom = row.InventoryUOMNm;
        return (
          <div className="data-grid-cell-onhand">
            {qty != null && <span className="data-grid-cell-onhand__qty">{typeof qty === "number" ? qty.toLocaleString() : qty}</span>}
            {qty == null && <span className="data-grid-cell-onhand__qty">–</span>}
            {uom && <span className="data-grid-cell-onhand__uom">{uom}</span>}
          </div>
        );
      }

      case "bool":
        return row[col.key] === "Y" ? <CheckIcon /> : null;

      case "number": {
        const val = row[col.key];
        if (val == null) return "";
        return typeof val === "number" ? val.toLocaleString() : val;
      }

      case "action":
        return (
          <button className="data-grid-edit-btn" title="Edit" onClick={() => onEdit?.(row)}>
            <EditIcon />
          </button>
        );

      default:
        return row[col.key] ?? "";
    }
  };

  
  const handleSearch = (key, value) => {
  setFilters((prev) => ({
    ...prev,
    [key]: value
  }));
};

  

  return (
    <div className="data-grid-wrapper">
      {loading && <div className="data-grid-loading">Loading...</div>}
      {error && <div className="data-grid-error">⚠ {error}</div>}

      <div className="data-grid-scroll">
        <table className={`data-grid-table ${allSelected ? "all-selected" : ""}`}>
          <colgroup>
            {columns.map((col) => (
              <col key={col.key} style={{ width: col.width, minWidth: col.width }} />
            ))}
          </colgroup>

          <thead>
            <tr className="data-grid-table__header">
              {columns.map((col) => (
                <th key={col.key} className={col.sticky ? "sticky-col" : ""}>
                  {col.type === "checkbox" ? (
                    <input type="checkbox" checked={allSelected} onChange={toggleAll} />
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
            {/* Filter row */}
            <tr className="data-grid-table__filter">
              {columns.map((col) => (
                <th key={col.key} className={col.sticky ? "sticky-col" : ""}>
                  {col.filterable === "text" && (
                    <div className="data-grid-filter-cell" >
                      <SearchIcon width="12" height="12" fill="#bbb" />
                      <input type="text" placeholder=""
                      value={filters[col.key] || ""}
                      onChange={(e) => handleSearch(col.key, e.target.value)} />
                    </div>
                  )}
                  {col.filterable === "select" && (
                    <div className="data-grid-filter-cell">
                      <SearchIcon width="12" height="12" fill="#bbb" />
                      <select defaultValue="">
                        <option value="">{translate("All")}</option>
                      </select>
                      <span className="data-grid-filter-caret">▾</span>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row, idx) => (
              <tr
                key={row[keyField] ? String(row[keyField]) + idx : idx}
                className={`data-grid-table__row ${selectedIds.has(row[keyField]) ? "selected" : ""}`}
              >
                {columns.map((col) => (
                  <td key={col.key} className={col.sticky ? "sticky-col" : ""}>
                    {renderCell(col, row)}
                  </td>
                ))}
              </tr>
            ))}
            {!loading && data.length === 0 && (
              <tr><td colSpan={columns.length} className="data-grid-table__empty">{translate("No data")}</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ─────────────────────────────────── */}
      <div className="data-grid-pagination">
        <div className="data-grid-pagination__sizes">
          {pageSizes.map((size) => (
            <button
              key={size}
              className={`data-grid-pagination__size ${perPage === size ? "active" : ""}`}
              onClick={() => { onPerPageChange?.(size); onPageChange?.(1); }}
            >{size === "All" ? translate("All") : size}</button>
          ))}
        </div>

        <div className="data-grid-pagination__info">
          {translate("page")} #{page}, {translate("total")}: {totalPages} ({totalRows.toLocaleString()} {translate("items")})
        </div>

        <div className="data-grid-pagination__pages">
          <button
            className="data-grid-pagination__nav"
            disabled={page <= 1}
            onClick={() => onPageChange?.(p => Math.max(1, p - 1))}
          >‹</button>

          {getPageNumbers().map((p, i) =>
            p === "..." ? (
              <span key={`dots-${i}`} className="data-grid-pagination__dots">…</span>
            ) : (
              <button
                key={p}
                className={`data-grid-pagination__page ${page === p ? "active" : ""}`}
                onClick={() => onPageChange?.(p)}
              >
                {p}
              </button>
            )
          )}

          <button
            className="data-grid-pagination__nav"
            disabled={page >= totalPages}
            onClick={() => onPageChange?.(p => Math.min(totalPages, p + 1))}
          >›</button>
        </div>
      </div>
    </div>
  );
}
