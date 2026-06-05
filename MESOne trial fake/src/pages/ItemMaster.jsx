import { useEffect, useState, useCallback, useRef } from "react";

import DataGrid, {
    Column,
    Paging,
    Pager,
    SearchPanel,
    Scrolling
} from "devextreme-react/data-grid";

import { TabPanel, Item } from "devextreme-react/tab-panel";

import "../css/ItemMaster.css";
import apiServer from "../api/apiServer";

export default function ItemMasterPage() {

    // =========================
    // STATE
    // =========================
    const [data, setData]                 = useState([]);
    const [loading, setLoading]           = useState(false);
    const [saving, setSaving]             = useState(false);

    const [pageIndex, setPageIndex]       = useState(1);
    const pageIndexRef                    = useRef(1);
    const [pageSize]                      = useState(20);

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [detailData, setDetailData]     = useState(null);

    const [toast, setToast]               = useState(null);
    const [dragOver, setDragOver]         = useState(false);

    // =========================
    // MASTER DATA
    // =========================

    const itemGroupList = [
        "Điện tử",
        "Thực phẩm",
        "Nguyên vật liệu",
        "Bao bì",
        "Thành phẩm"
    ];

    const itemClassList = [
        "Raw Material",
        "Semi Finished",
        "Finished Goods",
        "Trading",
        "Service"
    ];

    const uomList = [
        "PCS",
        "BOX",
        "KG",
        "M",
        "SET"
    ];

    const warehouseList = [
        "WH-A",
        "WH-B",
        "WH-C",
        "WH-D",
        "WH-E"
    ];


    // =========================
    // HELPERS
    // =========================
    const showToast = (type, msg) => {
        setToast({ type, msg });
        setTimeout(() => setToast(null), 3000);
    };

    const handleFieldChange = (field) => (e) => {
        const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setDetailData(prev => ({ ...prev, [field]: val }));
    };

    // =========================
    // LOAD DATA
    // =========================

    // const clearDetailData = () => {
    //     setDetailData({
    //         ...detailData,
    //         ...originalDetailData,

    //         Itemname="",
    //         ItemsGroupName="",
    //         InventoryUOM="",
    //         DefaultWarehouse="",
    //         CustomerItemCode="",
    //         ItemSize="",
    //         PlantCd="",
    //         PlantNm=""

    // });
    // };

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await apiServer.getItemMaster(pageIndexRef.current, pageSize);
            console.log("ITEM API RESPONSE:", res);
            const raw  = res?.Data || res?.data?.Data || res?.list || [];
            const list = Array.isArray(raw) ? raw : (raw?.List || []);
            setData(list);
            
        } catch (err) {
            console.log("LOAD ERROR:", err);
            setData([]);
        } finally {
            setLoading(false);
        }
        
    }, [pageSize]);

    useEffect(() => {
        pageIndexRef.current = pageIndex;
        loadData();
    }, [pageIndex, loadData]);

    // =========================
    // ROW CLICK
    // =========================
    const handleRowClick = (e) => {
        if (!e?.data) return;
        setDetailData({ ...e.data });
        setIsDetailOpen(true);
    };

    const validateForm = () => {

    if (!detailData?.ItemCode?.trim()) {
        return "Mã hàng không được để trống";
    }

    if (!detailData?.ItemName?.trim()) {
        return "Tên hàng không được để trống";
    }

    if (!detailData?.ItemsGroupCode) {
        return "Vui lòng chọn nhóm hàng";
    }

    if (!detailData?.InventoryUOM) {
        return "Vui lòng chọn UOM";
    }

    if (!detailData?.DefaultWarehouse) {
        return "Vui lòng chọn kho";
    }

    return null;
};


    // =========================
    // SAVE
    // =========================
const handleSave = async () => {

    if (!detailData) return;

    // =========================
    // VALIDATE
    // =========================

    const validateError =
        validateForm();

    if (validateError) {

        showToast(
            "error",
            validateError
        );

        return;
    }

    try {

        setSaving(true);

        const res =
            await apiServer.updateItemMaster(detailData);

        console.log(
            "SAVE RESPONSE:",
            res
        );

        // SUCCESS
        if (
            res?.Success === true ||
            res?.success === true
        ) {

            showToast(
                "success",
                res?.Message ||
                "Lưu thành công"
            );

            setData(prev =>

                prev.map(row =>

                    row.ItemCode === detailData.ItemCode

                        ? {
                            ...row,
                            ...detailData
                        }

                        : row
                )
            );

            return;
        }

        // FAIL
        showToast(
            "error",

            res?.Message ||
            res?.ReturnMess ||
            res?.SLTN ||
            "Lưu thất bại"
        );

    } catch (err) {

        console.error(
            "SAVE ERROR:",
            err
        );

        showToast(
            "error",

            err?.response?.data?.Message ||
            err?.message ||
            "Lỗi kết nối server"
        );

    } finally {

        setSaving(false);
    }
};

    // =========================
    // PAGE CHANGE
    // =========================
    const onPageIndexChange = useCallback((newZeroBase) => {
        const newPage = newZeroBase + 1;
        if (newPage !== pageIndexRef.current) {
            pageIndexRef.current = newPage;
            setPageIndex(newPage);
        }
    }, []);

    // =========================
    // IMAGE UPLOAD
    // =========================
    const handleImageDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer?.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (ev) => setDetailData(prev => ({ ...prev, _imagePreview: ev.target.result }));
            reader.readAsDataURL(file);
        }
    };

    const handleImageInput = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setDetailData(prev => ({ ...prev, _imagePreview: ev.target.result }));
            reader.readAsDataURL(file);
        }
    };

    // =========================
    // TAB: CHUNG — layout giống ảnh
    // =========================
const renderChung = () => (

    <div className="im-form">

        {/* =========================
            ROW 1
        ========================= */}

        <div className="im-row">

            <div className="im-field">

                <label className="im-label">
                    Mã hàng
                </label>

                <input
                    className="im-input im-input--readonly"
                    value={detailData?.ItemCode || ""}
                    readOnly
                />

            </div>

            <div className="im-field">

                <label className="im-label">
                    Tên hàng
                </label>

                <input
                    className="im-input"
                    value={detailData?.ItemName || ""}
                    onChange={handleFieldChange("ItemName")}
                />

            </div>

        </div>

        {/* =========================
            ROW 2
        ========================= */}

        <div className="im-row">

            <div className="im-field">

                <label className="im-label">
                    Nhóm hàng
                </label>

                <select
                    className="im-select"
                    value={detailData?.ItemsGroupName || ""}
                    onChange={handleFieldChange("ItemsGroupName")}
                >

                    <option value="">
                        -- Chọn nhóm --
                    </option>

                    {itemGroupList.map(group => (

                        <option
                            key={group}
                            value={group}
                        >
                            {group}
                        </option>

                    ))}

                </select>

            </div>

            <div className="im-field">

                <label className="im-label">
                    Loại hàng
                </label>

                <select
                    className="im-select"
                    value={detailData?.U_ItemClas || ""}
                    onChange={handleFieldChange("U_ItemClas")}
                >

                    <option value="">
                        -- Chọn loại --
                    </option>

                    {itemClassList.map(type => (

                        <option
                            key={type}
                            value={type}
                        >
                            {type}
                        </option>

                    ))}

                </select>

            </div>

        </div>

        {/* =========================
            ROW 3
        ========================= */}

        <div className="im-row">

            <div className="im-field">

                <label className="im-label">
                    Đơn vị tính
                </label>

                <select
                    className="im-select"
                    value={detailData?.InventoryUOM || ""}
                    onChange={handleFieldChange("InventoryUOM")}
                >

                    <option value="">
                        -- Chọn UOM --
                    </option>

                    {uomList.map(uom => (

                        <option
                            key={uom}
                            value={uom}
                        >
                            {uom}
                        </option>

                    ))}

                </select>

            </div>

            <div className="im-field">

                <label className="im-label">
                    Kho mặc định
                </label>

                <select
                    className="im-select"
                    value={detailData?.DefaultWarehouse || ""}
                    onChange={handleFieldChange("DefaultWarehouse")}
                >

                    <option value="">
                        -- Chọn kho --
                    </option>

                    {warehouseList.map(warehouse => (

                        <option
                            key={warehouse}
                            value={warehouse}
                        >
                            {warehouse}
                        </option>

                    ))}

                </select>

            </div>

        </div>

        {/* =========================
            ROW 4
        ========================= */}

        <div className="im-row">

            <div className="im-field">

                <label className="im-label">
                    Mã SP khách hàng
                </label>

                <input
                    className="im-input"
                    value={detailData?.CustomerItemCode || ""}
                    onChange={handleFieldChange("CustomerItemCode")}
                />

            </div>

            <div className="im-field">

                <label className="im-label">
                    Kích thước
                </label>

                <input
                    className="im-input"
                    value={detailData?.ItemSize || ""}
                    onChange={handleFieldChange("ItemSize")}
                />

            </div>

        </div>

        {/* =========================
            ROW 5
        ========================= */}

        <div className="im-row">

            <div className="im-field">

                <label className="im-label">
                    Plant Code
                </label>

                <input
                    className="im-input"
                    value={detailData?.PlantCd || ""}
                    onChange={handleFieldChange("PlantCd")}
                />

            </div>

            <div className="im-field">

                <label className="im-label">
                    Plant Name
                </label>

                <input
                    className="im-input"
                    value={detailData?.PlantNm || ""}
                    onChange={handleFieldChange("PlantNm")}
                />

            </div>

        </div>

        {/* =========================
            ROW 8
        ========================= */}

        <div className="im-row">

            <div className="im-field">

                <label className="im-label">
                    Người tạo
                </label>

                <input
                    className="im-input im-input--readonly"
                    value={detailData?.CreateBy || ""}
                    readOnly
                />

            </div>

            <div className="im-field">

                <label className="im-label">
                    Người cập nhật
                </label>

                <input
                    className="im-input im-input--readonly"
                    value={detailData?.UpdateBy || ""}
                    readOnly
                />

            </div>

        </div>

        {/* =========================
            ROW 9
        ========================= */}

        <div className="im-row">

            <div className="im-field">

                <label className="im-label">
                    Ngày tạo
                </label>

                <input
                    type="date"
                    className="im-input im-input--readonly"
                    value={
                        detailData?.CreateDate
                            ?.substring(0, 10) || ""
                    }
                    readOnly
                />

            </div>

            <div className="im-field">

                <label className="im-label">
                    Ngày cập nhật
                </label>

                <input
                    type="date"
                    className="im-input im-input--readonly"
                    value={
                        detailData?.UpdateDate
                            ?.substring(0, 10) || ""
                    }
                    readOnly
                />

            </div>

        </div>

        {/* =========================
            IMAGE
        ========================= */}

        <div className="im-image-section">

            <label
                className="im-upload-btn"
                htmlFor="im-img-input"
            >
                📁 Tải ảnh
            </label>

            <input
                id="im-img-input"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageInput}
            />

            <div
                className={`im-drop-zone ${
                    dragOver
                        ? "im-drop-zone--active"
                        : ""
                }`}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                }}
                onDragLeave={() =>
                    setDragOver(false)
                }
                onDrop={handleImageDrop}
            >

                {detailData?._imagePreview ? (

                    <img
                        src={detailData._imagePreview}
                        alt="preview"
                        className="im-img-preview"
                    />

                ) : (

                    <span className="im-drop-hint">
                        Kéo ảnh vào đây
                    </span>

                )}

            </div>

        </div>

    </div>

);

    // =========================
    // TAB: SẢN XUẤT
    // =========================
    const renderSanXuat = () => (
        <div className="im-form">
            <div className="im-empty-tab">
                <span>⚙️</span>
                <p>Thông tin sản xuất chưa có dữ liệu</p>
            </div>
        </div>
    );

    // =========================
    // TAB: KHO
    // =========================
    const renderKho = () => (
        <div className="im-form">
            <div className="im-row">
                <div className="im-field">
                    <label className="im-label">Kho mặc định</label>
                    <input
                        className="im-input im-input--readonly"
                        value={detailData?.DefaultWarehouse || ""}
                        readOnly={true}
                        onChange={() => {}}
                    />
                </div>
            </div>
            <div className="im-empty-tab" style={{ marginTop: 16 }}>
                <span>🏭</span>
                <p>Thông tin kho bổ sung chưa có dữ liệu</p>
            </div>
        </div>
    );

    // =========================
    // TAB: LOG
    // =========================
    const renderLog = () => (
        <div className="im-form">
            <div className="im-row">
                <div className="im-field">
                    <label className="im-label">Tạo bởi</label>
                    <input
                        className="im-input im-input--readonly"
                        value={detailData?.CreateBy ?? ""}
                        readOnly={true}
                        onChange={() => {}}
                    />
                </div>
                <div className="im-field">
                    <label className="im-label">Ngày tạo</label>
                    <input
                        className="im-input im-input--readonly"
                        value={detailData?.CreateDate ?? ""}
                        readOnly={true}
                        onChange={() => {}}
                    />
                </div>
            </div>
        </div>
    );

    // =========================
    // RENDER
    // =========================
    return (
        <div className="app-content">

            <h2 className="page-title">Item Master</h2>

            {/* TOAST */}
            {toast && (
                <div className={`im-toast im-toast--${toast.type}`}>
                    {toast.type === "success" ? "✔" : "✖"} {toast.msg}
                </div>
            )}

             {console.log("DATA GRID DATA:", data)}

            <DataGrid
                height={600}
                dataSource={data}
                keyExpr="ItemCode"
                showBorders={true}
                hoverStateEnabled={true}
                focusedRowEnabled={true}
                allowColumnResizing={true}
                columnAutoWidth={true}
                onRowClick={handleRowClick}
                noDataText={loading ? "Đang tải dữ liệu..." : "Không có dữ liệu"}
            >
                <Scrolling mode="standard" showScrollbar="always" />
                <SearchPanel visible={true} />

                <Paging
                    pageSize={pageSize}
                    onPageIndexChange={onPageIndexChange}
                />

                <Pager
                    visible={true}
                    showInfo={true}
                    showPageSizeSelector={false}
                    infoText="Trang {0} / {1} ({2} bản ghi)"
                />

                <Column dataField="ItemCode"  caption="Mã hàng"   />
                <Column dataField="ItemName"  caption="Tên hàng"  />
                <Column dataField="ItemsGroupName" caption="Nhóm hàng" />
                <Column dataField="InventoryUOM"   caption="ĐVT"  />
                <Column dataField="SumOnHand" caption="Số lượng tồn kho" />
                <Column dataField="CreateBy"  caption="Tạo bởi"  />
                <Column dataField="CreateDate" caption="Ngày tạo" />
                <Column dataField="UpdateBy"  caption="Cập nhật bởi"  />
                <Column dataField="UpdateDate" caption="Ngày cập nhật" />
                <Column dataField="DefaultWarehouse" caption="Kho mặc định" />
                <Column dataField="WorkCenterDefault" caption="Kích thước" />
            </DataGrid>

            {/* =====================
                DETAIL OVERLAY
            ===================== */}
            {isDetailOpen && (
                <div className="overlay-detail">

                    {/* HEADER */}
                    <div className="overlay-header">
                        <div className="overlay-header__left">
                            <h3>Chi tiết</h3>
                        </div>
                        <div className="overlay-header__actions">
                            <button className="overlay-icon-btn" title="Làm mới" onClick={loadData}>↻</button>
                            <button className="overlay-icon-btn" title="Đóng" onClick={() => setIsDetailOpen(false)}>✕</button>
                        </div>
                    </div>

                    {/* BODY */}
                    <div className="overlay-body">
                        <TabPanel deferRendering={false} animationEnabled={true}>
                            <Item title="Chung"    render={renderChung}   />
                            <Item title="Sản xuất" render={renderSanXuat} />
                            <Item title="Kho"      render={renderKho}     />
                            <Item title="Log"      render={renderLog}     />
                        </TabPanel>
                    </div>

                    {/* FOOTER */}
                    <div className="overlay-footer">
                        <button
                            className="btn-save"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? (
                                <span className="btn-saving">
                                    <span className="spinner" /> Đang lưu...
                                </span>
                            ) : "Lưu"}
                        </button>
                    </div>

                </div>
            )}

        </div>
    );
}