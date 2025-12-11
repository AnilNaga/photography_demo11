"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Loader2 } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error("Invalid credentials");
            }

            router.push("/admin");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-hero-gradient z-0 opacity-50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px]" />

            <div className="z-10 w-full max-w-md p-8 glass-panel rounded-2xl border border-white/10 m-4">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                        <Camera className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h1>
                    <p className="text-white/50 text-sm">Enter your credentials to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                            placeholder="admin@lumina.com"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Sign In
                    </button>
                </form>
            </div>
        </main>
    );
}
