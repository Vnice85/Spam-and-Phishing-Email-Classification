'use client';
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import EmailDetailModal from '@/components/EmailDetailModal';
import { Star } from 'lucide-react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheckDouble, faClock, faInbox, faTrash, faExclamationTriangle, faTags, faRobot, faFilter, faPen, faRotateRight, faEye } from '@fortawesome/free-solid-svg-icons';
import ComposeEmailModal from '@/components/ComposeEmailModal';
import React from 'react';
import {
    getEmails as getEmailsOriginal,
    getEmailDetail,
    syncEmails,
    searchEmails,
    classifyEmails
} from '@/services/api';

// Define the Email type
type Email = {
    id: string;
    subject: string;
    sender: string;
    snippet: string;
    content?: string;
    date: string;
    isRead: boolean;
    labels: string[];
};

const Page = () => {
    const [emails, setEmails] = useState<Email[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
    const [searchContent, setSearchContent] = useState('');
    const [isEmailDetailOpen, setIsEmailDetailOpen] = useState(false);
    const [isClassify, setIsClassify] = useState(false);



    const fetchEmails = async () => {
        try {
            await syncEmails(); // Trigger sync first
            const response = await getEmailsOriginal({
                pageindex: 1,
                pagesize: 20,
                labelname: 'SPAM',
                directionname: 'INBOX',
            });

            const mappedEmails = response.map((item: any, index: number) => ({
                id: item.emailId,
                subject: item.subject || '(Không có tiêu đề)',
                sender: item.fromAddress || 'Không rõ người gửi',
                snippet: item.snippet || '(Không có nội dung)',
                content: item.body || item.details?.body || item.snippet || '(No content available)',
                date: item.sentDate || item.receivedDate || new Date().toISOString(),
                isRead: true, // Cần cập nhật theo trường hợp thực tế nếu API cung cấp
                labels: item.labelName ? [item.labelName] : ['Chưa gắn nhãn'],
            }));

            setEmails(mappedEmails);
        } catch (error) {
            console.error('Failed to fetch emails:', error);
        }
    };

    useEffect(() => {
        fetchEmails();
    }, []);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchContent.trim() === '') {
                return; // Không tìm kiếm nếu không có nội dung
            }
            try {
                const response = await searchEmails(1, 20, searchContent);
                console.log('Search Results:', response);

                const mappedEmails = response.map((item: any) => ({
                    id: item.emailId,
                    subject: item.subject || '(Không có tiêu đề)',
                    sender: item.fromAddress || 'Không rõ người gửi',
                    snippet: item.snippet || '(Không có nội dung)',
                    content: item.body || item.details?.body || item.snippet || '(No content available)',
                    date: item.sentDate || item.receivedDate || new Date().toISOString(),
                    isRead: true, // Cần cập nhật theo trường hợp thực tế nếu API cung cấp
                    labels: item.labelName ? [item.labelName] : ['Chưa gắn nhãn'],
                }));
                setEmails(mappedEmails);
            } catch (error) {
                console.error('Lỗi tìm kiếm email:', error);
            }
        };

        fetchSearchResults();
    }, [searchContent]);

    useEffect(() => {
        if (isClassify) {
            const classify = async () => {
                try {
                    const result = await classifyEmails();
                    console.log('Kết quả phân loại:', result);

                    fetchEmails();
                } catch (error) {
                    console.error('Lỗi phân loại email:', error);
                    alert('Không thể phân loại email. Vui lòng thử lại sau.');
                }
            };
            classify();

            setIsClassify(false);
        }
    }, [isClassify]);

    const toggleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleOpenEmailModal = () => {
        setIsEmailDetailOpen(true);
    }

    const handleEmailClick = async (emailId: string) => {
        try {
            console.log('ID gửi đi:', emailId);
            const detail = await getEmailDetail(emailId.trim());
            const email: Email = {
                id: detail.emailId,
                subject: detail.subject || '(Không có tiêu đề)',
                sender: detail.fromAddress || 'Không rõ người gửi',
                snippet: detail.snippet || '',
                content: detail.body || '(Không có nội dung)',
                date: detail.sentDate || detail.receivedDate || new Date().toISOString(),
                isRead: true,
                labels: [detail.labelName || 'Chưa gắn nhãn'],
            };
            setSelectedEmail(prev => ({
                ...prev,
                ...email,
            }));
        } catch (error) {
            console.error('Lỗi lấy nội dung email:', error);
        }
    };
    console.log('Selected Email:', selectedEmail);
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 text-gray-800">
            <div className="sticky top-0 h-screen">
                <Sidebar
                    onCompose={handleOpenEmailModal}
                    setSearchContent={setSearchContent}
                    setIsClassify={setIsClassify}
                />
            </div>
            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                {emails.map(email => (
                    <div key={email.id} className="border border-gray-300 rounded-md p-4 shadow-sm bg-white flex gap-4 items-start">
                        <input
                            type="checkbox"
                            className="mt-1 accent-blue-500"
                            checked={selectedIds.includes(email.id)}
                            onChange={() => toggleSelect(email.id)}
                        />
                        <div className="flex-1">
                            <button onClick={() => handleEmailClick(email.id)}>
                                <h3 className="text-lg font-semibold text-blue-700 hover:underline">{email.subject}</h3>
                            </button>
                            <p className="text-sm text-gray-500 mb-1">Từ: {email.sender}</p>
                            <div
                                className="text-sm text-gray-700"
                                dangerouslySetInnerHTML={{ __html: email.content || email.snippet }}
                            />
                            <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                                <span>{new Date(email.date).toLocaleString()}</span>
                                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{email.labels.join(', ')}</span>
                            </div>
                        </div>
                        <button onClick={() => console.log('Starred')}>
                            <Star size={16} className="text-yellow-500" />
                        </button>
                    </div>
                ))}
            </div>
            {selectedEmail && (
                <EmailDetailModal
                    email={{ ...selectedEmail, content: selectedEmail?.content || '' }}
                    onClose={() => setSelectedEmail(null)}
                    markAsUnread={(id: string) => {
                        setEmails(prevEmails =>
                            prevEmails.map(email =>
                                email.id === id ? { ...email, isRead: false } : email
                            )
                        );
                    }}
                />
            )}
            {isEmailDetailOpen && (
                <ComposeEmailModal
                    onClose={() => setIsEmailDetailOpen(false)}
                    onCompose={() => console.log('Compose email')}
                />
            )}
        </div>
    );
};

export default Page;