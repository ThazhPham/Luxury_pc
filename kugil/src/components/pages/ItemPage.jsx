import { useState, useEffect, useCallback, useMemo } from "react";
import { useAutoI18n } from "../../i18n/useAutoI18n";
import { fetchGridData, getImageUrl } from "../../Api/gridService";
import FilterPopup from "../common/FilterPopup";
import DataGrid from "../common/DataGrid";
import CreateItemPanel from "./CreateItemPanel";
import "../../css/ItemPage.css";

/* Constants */
const PAGE_SIZES = [20, 50, 100, 200, 500, "All"];

/* ================================================================
   ItemPage — ITEM LIST grid
   ================================================================ */
export default function ItemPage() {
  const { translate } = useAutoI18n();
  const COLUMNS = useMemo(() => [
    { key: "_check",              label: "",                  type: "checkbox", width: 40,  sticky: true },
    { key: "MainImagePath",      label: translate("Main I…"),          type: "image",    width: 60,  sticky: true },
    { key: "ItemCode",           label: translate("Item"),              type: "item",     width: 160, sticky: true, filterable: "text" },
    { key: "ItemsGroupName",     label: translate("ItemsGroupCode"),    type: "pill",     width: 140, filterable: "text" },
    { key: "ItemClass1",         label: translate("Item Class 1"),      type: "lookup",   width: 140, filterable: "select", nameKey: "ItemClass1Nm" },
    { key: "ItemClass2",         label: translate("Item Class 2"),      type: "lookup",   width: 140, filterable: "select", nameKey: "ItemClass2Nm" },
    { key: "ItemClass3",         label: translate("Item Class 3"),      type: "lookup",   width: 160, filterable: "select", nameKey: "ItemClass3Nm" },
    { key: "ItemClass4",         label: translate("Item Class 4"),      type: "lookup",   width: 160, filterable: "select", nameKey: "ItemClass4Nm" },
    { key: "ItemClass5",         label: translate("Item Class 5"),      type: "lookup",   width: 160, filterable: "select", nameKey: "ItemClass5Nm" },
    { key: "OnHand",             label: translate("Onhand"),            type: "onhand",   width: 100, filterable: "text" },
    { key: "ManageBatchNumbers", label: translate("Manage Batch"),      type: "bool",     width: 120, filterable: "select" },
    { key: "ManageSerialNumbers",label: translate("Manage Serial"),     type: "bool",     width: 120, filterable: "select" },
    { key: "InventoryItem",      label: translate("Inventory (Y/N)"),   type: "bool",     width: 120, filterable: "select" },
    { key: "SalesItem",          label: translate("Sale Item"),         type: "bool",     width: 100, filterable: "select" },
    { key: "PurchaseItem",       label: translate("Purchase Item"),     type: "bool",     width: 120, filterable: "select" },
    { key: "TemporaryUnitPrice", label: translate("Temporary Unit Price"), type: "number", width: 150, filterable: "text" },
    { key: "PricePerUnit",       label: translate("Price Per Unit"),    type: "number",   width: 120, filterable: "text" },
    { key: "Currency",           label: translate("Currency"),          type: "text",     width: 110, filterable: "select" },
    { key: "_action",            label: translate("Ac…"),               type: "action",   width: 50 },
  ], [translate]);
  const [data,       setData]       = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(PAGE_SIZES[0]);
  const [totalRows, setTotalRows] = useState(0);

  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreateExpanded, setIsCreateExpanded] = useState(false);
  const [editingRow, setEditingRow] = useState(null);

  const [filterValues, setFilterValues] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});

  const handleFilterChange = (key, value) => {
    setFilterValues(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    setAppliedFilters(filterValues);
    setPage(1);
    setIsFilterPopupOpen(false);
  };

  const handleClearFilter = () => {
    setFilterValues({});
    setAppliedFilters({});
    setPage(1);
  };

  const handleEditRow = (row) => {
    setEditingRow(row);
    setIsCreateOpen(true);
  };

  const filterFields = useMemo(() => [
    { name: "ItemCode", placeholder: translate("Item"), type: "combobox", filterType: translate("Contains") },
    { name: "ItemName", placeholder: translate("Item Name"), type: "combobox", filterType: translate("Contains") },
    { name: "ItemsGroupCode", placeholder: translate("ItemsGroupCode"), type: "combobox", filterType: translate("IsEqualTo") },
    { name: "ItemClass1", placeholder: translate("Class"), type: "combobox", filterType: translate("IsEqualTo") },
    { name: "ItemClass2", placeholder: translate("Model"), type: "combobox", filterType: translate("IsEqualTo") },
    { name: "ItemType", placeholder: translate("Item Type"), type: "combobox", filterType: translate("IsEqualTo") },
    { name: "U_Part", placeholder: translate("U_Part"), type: "combobox", filterType: translate("IsEqualTo") },
    { name: "U_SizeCD", placeholder: translate("U_SizeCD"), type: "combobox", filterType: translate("IsEqualTo") },
    { name: "U_Thickness", placeholder: translate("U_Thickness"), type: "combobox", filterType: translate("IsEqualTo") }
  ], [translate]);

  /* ── Fetch data ──────────────────────────────────────── */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const take = perPage === "All" ? 99999 : perPage;
      const result = await fetchGridData("Item", "B009", {
        page,
        perPage: take,
        ...appliedFilters
      });

      const items = result?.Data?.List ?? [];
      setData(items);
      setTotalRows(result?.Data?.TotalRows ?? items[0]?.totalRows ?? items.length);
    } catch (err) {
      console.error("[ItemPage] API Error:", err);
      setError(err.response?.data?.message || err.message || translate("Lỗi tải dữ liệu"));
    } finally {
      setLoading(false);
    }
  }, [page, perPage, appliedFilters]);

  useEffect(() => { loadData(); }, [loadData]);

  useEffect(() => { loadData(); }, [loadData]);

  /* ── Render ──────────────────────────────────────────── */
  return (
    <div className="item-page">
      {/* ── Toolbar ────────────────────────────────────── */}
      <div className="item-toolbar">
        <div className="item-toolbar__left">
          <div className="item-breadcrumb">
            <span className="item-breadcrumb__home">🏠</span>
            <span className="item-breadcrumb__sep">/</span>
            <span>{translate("Master")}</span>
            <span className="item-breadcrumb__sep">/</span>
            <span className="item-breadcrumb__active">{translate("Item")}</span>
          </div>
          <h2 className="item-title">{translate("ITEM LIST")}</h2>
          <p className="item-subtitle">{translate("Click on the quantity to view current stock.")}</p>
        </div>
        <div className="item-toolbar__right" style={{ position: "relative" }}>
          <button className="item-action-btn" title={translate("Search")} onClick={handleSearch}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          </button>
          
          <div style={{ position: "relative" }}>
            <button className="item-action-btn" title={translate("Filter")} onClick={() => setIsFilterPopupOpen(!isFilterPopupOpen)}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg>
            </button>
            <FilterPopup 
              isOpen={isFilterPopupOpen} 
              onClose={() => setIsFilterPopupOpen(false)} 
              fields={filterFields} 
              filterValues={filterValues}
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
            />
          </div>

          <button className="item-action-btn" title={translate("Add")} onClick={() => { setEditingRow(null); setIsCreateOpen(true); }}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
          </button>
          <button className="item-action-btn" title={translate("Close")} onClick={handleClearFilter}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
          <button className="item-action-btn item-action-btn--export" title={translate("Export Excel")}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
            <span>{translate("Export Excel")}</span>
            <span className="item-action-btn__caret">▾</span>
          </button>
        </div>
      </div>

      {/* ── Content Wrapper ────────────────────────────── */}
      <div className="item-content-wrapper">
        <div className="item-grid-section">
          <DataGrid
            columns={COLUMNS}
            data={data}
            keyField="ItemCode"
            loading={loading}
            error={error}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            pagination={{ page, perPage, totalRows }}
            onPageChange={setPage}
            onPerPageChange={setPerPage}
            pageSizes={PAGE_SIZES}
            onEdit={handleEditRow}
          />
        </div>
      </div>

      {isCreateOpen && (
        <div className={`item-create-section ${isCreateExpanded ? 'full' : 'split'}`}>
          <CreateItemPanel 
            initialData={editingRow}
            mode={editingRow ? 'edit' : 'create'}
            onClose={() => { setIsCreateOpen(false); setIsCreateExpanded(false); setEditingRow(null); }}
            isExpanded={isCreateExpanded}
            onToggleExpand={() => setIsCreateExpanded(!isCreateExpanded)}
          />
        </div>
      )}
    </div>
  );
}
