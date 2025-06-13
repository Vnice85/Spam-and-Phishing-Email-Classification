'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPaperPlane, faTrash, faSave } from '@fortawesome/free-solid-svg-icons'

type Props = {
  onClose: () => void
  user?: {
    name: string
    email: string
    avatarUrl: string
  }

  onCompose?: () => void

}

export default function ComposeEmailModal({ onClose, onCompose, user }: Props) {
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')

  const handleSend = () => {
    console.log('Sending email:', { to, subject, content })
    onCompose?.()
    onClose()
  }

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50 p-4 overflow-auto">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow border border-gray-200 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">New mail</h2>
          <div className="flex items-center space-x-3 text-gray-400 text-xl">
            <button onClick={onClose}>×</button>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">From</label>
          <div className="flex items-center gap-3">
            <img src={user?.avatarUrl || 'https://i.pravatar.cc/40'} className="rounded-full w-8 h-8" alt="avatar" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{user?.name || 'nguyen the van'}</span>
              <span className="text-xs text-gray-500">{user?.email || 'zanngyn@gmail.com'}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">To</label>
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Recipient email"
          />
        </div>

        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          className="w-full text-xl font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white bg-opacity-60 backdrop-blur-md rounded-md px-2 py-2 border border-gray-300 shadow-sm"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
          placeholder="Compose your message..."
        />
        <div className="mt-2">
          <label className="block text-sm text-gray-500 mb-1">Attachments</label>
          <input type="file" className="text-sm" />
        </div>




        <div className="flex justify-end items-center text-sm text-gray-500 pt-4 border-t">
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="w-10 h-10 justify-center text-sm rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors shadow-sm flex items-center"
              title="Delete"
            >
              <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
            </button>
            <button
              onClick={() => alert('Draft saved')}
              className="w-10 h-10 justify-center bg-blue-100 text-blue-700 rounded hover:bg-blue-200 flex items-center text-sm"
              title="Save draft"
            >
              <FontAwesomeIcon icon={faSave} className="w-5 h-5" />
            </button>
            <button
              onClick={handleSend}
              className="w-10 h-10 justify-center bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center text-sm"
              title="Send email"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}