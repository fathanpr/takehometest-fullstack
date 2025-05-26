'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { removeToken, getUserIdFromToken, getToken } from '@/lib/auth'

export default function HomePage() {
    const router = useRouter()
    const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [name, setName] = useState('')
    const [form, setForm] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)

    useEffect(() => {
        const token = getToken()
        if (token) {
            const userId = getUserIdFromToken();

            axios
                .get(`${url}/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    setIsAuthenticated(true)
                    setName(res.data.name)
                    setForm({
                        name: res.data.name,
                        username: res.data.username,
                        email: res.data.email,
                        password: '',
                        confirmPassword: '',
                    })
                })
                .catch(() => {
                    toast.error('Session expired')
                    localStorage.removeItem('token')
                    router.push('/login')
                })
        } else {
            toast.error('Anda harus login terlebih dahulu')
            router.push('/login')
        }
    }, [router])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleLogout = () => {
        removeToken()
        toast.success('Logout berhasil')
        router.push('/login')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoadingUpdate(true)

        try {
            const userId = getUserIdFromToken();
            const token = getToken();

            if (form.password && form.password !== form.confirmPassword) {
                toast.error('Password dan konfirmasi password tidak sama')
                return
            }

            const res = await axios.put(`${url}/users/${userId}`, form, {
                headers: { Authorization: `Bearer ${token}` },
            })
            toast.success('Update profile berhasil!')
            setForm({
                ...form,
                password: '',
                confirmPassword: '',
            })
        } catch (err) {
            console.error(err)
            toast.error(err?.response?.data?.error || 'Gagal Update Profile')
        } finally {
            setLoadingUpdate(false)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        setLoadingDelete(true)

        try {
            const userId = getUserIdFromToken();
            const token = getToken();

            await axios.delete(`${url}/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            toast.success('Akun berhasil dihapus')
            localStorage.removeItem('token')
            router.push('/login')
        } catch (err) {
            console.error(err)
            toast.error(err?.response?.data?.error || 'Gagal menghapus akun')
        } finally {
            setLoadingDelete(false)
        }
    }

    return (
        isAuthenticated ? (
            <div className="flex items-center justify-center min-h-screen">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className='text-sm'>Hai, {name}</CardTitle>
                            <Button onClick={handleLogout} variant="outline">
                                Logout
                            </Button>
                        </div>
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
                                placeholder="Masukkan Password Baru"
                                value={form.password}
                                onChange={handleChange}
                            />
                            <Input
                                name="confirmPassword"
                                type="password"
                                placeholder="Konfirmasi Password Baru"
                                value={form.confirmPassword}
                                onChange={handleChange}
                            />
                            <div className="flex justify-between gap-2">
                                <Button type="submit" className="w-1/2" disabled={loadingUpdate}>
                                    {loadingUpdate ? (
                                        <>
                                            <Loader2 className="animate-spin" /> Loading
                                        </>
                                    ) : (
                                        'Update Akun'
                                    )}
                                </Button>
                                <Button type="button" className="w-1/2" variant="destructive" onClick={handleDelete} disabled={loadingDelete}>
                                    {loadingDelete ? (
                                        <>
                                            <Loader2 className="animate-spin" /> Loading
                                        </>
                                    ) : (
                                        'Hapus Akun'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        ) : null
    )
}
