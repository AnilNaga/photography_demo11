import { Navbar } from "@/components/layout/Navbar";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-background text-white pb-20">
            <Navbar />

            <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Get in Touch</h1>
                    <p className="text-white/60 max-w-xl mx-auto text-lg">
                        Have a project in mind or want to book a session? I'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-full bg-white/5 text-amber-400">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-white/40 uppercase tracking-widest font-bold mb-1">Email</p>
                                            <a href="mailto:hello@lumina.com" className="text-lg text-white hover:text-amber-400 transition-colors">hello@lumina.com</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-full bg-white/5 text-amber-400">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-white/40 uppercase tracking-widest font-bold mb-1">Phone</p>
                                            <a href="tel:+1234567890" className="text-lg text-white hover:text-amber-400 transition-colors">+1 (234) 567-890</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-full bg-white/5 text-amber-400">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-white/40 uppercase tracking-widest font-bold mb-1">Studio</p>
                                            <p className="text-lg text-white">123 Creative Avenue,<br />Design District, NY 10001</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 relative bg-white/5">
                            <div className="absolute inset-0 flex items-center justify-center text-white/20 font-bold">
                                Map Integration
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="glass-panel p-8 rounded-3xl border border-white/5">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-medium text-white/50 mb-2">First Name</label>
                                    <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-white/50 mb-2">Last Name</label>
                                    <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors" placeholder="Doe" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-white/50 mb-2">Email Address</label>
                                <input type="email" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors" placeholder="john@example.com" />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-white/50 mb-2">Service Interest</label>
                                <select className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors">
                                    <option>Wedding Photography</option>
                                    <option>Portrait Session</option>
                                    <option>Event Coverage</option>
                                    <option>Commercial</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-white/50 mb-2">Message</label>
                                <textarea className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors h-32 resize-none" placeholder="Tell me about your project..." />
                            </div>

                            <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2">
                                <Send size={18} /> Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
