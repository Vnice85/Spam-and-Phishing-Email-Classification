'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faReply, faArchive, faTrash, faTimes as faClose } from '@fortawesome/free-solid-svg-icons'
import { deleteEmail } from '@/services/api'

type Props = {
  onClose: () => void
  email: {
    subject: string
    // fromAddress: string
    // toAddress: string
    // sentDate: string
    // body: string
    id: string;
    sender: string;
    snippet: string;
    content?: string;
    date: string;
    isRead: boolean;
    labels: string[];
  }
  markAsUnread?: (id: string) => void
}


export default function EmailDetailModal({ onClose, email, markAsUnread }: Props) {
  if (!email) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg p-6 shadow max-w-xl w-full text-center">
          <p className="text-gray-600">Không có nội dung email để hiển thị.</p>
        </div>
      </div>
    )
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xoá email này?');

    if (!confirmDelete) return;

    try {
      const result = await deleteEmail(email.id);
      console.log('Xoá email thành công:', result);

      alert('Email đã được xoá thành công.');
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Xoá email thất bại:', error);
      alert('Không thể xoá email. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="relative bg-white max-w-4xl w-full rounded-lg shadow-xl p-6 overflow-y-auto max-h-[90vh] space-y-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Chi tiết Email</h1>
          <h2 className="text-xl font-semibold text-gray-900">{email.subject}</h2>

          <div className="text-sm text-gray-700 space-y-1">
            <div><span className="font-semibold">Người gửi:</span> <span>{email.sender}</span></div>
            {/* <div><span className="font-semibold">Người nhận:</span> <span>{email.toAddress}</span></div> */}
            <div className="text-xs text-gray-500">
              <span className="font-medium">Thời gian gửi:</span>{' '}
              {email.date ? new Date(email.date).toLocaleString() : '(không rõ)'}
            </div>
          </div>

          <hr className="my-2" />

          <h3 className="text-base font-medium text-gray-900">Nội dung Mail</h3>
          <div
            className="prose max-w-none text-gray-800 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: email.content || '' }}
          />
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              onClick={() => alert('Trả lời email')}
              className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:underline"
            >
              <FontAwesomeIcon icon={faReply} />
              <span>Trả lời</span>
            </button>
            <button
              onClick={() => alert('Lưu trữ email')}
              className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:underline"
            >
              <FontAwesomeIcon icon={faArchive} />
              <span>Lưu trữ</span>
            </button>
            <button
              onClick={() => handleDelete()}
              className="flex items-center space-x-1 px-3 py-1 text-sm text-red-600 hover:underline"
            >
              <FontAwesomeIcon icon={faTrash} />
              <span>Xoá</span>
            </button>
            <button
              onClick={onClose}
              className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-500 hover:underline"
            >
              <FontAwesomeIcon icon={faClose} />
              <span>Đóng</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}