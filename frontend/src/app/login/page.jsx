'use client'

import { Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import axios from 'axios'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getToken, saveToken } from '@/lib/auth'
import Link from 'next/link'

export default function LoginPage() {
    const router = useRouter()
    const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
    const [form, setForm] = useState({ username: '', password: '' })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const token = getToken()
        if (token) {
            router.push('/home')
        }
    }, [router])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post(`${url}/login`, form)
            saveToken(res.data.token)
            toast.success('Login berhasil!')
            router.push('/home')
        } catch (err) {
            toast.error('Username atau password salah!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            id="username"
                            type="text"
                            placeholder="Masukkan username"
                            name="username"
                            value={form.username ?? ''}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            id="password"
                            placeholder="Masukkan password"
                            name="password"
                            type="password"
                            value={form.password ?? ''}
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" /> Loading
                                </>
                            ) : (
                                'Login'
                            )}
                        </Button>
                        <div className="text-center text-sm text-gray-500 mt-2">
                            Belum punya akun?{' '}
                            <Link href="/register" className="text-blue-600 hover:underline">
                                Daftar
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
