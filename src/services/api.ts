import axios from 'axios';

// Auth
export const refreshToken = async () => {
  const token = localStorage.getItem('jwtToken');
  const res = await axios.get('https://localhost:44366/auth/refreshtoken', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Email API
// GET /emails
// export const getEmails = async () => {
//   const token = localStorage.getItem('jwtToken');
//   const res = await axios.get('https://localhost:44366/email/messages?pageindex=1&pagesize=20&labelname=SPAM&directionname=INBOX', {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data;
// };

// GET /emails/:id
// export const getEmailDetail = async (id: string) => {
export const getEmailDetail = async (emailId: string) => {
  const token = localStorage.getItem('jwtToken');
  const res = await axios.get(
    `https://localhost:44366/email/messages/${emailId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// GET /classify/:id
export const classifyEmails = async (id: string) => {
  const token = localStorage.getItem('jwtToken');
  const res = await axios.get(`https://localhost:44366/classify/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// POST /emails
export const sendEmail = async (payload: {
  to: string;
  subject: string;
  content: string;
}) => {
  const token = localStorage.getItem('jwtToken');
  const res = await axios.post('https://localhost:44366/emails', payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// POST /emails/draft
export const createDraftEmail = async (payload: {
  to: string;
  subject: string;
  content: string;
}) => {
  const token = localStorage.getItem('jwtToken');
  const res = await axios.post('https://localhost:44366/emails/draft', payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// DELETE /emails/:id
export const deleteEmail = async (id: string) => {
  const token = localStorage.getItem('jwtToken');
  const res = await axios.delete(`https://localhost:44366/emails/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// GET /emails/search?keyword=abc
export const searchEmails = async (keyword: string) => {
  const token = localStorage.getItem('jwtToken');
  const res = await axios.get(`https://localhost:44366/emails/search?keyword=${encodeURIComponent(keyword)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const syncEmails = async () => {
  const token = localStorage.getItem('jwtToken');
  const res = await axios.get('https://localhost:44366/email/sync', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// GET /email/messages
export const getEmails = async (params: {
  pageindex?: number;
  pagesize?: number;
  labelname?: string;
  directionname?: string;
}) => {
  const token = localStorage.getItem('jwtToken');
  const { pageindex = 1, pagesize = 100, labelname = 'SPAM', directionname = 'INBOX' } = params;
  const res = await axios.get(`https://localhost:44366/email/messages?pageindex=${pageindex}&pagesize=${pagesize}&labelname=${labelname}&directionname=${directionname}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateDraftEmail = async (id: string, payload: {
  toAddress: string;
  subject: string;
  body: string;
}) => {
  const token = localStorage.getItem('jwtToken');
  const res = await axios.put(`https://localhost:44366/email/drafts/${id}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
export const EMAIL_API = {
  // getEmail,
  getEmailDetail,
  classifyEmails,
  sendEmail,
  createDraftEmail,
  deleteEmail,
  searchEmails,
  syncEmails,
  getEmails,
};