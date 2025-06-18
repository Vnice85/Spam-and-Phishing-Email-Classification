'use client'

import { useEffect, useState } from 'react'
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPenToSquare,
  faInbox,
  faCalendar,
  faTags,
  faUserFriends,
  faShoppingCart,
  faPlus,
  faEnvelope,
  faPaperPlane,
  faPen,
  faTrash,
  faCog,
  faQuestionCircle,
  faSearch,
  faSignOutAlt,
  faBars,
  faRobot
} from "@fortawesome/free-solid-svg-icons"
import { autoRefreshToken } from '@/utils/auth'

type Props = {
  onCompose: () => void
  setSearchContent: (query: string) => void
  setIsClassify: (isClassify: boolean) => void
}

export function Sidebar({ onCompose, setSearchContent, setIsClassify }: Props) {
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const name = localStorage.getItem('userName') || ''
    const email = localStorage.getItem('userEmail') || ''
    const image = localStorage.getItem('profileImage') || ''
    setUserName(name)
    setUserEmail(email)
    setProfileImage(image)
  }, [])

  const [showSidebar, setShowSidebar] = useState(false)


  const handleSearch = () => {
    setSearchContent(searchQuery)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      autoRefreshToken()
    }, 2 * 60 * 1000) // refresh mỗi 2 phút
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {!showSidebar && (
        <button
          onClick={() => setShowSidebar(true)}
          className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
          title="Mở menu"
        >
          <FontAwesomeIcon icon={faBars} className="w-4 h-4" />
        </button>
      )}
      <aside
        className={`w-64 h-screen overflow-y-auto border-r border-gray-200 bg-gray-50 flex flex-col px-4 py-6 space-y-6 text-sm text-gray-800 fixed top-0 left-0 z-30 transition-transform duration-300 ${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative`}
      >
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={() => setShowSidebar(false)}
            className="text-gray-500 hover:text-black"
            title="Đóng menu"
          >
            ×
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src={profileImage || 'https://i.pravatar.cc/40'} className="rounded-full w-8 h-8" alt="avatar" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{userName || 'Guest'}</span>
              <span className="text-xs text-gray-500">{userEmail || 'No email'}</span>
            </div>
          </div>
          <button
            onClick={onCompose}
            className="p-2 rounded hover:bg-gray-200"
            title="Soạn Email"
          >
            <FontAwesomeIcon icon={faPenToSquare} className="text-gray-600 w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded bg-gray-100 text-sm placeholder-gray-400"
          />
          <button
            onClick={() => handleSearch()}
            className="absolute left-2 top-2.5"
          >
            <FontAwesomeIcon icon={faSearch} className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Views */}
        <div>
          <div className="uppercase text-xs text-gray-400 mb-1">Views</div>
          <SidebarItem icon={faInbox} label="Inbox" href="/" badge="99+" active />
          {/* <SidebarItem icon={faUserFriends} label="GitHub" href="#" badge="40" />
          <SidebarItem icon={faCalendar} label="Calendar" href="#" />
          <SidebarItem icon={faTags} label="Labels" href="#" badge="99+" />
          <SidebarItem icon={faUserFriends} label="Social" href="#" badge="99+" />
          <SidebarItem icon={faShoppingCart} label="Promotions" href="#" badge="99+" /> */}
          {/* <div className="flex items-center text-gray-500 hover:underline cursor-pointer text-sm mt-1">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add view
          </div> */}
        </div>

        {/* Mail */}
        <div>
          <div className="uppercase text-xs text-gray-400 mb-1">Công cụ</div>
          {/* <SidebarItem icon={faEnvelope} label="All Mail" href="/all" />
          <SidebarItem icon={faPaperPlane} label="Sent" href="/send" />
          <SidebarItem icon={faPen} label="Drafts" href="/drafts" />
          <SidebarItem icon={faTrash} label="Trash" href="/trash" />\ */}
          <button onClick={() => { setIsClassify(true) }}>
            <SidebarItem icon={faRobot} label="Auto labeling" href="#" />
          </button>
        </div>

        {/* Others */}
        <div className="mt-auto space-y-2">

          <button
            onClick={() => {
              localStorage.clear()
              window.location.href = '/login'
            }}
            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 text-sm text-gray-800 w-full"
            title="Đăng xuất"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside >
    </>
  )
}

function SidebarItem({
  icon,
  label,
  href,
  badge,
  active
}: {
  icon: any
  label: string
  href: string
  badge?: string
  active?: boolean
}) {
  return (
    <Link href={href}>
      <div className={`flex items-center justify-between px-2 py-1 rounded hover:bg-gray-100 ${active ? 'bg-gray-100 font-semibold' : ''}`}>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={icon} className="w-4 h-4" />
          <span>{label}</span>
        </div>
        {badge && <span className="text-xs text-gray-500">{badge}</span>}
      </div>
    </Link>
  )
}