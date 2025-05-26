'use client'

import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import Link from 'next/link'

export default function RegisterPage() {
    const router = useRouter()
    const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
    const [form, setForm] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {

            if (form.password !== form.confirmPassword) {
                toast.error('Password dan konfirmasi password tidak cocok')
                return
            }

            const res = await axios.post(`${url}/users`, form)
            toast.success('Registrasi berhasil! Silakan login.')
            router.push('/login')
        } catch (err) {
            console.error(err)
            toast.error(err?.response?.data?.error || 'Gagal registrasi')
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            name="name"
                            type="text"
                            placeholder="Nama Lengkap"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            name="username"
                            type="text"
                            placeholder="Username"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            name="confirmPassword"
                            type="password"
                            placeholder="Konfirmasi Password Baru"
                            value={form.confirmPassword}
                            onChange={handleChange}
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" /> Loading
                                </>
                            ) : (
                                'Register'
                            )}
                        </Button>
                        <div className="text-center text-sm text-gray-500 mt-2">
                            Sudah punya akun?{' '}
                            <Link href="/login" className="text-blue-600 hover:underline">
                                Login
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
