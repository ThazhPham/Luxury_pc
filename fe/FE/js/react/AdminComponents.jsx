// Reusable Admin Sidebar
const AdminSidebar = ({ active }) => {
    return (
        <div className="sidebar">
            <a href="../index.html" className="logo">LUXURY<span style={{fontWeight: 300}}>PC</span></a>
            <nav>
                <a href="./dashboard.html" className={`nav-link ${active === 'dashboard' ? 'active' : ''}`}><i className="fa-solid fa-chart-line"></i> Tổng Quan</a>
                <a href="./orders.html" className={`nav-link ${active === 'orders' ? 'active' : ''}`}><i className="fa-solid fa-box"></i> Đơn Hàng</a>
                <a href="./inventory.html" className={`nav-link ${active === 'inventory' ? 'active' : ''}`}><i className="fa-solid fa-warehouse"></i> Kho Hàng</a>
                <a href="./categories.html" className={`nav-link ${active === 'categories' ? 'active' : ''}`}><i className="fa-solid fa-layer-group"></i> Danh Mục</a>
                <a href="./products.html" className={`nav-link ${active === 'products' ? 'active' : ''}`}><i className="fa-solid fa-microchip"></i> Sản Phẩm</a>
                <a href="./vouchers.html" className={`nav-link ${active === 'vouchers' ? 'active' : ''}`}><i className="fa-solid fa-ticket"></i> Voucher</a>
                <a href="./flash-sales.html" className={`nav-link ${active === 'flash-sales' ? 'active' : ''}`}><i className="fa-solid fa-bolt"></i> Flash Sale</a>
                <a href="./account.html" className={`nav-link ${active === 'account' ? 'active' : ''}`}><i className="fa-solid fa-users"></i> Người Dùng</a>
                <a href="../account/auth.html" className="nav-link" style={{marginTop: '3rem', color: 'var(--red)'}}><i className="fa-solid fa-arrow-right-from-bracket"></i> Đăng Xuất</a>
            </nav>
        </div>
    );
};

// Reusable Admin Header
const AdminHeader = ({ title, subtitle, username }) => {
    return (
        <div className="header">
            <div className="title">
                <h1>{title}</h1>
                {subtitle && <p>{subtitle}</p>}
            </div>
            <div className="user-info">
                <i className="fa-solid fa-user-shield" style={{color: 'var(--gold)'}}></i>
                <span>{username || 'Admin'}</span>
            </div>
        </div>
    );
};

// Reusable DataGrid
const DataGrid = ({ columns, data, searchPlaceholder = "Tìm kiếm...", itemsPerPage = 10 }) => {
    const [search, setSearch] = React.useState('');
    const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'asc' });
    const [currentPage, setCurrentPage] = React.useState(1);

    // Filter
    const filteredData = React.useMemo(() => {
        if (!search) return data;
        return data.filter(item => {
            return Object.values(item).some(val => 
                String(val).toLowerCase().includes(search.toLowerCase())
            );
        });
    }, [data, search]);

    // Sort
    const sortedData = React.useMemo(() => {
        let sortableItems = [...filteredData];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                let aVal = a[sortConfig.key];
                let bVal = b[sortConfig.key];
                if (typeof aVal === 'string') aVal = aVal.toLowerCase();
                if (typeof bVal === 'string') bVal = bVal.toLowerCase();

                if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [filteredData, sortConfig]);

    // Pagination
    const totalPages = Math.ceil(sortedData.length / itemsPerPage) || 1;
    const currentData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div>
            <div className="datagrid-controls">
                <div className="datagrid-search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input 
                        type="text" 
                        placeholder={searchPlaceholder} 
                        value={search} 
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} 
                    />
                </div>
                <div style={{color: 'var(--muted)', fontSize: '0.85rem'}}>
                    Hiển thị {currentData.length} / {filteredData.length} kết quả
                </div>
            </div>

            <div style={{overflowX: 'auto'}}>
                <table>
                    <thead>
                        <tr>
                            {columns.map(col => (
                                <th key={col.key} onClick={() => col.sortable !== false && handleSort(col.key)} style={{cursor: col.sortable !== false ? 'pointer' : 'default'}}>
                                    {col.label}
                                    {sortConfig.key === col.key && (
                                        <i className={`fa-solid fa-sort-${sortConfig.direction === 'asc' ? 'up' : 'down'}`} style={{marginLeft: '5px', color: 'var(--gold)'}}></i>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.length > 0 ? currentData.map((row, index) => (
                            <tr key={row.id || index}>
                                {columns.map(col => (
                                    <td key={col.key} style={col.style}>
                                        {col.render ? col.render(row) : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={columns.length} style={{textAlign: 'center', padding: '2rem', color: 'var(--muted)'}}>
                                    Không có dữ liệu
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="datagrid-pagination">
                    <div>Trang {currentPage} / {totalPages}</div>
                    <div className="pagination-btns">
                        <button className="page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button 
                                key={i} 
                                className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button className="page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
