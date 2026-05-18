import React from 'react';
import { Table, Tag, Badge } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { BRSTItem, DetailRow } from '../types/brst';
import { mockDetailData } from '../mock/brstData';

interface BRSTTableProps {
  data: BRSTItem[];
  selectedRowKeys: React.Key[];
  onSelectChange: (newSelectedRowKeys: React.Key[]) => void;
}

export const BRSTTable: React.FC<BRSTTableProps> = ({ data, selectedRowKeys, onSelectChange }) => {
  
  const columns: ColumnsType<BRSTItem> = [
    { title: 'No.', dataIndex: 'id', key: 'id', width: 55, align: 'center' },
    {
      title: 'BRSTステータス (Trạng thái)',
      dataIndex: 'brstStatus',
      key: 'brstStatus',
      width: 120,
      align: 'center',
      render: (status: string, record) => {
        let color = 'default';
        if (status === '送信OK') color = 'success';
        if (status === '修正待ち') color = 'warning';
        if (status === '申請取消') color = 'error';
        if (status === '製造完了') color = 'processing';
        return (
          <div className="flex flex-col gap-1 items-center">
            <Tag color={color} className="font-semibold m-0 text-[11px]">{status}</Tag>
            {record.isFactoryConfirmed && (
              <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200 font-medium scale-90">確定済</span>
            )}
          </div>
        );
      },
    },
    { title: 'アイテムコード', dataIndex: 'itemCode', key: 'itemCode', width: 120, align: 'center', className: 'font-mono text-gray-700 font-medium' },
    {
      title: '書名 (Tên sách)',
      dataIndex: 'bookName',
      key: 'bookName',
      className: 'font-medium text-gray-950',
      render: (text: string, record: BRSTItem) => (
        <div className="flex items-center gap-2">
          <span className="truncate max-w-[200px]" title={text}>{text}</span>
          {record.isDemandForecast && (
            <Badge count="AI予測" style={{ backgroundColor: '#8b5cf6', color: '#fff', fontSize: '9px', height: '16px', lineHeight: '16px' }} />
          )}
        </div>
      ),
    },
    { title: '版', dataIndex: 'edition', key: 'edition', width: 75, align: 'center', className: 'font-mono text-gray-600' },
    { title: '小ジャンル', dataIndex: 'subGenre', key: 'subGenre', width: 100 },
    {
      title: '部数',
      dataIndex: 'appliedQuantity',
      key: 'appliedQuantity',
      width: 90,
      align: 'right',
      render: (num: number) => <span className="font-mono font-bold text-slate-900">{num.toLocaleString()}</span>,
    },
    {
      title: '製造先 (Nhà máy)',
      dataIndex: 'factory',
      key: 'factory',
      width: 90,
      align: 'center',
      render: (factory: string) => {
        const colors: Record<string, string> = { '所沢': 'blue', '久喜': 'purple', '朝霞': 'cyan', 'オフ': 'orange' };
        return <Tag color={colors[factory] || 'default'} className="m-0 text-[11px]">{factory || '未定'}</Tag>;
      },
    },
    { title: 'PVN', dataIndex: 'pvn', key: 'pvn', width: 110, className: 'text-[11px] text-gray-500 truncate' },
    { title: '送信予定日', dataIndex: 'scheduledSendDate', key: 'scheduledSendDate', width: 105, align: 'center', className: 'font-mono text-gray-600' },
    { title: '出来予定日', dataIndex: 'arrivalDate', key: 'arrivalDate', width: 105, align: 'center', className: 'font-mono text-emerald-700 font-medium' },
    {
      title: 'MLP状態',
      dataIndex: 'mlpStatus',
      key: 'mlpStatus',
      width: 130,
      render: (status: string) => (
        <span className={`text-[11px] ${status.includes('あり') ? 'text-amber-600 font-semibold' : 'text-gray-400'}`}>{status}</span>
      ),
    },
    {
      title: 'BPP承認',
      dataIndex: 'bppStatus',
      key: 'bppStatus',
      width: 85,
      align: 'center',
      render: (status: string) => <Badge status={status === '承認' ? 'success' : 'default'} text={<span className="text-[11px]">{status}</span>} />,
    },
  ];

  const expandedRowRender = (record: BRSTItem) => {
    const detailData = mockDetailData[record.key] || [];
    const detailColumns: ColumnsType<DetailRow> = [
      { title: '作業フェーズ (Giai đoạn)', dataIndex: 'phase', key: 'phase', width: 150, render: (text) => <span className="font-medium text-gray-700">📋 {text}</span> },
      { 
        title: 'ステータス', dataIndex: 'status', key: 'status', width: 100, align: 'center',
        render: (status) => {
          let color = 'default';
          if (status === '完了') color = 'green';
          if (status === '作業中') color = 'blue';
          if (status === '待機中') color = 'orange';
          return <Tag color={color} className="m-0 text-[10px]">{status}</Tag>;
        }
      },
      { title: '更新日時', dataIndex: 'updatedAt', key: 'updatedAt', width: 140, align: 'center', className: 'font-mono text-gray-500 text-[11px]' },
      { title: '進捗備考 (Ghi chú chi tiết từ hệ thống BPP / PDFITC)', dataIndex: 'note', key: 'note', className: 'text-gray-600 text-[11px]' },
    ];

    return (
      <div className="p-2.5 bg-slate-50 border border-dashed border-slate-300 rounded shadow-inner">
        <div className="text-[11px] font-bold text-indigo-900 mb-1.5 flex items-center gap-1">
          <span>➔ 関連システム連携進捗状況 (Chi tiết đồng bộ hệ thống vệ tinh)</span>
        </div>
        <Table<DetailRow> columns={detailColumns} dataSource={detailData} pagination={false} bordered size="small" className="bg-white" />
      </div>
    );
  };

  // Cấu hình tính năng Hộp kiểm chọn dòng (Checkbox Selection)
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="bg-white rounded border border-slate-200 shadow-xs overflow-hidden mx-2">
      <Table<BRSTItem>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        expandable={{
          expandedRowRender,
          rowExpandable: (record) => ['1', '3'].includes(record.key),
          defaultExpandedRowKeys: ['1'],
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          showTotal: (total) => <span className="text-gray-500 font-medium">Hiển thị kết quả: {total} dòng</span>,
        }}
        scroll={{ x: 1450, y: 480 }}
        bordered
        size="small"
        rowClassName={(record) => {
          if (record.brstStatus === '申請取消') return 'bg-red-50/40 hover:bg-red-50/60';
          if (record.isFactoryConfirmed) return 'bg-emerald-50/20 hover:bg-emerald-50/40';
          return 'hover:bg-slate-50/80';
        }}
      />
    </div>
  );
};