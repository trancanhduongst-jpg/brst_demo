import { useState } from 'react';
import { message, Modal } from 'antd';
import { BRSTFilters, type BRSTFilterParams } from './components/BRSTFilters';
import { BRSTTable } from './components/BRSTTable';
import { mockBRSTData } from './mock/brstData';
import type { BRSTItem } from './types/brst';

function App() {
  const [tableData, setTableData] = useState<BRSTItem[]>(mockBRSTData);
  // Quản lý danh sách các Key của dòng đang được tick chọn checkbox
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Tính toán số lượng dòng chọn và tổng bộ số ngay lập tức để hiển thị lên Summary Bar
  const selectedRows = tableData.filter(item => selectedRowKeys.includes(item.key));
  const selectedCount = selectedRows.length;
  const selectedQuantity = selectedRows.reduce((sum, item) => sum + item.appliedQuantity, 0);

  // 1. Logic Tìm kiếm lọc dữ liệu
  const handleSearch = (filters: BRSTFilterParams) => {
    let result = [...mockBRSTData];

    if (filters.textSearch) {
      const keyword = filters.textSearch.trim().toLowerCase();
      result = result.filter((item) =>
        item.bookName.toLowerCase().includes(keyword) || item.itemCode.includes(keyword)
      );
    }
    if (filters.isCancel) {
      result = result.filter((item) => item.brstStatus === '申請取消');
    }
    setTableData(result);
    setSelectedRowKeys([]); // Reset checkbox sau khi lọc lại dữ liệu
  };

  const handleReset = () => {
    setTableData(mockBRSTData);
    setSelectedRowKeys([]);
  };

  // 2.Logic TRUNG TÂM XỬ LÝ CHỨC NĂNG CỦA CÁC NÚT BẤM (BUTTON ACTIONS)
  const handleButtonAction = (actionType: string) => {
    // Rào chắn bảo vệ: Nếu chưa chọn dòng nào, yêu cầu chọn ngay lập tức
    if (selectedRowKeys.length === 0) {
      message.warning('⚠️ 対象のアイテムを1件以上選択してください。(Vui lòng chọn ít nhất 1 dòng dữ liệu!)');
      return;
    }

    switch (actionType) {
      case '確定':
        // Cập nhật trạng thái 'Xác nhận nhà máy' cho các dòng được tích chọn
        setTableData(prev => prev.map(item => 
          selectedRowKeys.includes(item.key) ? { ...item, isFactoryConfirmed: true } : item
        ));
        message.success(`🎉 ${selectedRowKeys.length} 件の製造先を確定しました。(Đã xác nhận nhà máy thành công!)`);
        setSelectedRowKeys([]);
        break;

      case '確定解除':
        setTableData(prev => prev.map(item => 
          selectedRowKeys.includes(item.key) ? { ...item, isFactoryConfirmed: false } : item
        ));
        message.info('🔄 製造先確定を解除しました。(Đã hủy xác nhận nhà máy.)');
        setSelectedRowKeys([]);
        break;

      case 'Plines': { // 👈 THÊM DẤU NGOẶC NHỌN Ở ĐÂY ĐỂ SỬA LỖI ESLint
        // Giả lập đẩy dữ liệu đồng bộ sang hệ thống Plines
        const keyMessage = message.loading('📡 Plinesシステムへデータ連携中...', 1.5);
        setTimeout(() => {
          setTableData(prev => prev.map(item => 
            selectedRowKeys.includes(item.key) && item.brstStatus !== '申請取消'
              ? { ...item, brstStatus: '送信OK' } 
              : item
          ));
          keyMessage.then(() => message.success('✅ Plinesへのデータ連携が完了しました。(Đã đồng bộ dữ liệu sang Plines thành công!)'));
          setSelectedRowKeys([]);
        }, 1500);
        break;
      } // 👈 ĐÓNG DẤU NGOẶC NHỌN Ở ĐÂY

      case 'BRMS':{
        // Triển khai quy tắc nghiệp vụ đặc thù trong tài liệu:
        // Cảnh báo nếu có dòng chưa đạt trạng thái "送信OK" nhưng không khóa (Lock) dữ liệu.
        const hasInvalidStatus = selectedRows.some(item => item.brstStatus !== '送信OK');

        if (hasInvalidStatus) {
          Modal.confirm({
            title: '⚠️ 【警告】BRMS登録アラート (Cảnh báo nghiệp vụ hệ thống)',
            content: '原則として「送信OK」以外のアイテムはBRMS登録禁止ですが、お急ぎのため例外として登録を続行しますか？ (Thông thường chỉ đơn 送信OK mới được đăng ký BRMS. Bạn có chắc chắn muốn ép đẩy đơn khẩn cấp này không?)',
            okText: 'Cưỡng chế đăng ký (続行)',
            cancelText: 'Hủy thao tác (閉じる)',
            okButtonProps: { danger: true },
            onOk: () => executeBRMSRegistration()
          });
        } else {
          executeBRMSRegistration();
        }
        break;
      }
      default:
        message.info(`Chức năng [${actionType}] đang được xử lý giả lập.`);
    }
  };

  // Hàm phụ thực thi đổi trạng thái sang Sản xuất hoàn tất (製造完了) khi đăng ký BRMS thành công
  const executeBRMSRegistration = () => {
    setTableData(prev => prev.map(item => 
      selectedRowKeys.includes(item.key) ? { ...item, brstStatus: '製造完了' } : item
    ));
    message.success('🚀 工場計画システム（BRMS）への登録連携が完了しました！');
    setSelectedRowKeys([]);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-1 md:p-3 antialiased">
      <div className="w-full bg-white rounded border border-slate-300 pb-4 shadow-md">
        
        {/* Truyền các dữ liệu dòng chọn và hàm xử lý nút bấm xuống Filters component */}
        <BRSTFilters 
          onSearch={handleSearch} 
          onReset={handleReset} 
          selectedCount={selectedCount}
          selectedQuantity={selectedQuantity}
          onAction={handleButtonAction}
        />

        {/* Bảng dữ liệu chính kết nối trực tiếp state chọn dòng */}
        <BRSTTable 
          data={tableData} 
          selectedRowKeys={selectedRowKeys}
          onSelectChange={setSelectedRowKeys}
        />

        <div className="text-center text-[10px] text-slate-400 pt-4 font-mono">
          © 2026 BRST システム化開発 - 生産管理局 システム開発管理部 (Màn hình Phục vụ Nghiệm thu UI/UX)
        </div>
      </div>
    </div>
  );
}

export default App;