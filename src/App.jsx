import { useState } from 'react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import SportsPicker from './components/SportsPicker'
import BookingForm from './components/BookingForm'
import BookingsList from './components/BookingsList'

function App() {
  const [selected, setSelected] = useState(null)
  const [success, setSuccess] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.08),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.08),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(168,85,247,0.06),transparent_40%)]" />

      <header className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="text-white font-extrabold text-2xl">ArenaBooking</div>
          <a href="#booking" className="text-slate-200 hover:text-white transition">Lihat Jadwal</a>
        </div>
      </header>

      <main className="relative z-10">
        <Hero onGetStarted={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })} />

        <section id="booking" className="max-w-6xl mx-auto px-6 py-12">
          <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold text-white mb-6">Pilih Olahraga</motion.h2>
          <SportsPicker onSelect={(s)=>{ setSelected(s); setSuccess(null); setTimeout(()=>document.getElementById('form').scrollIntoView({behavior:'smooth'}),100) }} />
        </section>

        {selected && (
          <section id="form" className="max-w-6xl mx-auto px-6 pb-20">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-white text-xl font-semibold">{selected.name}</div>
                      <div className="text-slate-300 text-sm">Rp{selected.price_per_hour.toLocaleString('id-ID')}/jam • {selected.courts} lapangan</div>
                    </div>
                  </div>

                  {!success ? (
                    <BookingForm
                      sport={selected}
                      onSuccess={(data)=> setSuccess(data)}
                    />
                  ) : (
                    <div className="text-center text-white">
                      <div className="text-2xl font-bold mb-2">Booking Berhasil!</div>
                      <div className="text-slate-300 mb-6">Total pembayaran: Rp{success.total_price.toLocaleString('id-ID')}</div>
                      <button onClick={()=>{ setSuccess(null) }} className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white">Buat Booking Lain</button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <BookingsList sport={selected.key} date={document.querySelector('input[type="date"]')?.value || ''} />
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="relative z-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center text-slate-400 text-sm">© {new Date().getFullYear()} ArenaBooking</div>
      </footer>
    </div>
  )
}

export default App
