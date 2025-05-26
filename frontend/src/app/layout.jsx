// src/app/layout.jsx
'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Toaster } from '@/components/ui/sonner'
import { getToken } from '@/lib/auth'
import './globals.css'

export default function RootLayout({ children }) {
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const token = getToken()
        const isAuthPage = pathname === '/login' || pathname === '/register'

        if (!token && !isAuthPage) {
            router.push('/login')
        }

        if (token && isAuthPage) {
            router.push('/home')
        }
    }, [pathname, router])

    return (
        <html lang="en">
            <body>
                <Toaster richColors position="top-center" />
                {children}
            </body>
        </html>
    )
}
