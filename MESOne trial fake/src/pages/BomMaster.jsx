
import {
    useEffect,
    useState,
    useCallback,
    useRef
} from "react";

import DataGrid, {
    Column,
    Paging,
    Pager,
    SearchPanel,
    Scrolling
} from "devextreme-react/data-grid";

import { Popup } from "devextreme-react/popup";

import apiServer from "../api/apiServer";

import "../css/BomMaster.css";

export default function BomMasterPage() {

    // =========================
    // GRID
    // =========================

    const [data, setData] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [totalRows, setTotalRows] =
        useState(0);

    // =========================
    // PAGING
    // =========================

    const [pageIndex, setPageIndex] =
        useState(1);

    // Dùng ref để tránh stale closure trong loadData
    const pageIndexRef = useRef(1);

    const [pageSize] =
        useState(20);

    // Ref tới DataGrid để reset trang khi search
    const gridRef = useRef(null);

    // =========================
    // FORM
    // =========================

    const defaultForm = {

        ParentItem: "",
        ParentItemNm: "",

        ComponentItem: "",
        ComponentItemNm: "",

        Quantity: 1,

        BOMVersion: 1,

        InventoryUOM: "",
        InventoryUOMNm: "",

        ItemsGroupCode: "",
        ItemsGroupName: "",

        U_ItemClas: "",

        EONO: "",

        Remark: "",

        Status: "",

        IsDefaultBOM: "1",

        UseYN: "1"
    };

    const [formData, setFormData] =
        useState(defaultForm);

    const [query, setQuery] =
        useState(defaultForm);

    const [openPopup, setOpenPopup] =
        useState(false);

    // =========================
    // ITEM LIST
    // =========================

    const [itemList, setItemList] =
        useState([]);

    // =========================
    // LOAD ITEM MASTER
    // =========================

    useEffect(() => {


    const loadItems = async () => {

        try {

            const res =
                await apiServer.getItemMaster(
                    1,
                    1000
                );

            console.log(
                "ITEM MASTER RAW:",
                res
            );

            // FIX: Data is array directly
            const raw =
                res?.Data ||
                res?.data?.Data ||
                res?.list ||
                [];

            const list =
                Array.isArray(raw)
                    ? raw
                    : (raw?.List || []);

            console.log(
                "ITEM LIST:",
                list
            );

            setItemList(
                Array.isArray(list)
                    ? list
                    : []
            );

        } catch (err) {

            console.log(err);

            setItemList([]);
        }
    };

    loadItems();

}, []);

    // =========================
    // HANDLE CHANGE
    // =========================

    const handleChange = (e) => {

        const { name, value } =
            e.target;

        // AUTO FILL ITEM NAME
        if (name === "ComponentItem") {

            const selected =
                itemList.find(
                    x =>
                        x.ItemCode === value
                );

            setFormData(prev => ({

                ...prev, 

                ComponentItem:
                    value,

                ComponentItemNm:
                    selected?.ItemName || ""
            }));

            return;
        }

        setFormData(prev => ({

            ...prev,

            [name]: value
        }));
    };

    // =========================
    // BUILD FILTER
    // =========================

    const buildFiltering = (
        queryData
    ) => {

        const filters = [];

        if (queryData.ComponentItem) {

            filters.push({

                columName:
                    "ComponentItem",

                valueDefault:
                    String(
                        queryData.ComponentItem
                    ),

                dataValue:
                    "string",

                typeFilter:
                    "contains"
            });
        }

        if (queryData.ComponentItemNm) {

            filters.push({

                columName:
                    "ComponentItemNm",

                valueDefault:
                    String(
                        queryData.ComponentItemNm
                    ),

                dataValue:
                    "string",

                typeFilter:
                    "contains"
            });
        }

        if (
            queryData.BOMVersion !== "" &&
            queryData.BOMVersion !== null &&
            queryData.BOMVersion !== undefined
        ) {

            filters.push({

                columName:
                    "BOMVersion",

                valueDefault:
                    String(
                        queryData.BOMVersion
                    ),

                dataValue:
                    "number",

                typeFilter:
                    "isEqualto"
            });
        }

        if (queryData.Status) {

            filters.push({

                columName:
                    "Status",

                valueDefault:
                    String(
                        queryData.Status
                    ),

                dataValue:
                    "string",

                typeFilter:
                    "isEqualto"
            });
        }

        return filters;
    };

    // =========================
    // LOAD DATA
    // =========================

    const loadData = useCallback(
        async (overrideQuery, customPage) => {

            try {

                setLoading(true);

                const currentQuery = overrideQuery ?? query;

                // Ưu tiên: customPage → pageIndexRef (luôn mới nhất) → 1
                const currentPage =
                    customPage != null
                        ? customPage
                        : pageIndexRef.current;

                console.log("LOAD PAGE:", currentPage);

                const filtering = buildFiltering(currentQuery);

                const res = await apiServer.getBomMaster(
                    currentPage,
                    pageSize,
                    filtering
                );

                console.log("BOM MASTER:", res);

                const raw =
                    res?.Data ||
                    res?.data?.Data ||
                    res?.list ||
                    [];

                const list =
                    Array.isArray(raw)
                        ? raw
                        : (raw?.List || []);

                setData(
                    (Array.isArray(list) ? list : []).map((x, i) => ({
                        ...x,
                        __id:             x.BOMDetailId || x.BOMId || `bom_${i}`,
                        ComponentItem:    x.ComponentItem   || "-",
                        ComponentItemNm:  x.ComponentItemNm || "-",
                        BOMId:            x.BOMId      || 0,
                        BOMVersion:       x.BOMVersion || 0,
                        Quantity:         x.Quantity   || 0,
                        InventoryUOMNm:   x.InventoryUOMNm  || "-",
                        ItemsGroupName:   x.ItemsGroupName  || "-",
                        DefaultWarehouse: x.DefaultWarehouse || "-",
                        CreateBy:         x.CreateBy   || "-",
                        CreateDate:       x.CreateDate || "-"
                    }))
                );

                setTotalRows(
                    res?.TotalRows    ||
                    res?.totalRows    ||
                    res?.TotalRecords ||
                    res?.Total        ||
                    list?.length      ||
                    0
                );

            } catch (err) {

                console.log("LOAD BOM ERROR:", err);
                setData([]);

            } finally {

                setLoading(false);
            }
        },
        // KHÔNG đưa pageIndex vào dep → tránh stale closure
        // pageIndexRef.current luôn up-to-date
        [pageSize, query]
    );

    // =========================
    // FIRST LOAD + khi pageIndex thay đổi
    // =========================

    useEffect(() => {
        // Sync ref trước khi load
        pageIndexRef.current = pageIndex;
        loadData(query, pageIndex);
    }, [pageIndex, query]);

    // =========================
    // SEARCH
    // =========================

    const handleSearch = () => {

        // Reset về trang 1 cả ref lẫn state
        pageIndexRef.current = 1;

        // Reset grid về trang 0 (zero-based) nếu đang ở trang khác
        if (gridRef.current) {
            const instance = gridRef.current.instance?.();
            if (instance) instance.pageIndex(0);
        }

        setPageIndex(1);
        setQuery(formData);

    };

    // =========================
    // ADD
    // =========================

    const handleAdd = () => {

        setFormData(defaultForm);

        setOpenPopup(true);
    };

    // =========================
    // REFRESH
    // =========================

    const handleRefresh = () => {

        loadData(query);
    };

    // =========================
    // CLEAR
    // =========================

    const handleClear = () => {

        setFormData(defaultForm);

        pageIndexRef.current = 1;

        if (gridRef.current) {
            const instance = gridRef.current.instance?.();
            if (instance) instance.pageIndex(0);
        }

        setPageIndex(1);
        setQuery(defaultForm);

    };

    // =========================
    // PAGING — dùng onPageIndexChange thay vì onOptionChanged
    // onOptionChanged bị trigger nhiều lần khi data thay đổi → infinite loop
    // =========================

    const onPageIndexChange = useCallback((newZeroBasedIndex) => {

        const newPage = newZeroBasedIndex + 1;

        // Chỉ update nếu thực sự khác trang hiện tại
        if (newPage !== pageIndexRef.current) {
            pageIndexRef.current = newPage;
            setPageIndex(newPage);
        }

    }, []);

    // =========================
    // SAVE
    // =========================

    const handleSave =
        async () => {

            try {

                if (
                    !formData.ParentItem
                ) {

                    alert(
                        "Parent Item required"
                    );

                    return;
                }

                if (
                    !formData.ComponentItem
                ) {

                    alert(
                        "Component Item required"
                    );

                    return;
                }

                const payload = {

                    signature: 182,

                    MenuCd: "B011",

                    functionCode:
                        "ADD",

                    data: {

                        ParentItem:
                            formData.ParentItem,

                        ParentItemNm:
                            formData.ParentItemNm,

                        ComponentItem:
                            formData.ComponentItem,

                        ComponentItemNm:
                            formData.ComponentItemNm,

                        Quantity:
                            Number(
                                formData.Quantity
                            ),

                        BOMVersion:
                            Number(
                                formData.BOMVersion
                            ),

                        InventoryUOM:
                            formData.InventoryUOM,

                        InventoryUOMNm:
                            formData.InventoryUOMNm,

                        ItemsGroupCode:
                            formData.ItemsGroupCode,

                        ItemsGroupName:
                            formData.ItemsGroupName,

                        U_ItemClas:
                            formData.U_ItemClas,

                        EONO:
                            formData.EONO,

                        Remark:
                            formData.Remark,

                        Status:
                            formData.Status || "D",

                        IsDefaultBOM:
                            formData.IsDefaultBOM ===
                            "1",

                        UseYN:
                            formData.UseYN ===
                            "1"
                    }
                };

                const res =
    await apiServer.post(
        "/Masterdata/DataService/Update",
        payload
    );

console.log("ADD RESPONSE:", res);

// VALIDATION
if (!res?.Success) {

    alert(
        res?.SLTN ||
        res?.ReturnMess ||
        "Add failed"
    );

    return;
}

// SUCCESS
alert("Add success");

setOpenPopup(false);

setFormData(defaultForm);

loadData();

            } catch (err) {

                console.log(
                    "ADD ERROR:",
                    err
                );

                alert(
                    "Add failed"
                );
            }
        };

    // =========================
    // UI
    // =========================

    return (

        <div className="app-content">

            <h2>
                BOM Master
            </h2>

            {/* SEARCH */}

            <form
                className="bom-search-form"
                onSubmit={(e) => {

                    e.preventDefault();

                    handleSearch();
                }}
            >

                <div className="bom-form-grid">

                    <select
                        name="ComponentItem"
                        value={
                            formData.ComponentItem
                        }
                        onChange={
                            handleChange
                        }
                    >

                        <option value="">
                            -- Select Item --
                        </option>

                        {itemList.map(
                            item => (

                                <option
                                    key={
                                        item.ItemCode
                                    }

                                    value={
                                        item.ItemCode
                                    }
                                >
                                    {item.ItemCode}
                                    {" - "}
                                    {item.ItemName}
                                </option>
                            )
                        )}

                    </select>

                    <input
                        type="text"
                        name="ComponentItemNm"
                        placeholder="Component Name"
                        value={
                            formData.ComponentItemNm
                        }
                        readOnly
                    />

                    <input
                        type="number"
                        min="1"
                        max="5"
                        name="BOMVersion"
                        placeholder="Version"
                        value={
                            formData.BOMVersion
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <select
                        name="Status"
                        value={
                            formData.Status
                        }
                        onChange={
                            handleChange
                        }
                    >

                        <option value="">
                            All Status
                        </option>

                        <option value="D">
                            Draft
                        </option>

                        <option value="R">
                            Release
                        </option>

                    </select>

                </div>

                <div className="bom-form-actions">

                    <button
                        type="button"
                        onClick={
                            handleAdd
                        }
                    >
                        Add
                    </button>

                    <button type="submit">
                        Search
                    </button>

                    <button
                        type="button"
                        onClick={
                            handleRefresh
                        }
                    >
                        Refresh
                    </button>

                    <button
                        type="button"
                        onClick={
                            handleClear
                        }
                    >
                        Clear
                    </button>

                </div>

            </form>

            {/* GRID */}

            <DataGrid
                ref={gridRef}
                height={500}
                dataSource={data}
                keyExpr="__id"
                showBorders={true}
                columnAutoWidth={true}
                rowAlternationEnabled={true}
                hoverStateEnabled={true}
                noDataText={loading ? "Loading..." : "No data"}
            >

                <Scrolling mode= "standard" showScrollbar="always"/>

                <SearchPanel
                    visible={true}
                />

                <Paging
                    pageSize={pageSize}
                    onPageIndexChange={onPageIndexChange}
                />

                <Pager
                    visible={true}
                    showInfo={true}
                    showPageSizeSelector={
                        false
                    }
                />

                <Column
                    dataField="ComponentItem"
                    caption="Component Code"
                />

                <Column
                    dataField="ComponentItemNm"
                    caption="Component Name"
                />

                <Column
                    dataField="BOMId"
                    caption="BOM ID"
                />

                <Column
                    dataField="BOMVersion"
                    caption="Version"
                />

                <Column
                    dataField="Quantity"
                    caption="Qty"
                />

                <Column
                    dataField="InventoryUOMNm"
                    caption="UOM"
                />

                <Column
                    dataField="ItemsGroupName"
                    caption="Group"
                />

                <Column
                    dataField="DefaultWarehouse"
                    caption="Warehouse"
                />

                <Column
                    dataField="CreateBy"
                    caption="Created By"
                />

                <Column
                    dataField="CreateDate"
                    caption="Created Date"
                />

            </DataGrid>

            {/* POPUP */}

            <Popup
                visible={openPopup}
                onHiding={() =>
                    setOpenPopup(false)
                }
                title="Add BOM"
                showCloseButton={true}
                width={800}
                height={650}
            >

                <div className="bom-popup-form">

                    <input
                        type="text"
                        name="ParentItem"
                        placeholder="Parent Item"
                        value={
                            formData.ParentItem
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <input
                        type="text"
                        name="ParentItemNm"
                        placeholder="Parent Item Name"
                        value={
                            formData.ParentItemNm
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <select
                        name="ComponentItem"
                        value={
                            formData.ComponentItem
                        }
                        onChange={
                            handleChange
                        }
                    >

                        <option value="">
                            -- Select Item --
                        </option>

                        {itemList.map(
                            item => (

                                <option
                                    key={
                                        item.ItemCode
                                    }

                                    value={
                                        item.ItemCode
                                    }
                                >
                                    {item.ItemCode}
                                    {" - "}
                                    {item.ItemName}
                                </option>
                            )
                        )}

                    </select>

                    <input
                        type="text"
                        name="ComponentItemNm"
                        value={
                            formData.ComponentItemNm
                        }
                        // readOnly
                    />

                    <input
                        type="number"
                        min="1"
                        max="5"
                        name="Quantity"
                        placeholder="Quantity"
                        value={
                            formData.Quantity
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <input
                        type="number"
                        min="1"
                        max="5"
                        name="BOMVersion"
                        placeholder="BOM Version"
                        value={
                            formData.BOMVersion
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <input
                        type="text"
                        name="InventoryUOM"
                        placeholder="Inventory UOM"
                        value={
                            formData.InventoryUOM
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <input
                        type="text"
                        name="InventoryUOMNm"
                        placeholder="Inventory UOM Name"
                        value={
                            formData.InventoryUOMNm
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <textarea
                        name="Remark"
                        placeholder="Remark"
                        value={
                            formData.Remark
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <select
                        name="Status"
                        value={
                            formData.Status
                        }
                        onChange={
                            handleChange
                        }
                    >

                        <option value="D">
                            Draft
                        </option>

                        <option value="R">
                            Release
                        </option>

                    </select>

                    <select
                        name="IsDefaultBOM"
                        value={
                            formData.IsDefaultBOM
                        }
                        onChange={
                            handleChange
                        }
                    >

                        <option value="1">
                            Yes
                        </option>

                        <option value="0">
                            No
                        </option>

                    </select>

                    <select
                        name="UseYN"
                        value={
                            formData.UseYN
                        }
                        onChange={
                            handleChange
                        }
                    >

                        <option value="1">
                            Active
                        </option>

                        <option value="0">
                            Inactive
                        </option>

                    </select>

                    <div className="popup-actions">

                        <button
                            type="button"
                            onClick={
                                handleSave
                            }
                        >
                            Save
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setOpenPopup(
                                    false
                                )
                            }
                        >
                            Cancel
                        </button>

                    </div>

                </div>

            </Popup>


            <div
                style={{
                    marginTop: 10
                }}
            >
                Total Rows:
                {" "}
                {totalRows}
            </div>

        </div>
    
                

);
}