'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated, loginWithGoogle } from '@/utils/auth'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/') // Đã login thì về home
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-pink-300 p-4 font-sans">
      <div className="w-full max-w-sm bg-white/30 backdrop-blur-xl border border-white/40 rounded-xl shadow-2xl p-8 text-center space-y-6 text-gray-800">
        <h1 className="text-2xl font-bold tracking-tight">Đăng nhập với Google</h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          Bạn cần đăng nhập <br />để sử dụng hệ thống phân loại email.
        </p>
        <button
          onClick={() => loginWithGoogle(() => router.push('/'))}
          className="w-full py-2 rounded-full text-base font-medium text-white bg-gradient-to-br from-blue-500 to-purple-500 hover:brightness-110 hover:shadow-lg hover:shadow-purple-400/50 transition"
        >
          Đăng nhập với Google
        </button>
      </div>
    </div>
  )
}