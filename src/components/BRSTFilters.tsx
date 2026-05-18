import React from 'react';
import { Button, Input, Select, Radio, Checkbox } from 'antd'; // Đã bỏ 'Space' không dùng đến

// Định nghĩa cấu trúc kiểu dữ liệu cụ thể cho bộ lọc
export interface BRSTFilterParams {
  searchType: string;
  startDate: string;
  endDate: string;
  textSearch: string;
  isCancel: boolean;
  isCompleted: boolean;
}

interface BRSTFiltersProps {
  onSearch: (filters: BRSTFilterParams) => void;
  onReset: () => void;
}

export const BRSTFilters: React.FC<BRSTFiltersProps> = ({ onSearch, onReset }) => {
  // Quản lý State chuẩn dữ liệu tìm kiếm theo đúng mockup
  const [searchType, setSearchType] = React.useState('申請日');
  const [startDate, setStartDate] = React.useState('2026/01/01');
  const [endDate, setEndDate] = React.useState('2026/03/31');
  const [textSearch, setTextSearch] = React.useState('');
  const [isCancel, setIsCancel] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);

  const handleSearch = () => {
    onSearch({ searchType, startDate, endDate, textSearch, isCancel, isCompleted });
  };

  const handleResetClick = () => {
    setSearchType('申請日');
    setStartDate('2026/01/01');
    setEndDate('2026/03/31');
    setTextSearch('');
    setIsCancel(false);
    setIsCompleted(false);
    onReset();
  };

  return (
    <div className="w-full bg-white text-[12px] select-none text-gray-800 font-sans">
      
      {/* 1. TOP BAR: TIÊU ĐỀ HỆ THỐNG & THANH MENU CHUYỂN TAB */}
      <div className="flex justify-between items-center border-b border-gray-400 bg-white px-2 py-1">
        <div className="font-bold text-[14px] text-black tracking-tight">
          BRST-G9999-進行管理
        </div>
        <div className="flex border-l border-t border-gray-400">
          <button className="border-r border-b border-gray-400 px-4 py-1 bg-gray-100 hover:bg-gray-200 text-xs">メニュー画面</button>
          <button className="border-r border-b border-gray-400 px-4 py-1 bg-blue-100 font-bold text-blue-800 text-xs">進行管理</button>
          <button className="border-r border-b border-gray-400 px-4 py-1 bg-gray-100 hover:bg-gray-200 text-xs">事前調整</button>
          <button className="border-r border-b border-gray-400 px-4 py-1 bg-gray-100 hover:bg-gray-200 text-xs">管理画面</button>
          <button className="border-r border-b border-gray-400 px-4 py-1 bg-gray-100 hover:bg-gray-200 text-xs">ログアウト</button>
        </div>
      </div>

      {/* 2. SUB-TOGGLE MENU */}
      <div className="text-blue-700 font-semibold px-2 py-1 cursor-pointer hover:underline text-[11px]">
        ▲ メニュー非表示
      </div>

      {/* 3. KHU VỰC ĐIỀU KIỆN TÌM KIẾM (SEARCH CONDITIONS PANEL) */}
      <div className="mx-2 p-2 border border-gray-300 bg-gray-50/50 rounded-sm grid grid-cols-12 gap-x-4 gap-y-2 items-start">
        
        {/* Cột trái: Bộ lọc thời gian & Checkbox trạng thái */}
        <div className="col-span-5 space-y-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Radio.Group value={searchType} onChange={(e) => setSearchType(e.target.value)} size="small" className="text-xs">
              <Radio value="全件"><span className="text-xs">全件</span></Radio>
              <Radio value="申請日">
                <Select 
                  defaultValue="申請日" 
                  size="small" 
                  style={{ width: 90 }} 
                  className="text-xs"
                  options={[{ value: '申請日', label: '申請日' }, { value: '出来日', label: '出来日' }]}
                />
              </Radio>
            </Radio.Group>
            
            <span className="text-gray-400 mx-1">:</span>
            
            <Input size="small" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ width: 95 }} className="text-center font-mono text-xs" />
            <span className="text-gray-500">～</span>
            <Input size="small" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ width: 95 }} className="text-center font-mono text-xs" />
            
            <Button size="small" type="default" onClick={handleSearch} className="bg-white border-gray-400 hover:bg-gray-100 text-xs px-3 font-medium shadow-xs">検索</Button>
            <Button size="small" type="default" onClick={handleResetClick} className="bg-white border-gray-400 hover:bg-gray-100 text-xs px-3 text-gray-600 shadow-xs">クリア</Button>
          </div>

          {/* Hàng Checkbox trạng thái ẩn/hiện */}
          <div className="flex items-center gap-4 pl-14">
            <Checkbox checked={isCancel} onChange={(e) => setIsCancel(e.target.checked)}><span className="text-xs">申請取消</span></Checkbox>
            <Checkbox checked={isCompleted} onChange={(e) => setIsCompleted(e.target.checked)}><span className="text-xs">製造完了</span></Checkbox>
          </div>
        </div>

        {/* Cột giữa: Ô tìm kiếm văn bản tự do */}
        <div className="col-span-3 flex items-center gap-1.5">
          <Input 
            size="small" 
            placeholder="" 
            value={textSearch}
            onChange={(e) => setTextSearch(e.target.value)}
            className="font-mono text-xs"
          />
          <Button size="small" className="bg-white border-gray-400 text-xs whitespace-nowrap shadow-xs">テキスト検索</Button>
        </div>

        {/* Cột phụ: Chọn khoảng lưu trữ phụ */}
        <div className="col-span-2 flex items-center gap-1 text-[11px]">
          <Input size="small" defaultValue="2025/10/01" style={{ width: 90 }} className="text-center font-mono text-xs" />
          <span>～</span>
          <Input size="small" placeholder="年 /月 /日" style={{ width: 90 }} className="text-center font-mono text-xs" />
        </div>

        {/* Cột phải: Danh sách báo cáo nghiệp vụ (Listbox xuất file) */}
        <div className="col-span-2 flex flex-col gap-1 items-end">
          <div className="w-full border border-gray-400 bg-white rounded-xs h-[68px] overflow-y-auto text-[11px] p-1 font-mono leading-tight shadow-inner">
            <div className="px-1 py-0.5 bg-blue-50 text-blue-900 font-medium truncate">--1 つ選択してください--</div>
            <div className="px-1 py-0.5 hover:bg-gray-100 cursor-pointer truncate text-gray-700">久喜進行中アイテム（データ送信前）_共有用</div>
            <div className="px-1 py-0.5 hover:bg-gray-100 cursor-pointer truncate text-gray-700">需要予測検証リスト</div>
            <div className="px-1 py-0.5 hover:bg-gray-100 cursor-pointer truncate text-gray-700">所沢NGリスト</div>
            <div className="px-1 py-0.5 hover:bg-gray-100 cursor-pointer truncate text-gray-700">製造リードタイム調査リスト</div>
            <div className="px-1 py-0.5 hover:bg-gray-100 cursor-pointer truncate text-gray-700">納期調整履歴一覧</div>
          </div>
          <div className="flex items-center gap-2 mt-1 w-full justify-between">
            <span className="text-[10px] text-red-600 font-semibold tracking-tighter">※「差分確認」もここから出力を想定</span>
            <Button size="small" className="bg-white border-gray-400 font-medium text-xs px-2 shadow-xs">ファイル出</Button>
          </div>
        </div>

      </div>

      {/* 4. HÀNG NÚT THAO TÁC NGHIỆP VỤ HÀNG LOẠT (ACTION BUTTONS ROW 1 & 2) */}
      <div className="mx-2 mt-3 space-y-1.5">
        {/* Hàng Action chính 1 */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <Button size="small" className="bg-white border-gray-400 text-[11px] px-2 h-6 shadow-xs">製造先確定</Button>
            <Button size="small" className="bg-white border-gray-400 text-[11px] px-2 h-6 shadow-xs">製造先確定解除</Button>
            <Button size="small" className="bg-white border-gray-400 text-[11px] px-2 h-6 text-blue-700 font-medium shadow-xs">Plines連携</Button>
            <Button size="small" className="bg-white border-gray-400 text-[11px] px-2 h-6 text-blue-700 font-medium shadow-xs">BRMS連携</Button>
            <Button size="small" className="bg-white border-gray-400 text-[11px] px-2 h-6 shadow-xs">取消確認</Button>
          </div>
          <div>
            <Button size="small" className="bg-white border-gray-400 text-[11px] px-2 h-6 shadow-xs">BRMS製造依頼TSV出</Button>
          </div>
        </div>

        {/* Hàng Action chính 2 */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <Button size="small" className="bg-white border-gray-400 text-[11px] px-2 h-6 shadow-xs">製造先選定</Button>
            <Button size="small" className="bg-white border-gray-400 text-[11px] px-2 h-6 shadow-xs">進行確認</Button>
            <Button size="small" className="bg-white border-gray-400 text-[11px] px-2 h-6 shadow-xs">送信手配</Button>
          </div>
          <div className="flex items-center gap-1">
            <Button size="small" className="bg-white border-gray-400 text-[11px] px-2 h-6 shadow-xs">カスタムフィルター</Button>
            <Select defaultValue="共有フィルター1" size="small" style={{ width: 130 }} className="text-xs" options={[{ value: '共有フィルター1', label: '共有フィルター1 　▼' }]} />
            <Button size="small" className="bg-white border-gray-400 text-[11px] px-2 h-6 shadow-xs">反映</Button>
          </div>
        </div>

        {/* Hàng cấu hình hiển thị lưới (Grid View Controls) */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <div className="flex gap-1">
            <Button size="small" className="bg-white border-gray-400 text-[11px] px-1.5 h-5 shadow-xs">最小</Button>
            <Button size="small" className="bg-white border-gray-400 text-[11px] px-1.5 h-5 shadow-xs">標準</Button>
            <Button size="small" className="bg-white border-gray-400 text-[11px] px-1.5 h-5 shadow-xs">全展開</Button>
            <span className="w-[10px]"></span>
            <Button size="small" className="bg-white border-gray-400 text-[11px] px-1.5 h-5 shadow-xs">列順1</Button>
            <Button size="small" className="bg-white border-gray-400 text-[11px] px-1.5 h-5 shadow-xs">列順2</Button>
            <Button size="small" className="bg-white border-gray-400 text-[11px] px-1.5 h-5 shadow-xs">列順編集</Button>
            <Button size="small" className="bg-white border-gray-400 text-[11px] px-1.5 h-5 shadow-xs">列幅リセッ</Button>
          </div>
          <div className="flex gap-1">
            <Button size="small" className="bg-white border-gray-400 text-[11px] px-2 h-5 shadow-xs">フィルター1</Button>
            <Button size="small" className="bg-white border-gray-400 text-[11px] px-2 h-5 shadow-xs">フィルター2</Button>
            <Button size="small" className="bg-white border-gray-400 text-[11px] px-2 h-5 shadow-xs">フィルター3</Button>
            <Button size="small" className="bg-white border-gray-400 text-[11px] px-2 h-5 shadow-xs">フィルター管</Button>
          </div>
        </div>
      </div>

      {/* 5. THÔNG TIN BÁO CÁO SỐ LƯỢNG (SUMMARY COUNTERS BAR) */}
      <div className="mx-2 my-2 flex justify-between items-center text-[11px] text-gray-700 font-medium">
        <div className="flex gap-6">
          <div>
            選択中の点数 / 部数 : <span className="font-mono font-bold text-black">9,999</span> / <span className="font-mono font-bold text-black">999,999,999</span>
          </div>
          <div>
            選択中の久喜ページ数 : <span className="font-mono font-bold text-black">999,999,999</span> / [上限/日] <span className="font-mono text-gray-500">999,999,999</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-blue-700 text-[11px]">
          <span className="cursor-pointer hover:underline text-gray-400">前の10件</span>
          <span className="font-bold text-black border-b border-black px-0.5">1</span>
          <span className="cursor-pointer hover:underline px-0.5">2</span>
          <span className="cursor-pointer hover:underline px-0.5">3</span>
          <span className="cursor-pointer hover:underline px-0.5">4</span>
          <span className="cursor-pointer hover:underline px-0.5">5</span>
          <span className="text-gray-400">...8</span>
          <span className="cursor-pointer hover:underline font-semibold">次の10件</span>
        </div>
      </div>

    </div>
  );
};