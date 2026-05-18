import type { BRSTItem, DetailRow } from '../types/brst';

// Dữ liệu giả lập cho bảng chính Tiến độ quản lý (進行管理)
export const mockBRSTData: BRSTItem[] = [
  {
    key: '1',
    id: 1,
    brstStatus: '送信OK',
    itemCode: '322203001804',
    bookName: '火燥鳥生、陰り',
    edition: '0-34-1',
    subGenre: '日本文学',
    appliedQuantity: 105,
    factory: '所沢',
    pvn: '002:個別帯',
    scheduledSendDate: '2026/02/03',
    arrivalDate: '2026/02/10',
    mlpStatus: 'MLP本文中にあり',
    bppStatus: '承認',
    isDemandForecast: true // Item tự động từ BEC AI [cite: 58]
  },
  {
    key: '2',
    id: 2,
    brstStatus: '送信OK',
    itemCode: '322203001805',
    bookName: '学問のすすめ',
    edition: '0-12-2',
    subGenre: '人文書',
    appliedQuantity: 500,
    factory: '久喜', // Điều hướng về nhà máy 久喜 theo điều kiện riêng [cite: 210]
    pvn: '001:標準帯',
    scheduledSendDate: '2026/02/04',
    arrivalDate: '2026/02/12',
    mlpStatus: 'なし',
    bppStatus: '承認',
    isDemandForecast: false
  },
  {
    key: '3',
    id: 3,
    brstStatus: '修正待ち',
    itemCode: '322203001806',
    bookName: '夜間飛行',
    edition: '1-02-1',
    subGenre: '外国文学',
    appliedQuantity: 70,
    factory: '朝霞',
    pvn: '002:個別帯',
    scheduledSendDate: '2026/02/06',
    arrivalDate: '2026/02/15',
    mlpStatus: 'MLP本文中にあり',
    bppStatus: '未承認', // BPP chưa duyệt nên BRST ở trạng thái chờ [cite: 211, 212]
    isDemandForecast: true
  },
  {
    key: '4',
    id: 4,
    brstStatus: '申請取消',
    itemCode: '322203001807',
    bookName: '銀河鉄道の夜',
    edition: '0-45-1',
    subGenre: '日本文学',
    appliedQuantity: 200,
    factory: 'オフ', // Tự động chuyển sang in Off-set và ẩn đi [cite: 210]
    pvn: '001:標準帯',
    scheduledSendDate: '2026/02/07',
    arrivalDate: '2026/02/18',
    mlpStatus: 'なし',
    bppStatus: '未承認',
    isDemandForecast: false
  }
];

// Dữ liệu giả lập hiển thị chi tiết khi click mở rộng dòng (Master-Detail) [cite: 104]
export const mockDetailData: Record<string, DetailRow[]> = {
  '1': [
    { key: 'd1', phase: '修正増減課', status: '完了', updatedAt: '2026/02/02 10:00', note: '著者確認OK、修正反映済み' },
    { key: 'd2', phase: '重版課', status: '完了', updatedAt: '2026/02/02 14:30', note: '重版承認データ連携完了' },
    { key: 'd3', phase: 'PDFITC連携', status: '待機中', updatedAt: '2026/02/03 09:00', note: 'MLP入力待機フラグ表示中' }
  ],
  '3': [
    { key: 'd4', phase: '修正増減課', status: '作業中', updatedAt: '2026/02/03 11:00', note: '音楽著作権(JASRAC)の申請番号確認中' },
    { key: 'd5', phase: '重版課', status: '未着手', updatedAt: '--', note: '修正増減課の完了待ち' }
  ]
};