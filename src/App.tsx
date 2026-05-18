import { useState } from 'react';
import { BRSTFilters, type BRSTFilterParams } from './components/BRSTFilters';
import { BRSTTable } from './components/BRSTTable';
import { mockBRSTData } from './mock/brstData';
import type { BRSTItem } from './types/brst';

function App() {
  const [tableData, setTableData] = useState<BRSTItem[]>(mockBRSTData);

  // Xử lý bộ lọc tìm kiếm theo form mẫu mới
  const handleSearch = (filters: BRSTFilterParams) => {
    let result = [...mockBRSTData];

    // Lọc theo text nhập vào ô Text Search (Tìm kiếm gần đúng tên sách hoặc mã)
    if (filters.textSearch) {
      const keyword = filters.textSearch.trim().toLowerCase();
      result = result.filter((item) =>
        item.bookName.toLowerCase().includes(keyword) || 
        item.itemCode.includes(keyword)
      );
    }

    // Lọc trạng thái hủy đơn nếu check vào ô 申請取消
    if (filters.isCancel) {
      result = result.filter((item) => item.brstStatus === '申請取消');
    }

    setTableData(result);
  };

  const handleReset = () => {
    setTableData(mockBRSTData);
  };

  return (
    <div className="min-h-screen bg-white p-2 antialiased">
      <div className="w-full space-y-2">
        <BRSTFilters onSearch={handleSearch} onReset={handleReset} />
        <BRSTTable data={tableData} />
        <div className="text-center text-[11px] text-gray-400 pt-3 border-t border-gray-200">
          © 2026 BRST システム化開発 - 生産管理局 システム開発管理部
        </div>
      </div>
    </div>
  );
}

export default App;