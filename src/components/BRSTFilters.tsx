import React from 'react';
import { Button, Input, Select, Radio, Checkbox, Badge } from 'antd';

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
  selectedCount: number;
  selectedQuantity: number;
  onAction: (actionType: string) => void;
}

export const BRSTFilters: React.FC<BRSTFiltersProps> = ({ 
  onSearch, 
  onReset, 
  selectedCount, 
  selectedQuantity,
  onAction 
}) => {
  // 1. DEV CHỨC NĂNG ẨN/HIỆN BỘ LỌC: Quản lý trạng thái đóng mở (mặc định ban đầu là true - hiển thị)
  const [isFilterVisible, setIsFilterVisible] = React.useState(true);

  const [searchType, setSearchType] = React.useState('申請日');
  const [startDate, setStartDate] = React.useState('2026/01/01');
  const [endDate, setEndDate] = React.useState('2026/03/31');
  const [textSearch, setTextSearch] = React.useState('');
  const [isCancel, setIsCancel] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);

  return (
    <div className="w-full bg-white text-[11px] select-none text-slate-800 font-sans antialiased">
      
      {/* TOP BAR: Thanh tiêu đề hệ thống */}
      <div className="flex justify-between items-center border-b border-slate-300 bg-slate-50 px-3 py-1.5 shadow-2xs">
        <div className="font-bold text-[13px] text-slate-900 tracking-tight flex items-center gap-2">
          <span className="w-2 h-2 bg-indigo-600 rounded-xs"></span>
          BRST-G9999-進行管理 <span className="text-[10px] font-normal text-slate-400">v2.4</span>
        </div>
        <div className="flex bg-slate-200 p-0.5 rounded border border-slate-300">
          <button className="px-3 py-0.5 rounded-xs text-slate-600 hover:bg-white/50 transition-all">メニュー画面</button>
          <button className="px-3 py-0.5 rounded-xs bg-white font-bold text-indigo-700 shadow-2xs">進行管理</button>
          <button className="px-3 py-0.5 rounded-xs text-slate-600 hover:bg-white/50 transition-all">事前調整</button>
          <button className="px-3 py-0.5 rounded-xs text-slate-600 hover:bg-white/50 transition-all">管理画面</button>
        </div>
      </div>

      {/* BUTTON CHỨC NĂNG ẨN / HIỆN BỘ LỌC NHANH */}
      <div 
        onClick={() => setIsFilterVisible(!isFilterVisible)} // Đảo ngược trạng thái khi click
        className="text-indigo-600 font-semibold px-3 py-1 text-[10px] hover:text-indigo-800 cursor-pointer transition-colors w-fit flex items-center gap-1"
      >
        {isFilterVisible ? '▲ メニュー非表示 (Ẩn bộ lọc nhanh)' : '▼ メニュー表示 (Hiển thị bộ lọc)'}
      </div>

      {/* KHU VỰC ĐIỀU KIỆN TÌM KIẾM - Sẽ ẩn/hiện dựa trên biến isFilterVisible */}
      {isFilterVisible && (
        <div className="mx-2 p-2 border border-slate-200 bg-slate-50/50 rounded-sm grid grid-cols-12 gap-x-3 gap-y-2 items-center animate-fadeIn">
          
          {/* Bộ lọc thời gian */}
          <div className="col-span-5 flex items-center gap-2 flex-wrap">
            <Radio.Group value={searchType} onChange={(e) => setSearchType(e.target.value)} size="small">
              <Radio value="全件"><span className="text-[11px]">全件</span></Radio>
              <Radio value="申請日">
                <Select defaultValue="申請日" size="small" style={{ width: 80 }} className="text-[11px]" options={[{ value: '申請日', label: '申請日' }]} />
              </Radio>
            </Radio.Group>
            <span className="text-slate-400">:</span>
            <Input size="small" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ width: 90 }} className="text-center font-mono text-[11px]" />
            <span className="text-slate-400">～</span>
            <Input size="small" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ width: 90 }} className="text-center font-mono text-[11px]" />
            
            <Button size="small" type="primary" onClick={() => onSearch({ searchType, startDate, endDate, textSearch, isCancel, isCompleted })} className="bg-indigo-600 hover:bg-indigo-700 text-[11px] font-medium h-6">検索</Button>
            <Button size="small" onClick={onReset} className="text-[11px] h-6 border-slate-300">クリア</Button>
          </div>

          {/* Tìm kiếm tự do */}
          <div className="col-span-3 flex items-center gap-1.5">
            <Input size="small" placeholder="Nhập tên sách hoặc mã..." value={textSearch} onChange={(e) => setTextSearch(e.target.value)} className="text-[11px] h-6" />
            <Button size="small" className="text-[11px] h-6 border-slate-300 bg-white">テキスト検索</Button>
          </div>

          {/* Chọn khoảng lưu trữ phụ */}
          <div className="col-span-2 flex items-center gap-1 text-slate-500">
            <Input size="small" defaultValue="2025/10/01" style={{ width: 85 }} className="text-center font-mono text-[11px] h-6" />
            <span>～</span>
            <Input size="small" placeholder="年/月/日" style={{ width: 85 }} className="text-center font-mono text-[11px] h-6" />
          </div>

          {/* Dropdown danh sách báo cáo */}
          <div className="col-span-2 flex flex-col gap-1">
            <div className="w-full border border-slate-300 bg-white rounded-xs h-[48px] overflow-y-auto text-[10px] p-1 font-sans leading-tight shadow-2xs">
              <div className="px-1 py-0.5 bg-blue-50 text-indigo-900 font-semibold truncate">--1 つ選択してください--</div>
              <div className="px-1 py-0.5 hover:bg-slate-100 cursor-pointer text-slate-600 truncate">需要予測検証リスト (Danh sách kiểm chứng AI)</div>
              <div className="px-1 py-0.5 hover:bg-slate-100 cursor-pointer text-slate-600 truncate">所沢NGリスト (Danh sách lỗi Tokorozawa)</div>
            </div>
            <div className="flex justify-between items-center mt-0.5">
              <span className="text-[9px] text-rose-600 font-medium scale-95 tracking-tighter">※「差分確認」もここから出力</span>
              <Button size="small" className="text-[10px] h-5 px-1.5 bg-white border-slate-300 font-medium">ファイル出力</Button>
            </div>
          </div>

          {/* Checkbox Trạng thái */}
          <div className="col-span-12 flex gap-4 pl-[72px] -mt-1">
            <Checkbox checked={isCancel} onChange={(e) => setIsCancel(e.target.checked)}><span className="text-[11px] text-slate-600">申請取消 (Đơn đã hủy)</span></Checkbox>
            <Checkbox checked={isCompleted} onChange={(e) => setIsCompleted(e.target.checked)}><span className="text-[11px] text-slate-600">製造完了 (Sản xuất hoàn tất)</span></Checkbox>
          </div>
        </div>
      )}

      {/* 4. ACTION BUTTONS LAYER */}
      <div className="mx-2 mt-2 space-y-1">
        <div className="flex justify-between items-center">
          <div className="flex gap-1.5">
            <Button size="small" onClick={() => onAction('確定')} className="text-[11px] h-6 bg-slate-800 text-white hover:bg-slate-900 border-none font-medium px-2.5 shadow-2xs">製造先確定</Button>
            <Button size="small" onClick={() => onAction('確定解除')} className="text-[11px] h-6 bg-white border-slate-300 hover:text-rose-600 text-slate-600 px-2 shadow-2xs">製造先確定解除</Button>
            <Button size="small" onClick={() => onAction('Plines')} className="text-[11px] h-6 bg-amber-50 border-amber-300 hover:border-amber-400 text-amber-800 font-semibold px-3 shadow-2xs">Plines連携</Button>
            <Button size="small" onClick={() => onAction('BRMS')} className="text-[11px] h-6 bg-sky-50 border-sky-300 hover:border-sky-400 text-sky-800 font-semibold px-3 shadow-2xs">BRMS連携</Button>
            <Button size="small" onClick={() => onAction('取消')} className="text-[11px] h-6 bg-white border-slate-300 text-slate-500 px-2 shadow-2xs">取消確認</Button>
          </div>
          <Button size="small" onClick={() => onAction('TSV')} className="text-[11px] h-6 bg-white border-slate-400 font-medium shadow-2xs">BRMS製造依頼TSV出力</Button>
        </div>

        <div className="flex justify-between items-center pt-0.5 border-b border-slate-200 pb-2">
          <div className="flex gap-1">
            <Button size="small" className="text-[10px] h-5 px-1 bg-white border-slate-300 text-slate-500">最小</Button>
            <Button size="small" className="text-[10px] h-5 px-1 bg-slate-200 border-slate-400 font-medium text-slate-700">標準</Button>
            <Button size="small" className="text-[10px] h-5 px-1 bg-white border-slate-300 text-slate-500">全展開</Button>
            <span className="w-2"></span>
            <Button size="small" className="text-[10px] h-5 px-1 bg-white border-slate-300 text-slate-500">列順1</Button>
            <Button size="small" className="text-[10px] h-5 px-1 bg-white border-slate-300 text-slate-500">列順編集</Button>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-slate-400 mr-1 text-[10px]">共通フィルター:</span>
            <Select defaultValue="filter1" size="small" style={{ width: 120 }} className="text-[11px]" options={[{ value: 'filter1', label: '共有フィルター1' }]} />
            <Button size="small" className="text-[11px] h-5 bg-white border-slate-300">反映</Button>
          </div>
        </div>
      </div>

      {/* 5. SUMMARY DATA GRID BAR */}
      <div className="mx-3 my-2 flex justify-between items-center text-[11px] font-medium text-slate-600 bg-slate-50 p-1.5 border border-slate-200 rounded-xs">
        <div className="flex gap-6 items-center">
          <div>
            選択中の点数 / 部数 (Đang chọn):{' '}
            <Badge count={selectedCount} style={{ backgroundColor: '#10b981' }} className="mr-1 font-mono font-bold" /> dòng /{' '}
            <span className="font-mono font-bold text-slate-900 bg-slate-200 px-1 rounded">{selectedQuantity.toLocaleString()}</span> 部
          </div>
          <div className="border-l border-slate-300 h-3"></div>
          <div>
            選択中の久喜ページ数 : <span className="font-mono font-bold text-indigo-600">3,450</span> / [上限/日] <span className="font-mono text-slate-400">10,000</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 text-indigo-600 text-[10px]">
          <span className="text-slate-400 cursor-not-allowed">前の10件</span>
          <span className="font-bold text-slate-900 bg-white border border-slate-300 px-1 rounded shadow-2xs">1</span>
          <span className="cursor-pointer hover:underline px-0.5">2</span>
          <span className="text-slate-400">...8</span>
          <span className="cursor-pointer hover:underline font-semibold">次の10件</span>
        </div>
      </div>

    </div>
  );
};