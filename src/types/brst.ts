// Định nghĩa cấu trúc dữ liệu dòng tiến độ BRST dựa theo Mockup và Tài liệu nghiệp vụ
export interface BRSTItem {
  key: string;               // Khóa duy nhất cho mỗi dòng (Yêu cầu của AntD Table)
  id: number;                // Số thứ tự hiển thị
  brstStatus: '送信OK' | '申請取消' | '製造完了' | '修正待ち'; // Trạng thái BRST [cite: 210, 212, 213]
  itemCode: string;          // Mã sản phẩm (Item Code) [cite: 154]
  bookName: string;          // Tên sách (Book Name) [cite: 154]
  edition: string;           // Phiên bản / Ấn bản [cite: 154]
  subGenre: string;          // Tiểu thể loại (Ví dụ: 日本文学 - Văn học Nhật Bản) [cite: 154]
  appliedQuantity: number;   // Số lượng đăng ký重版 (Số bộ/cuốn) [cite: 154]
  factory: '所沢' | '久喜' | '朝霞' | 'オフ'; // Nhà máy sản xuất (製造先) [cite: 210]
  pvn: string;               // Mã PVN [cite: 211]
  scheduledSendDate: string; // Ngày dự kiến gửi dữ liệu (送信予定日) [cite: 211]
  arrivalDate: string;       // Ngày hàng đến / Thành phẩm (出来予定日) [cite: 139, 212]
  mlpStatus: 'MLP本文中にあり' | 'なし'; // Trạng thái bản quyền âm nhạc (MLP) [cite: 213]
  bppStatus: '承認' | '未承認'; // Trạng thái phê duyệt từ hệ thống BPP [cite: 211]
  isDemandForecast: boolean; // Có phải là item từ AI Dự báo nhu cầu không (BEC AI) [cite: 58, 211]
  isFactoryConfirmed?: boolean; // 👈 THÊM DÒNG NÀY VÀO ĐỂ SỬA LỖI TYPESCRIPT
}

// Định nghĩa dữ liệu chi tiết lồng nhau (Master-Detail) cho phần mở rộng của dòng
export interface DetailRow {
  key: string;
  phase: string;             // Giai đoạn công việc
  status: string;            // Tình trạng chi tiết
  updatedAt: string;         // Thời gian cập nhật
  note: string;              // Ghi chú tiến độ
}