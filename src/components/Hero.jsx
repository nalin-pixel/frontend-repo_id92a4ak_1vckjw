import { motion } from 'framer-motion'
import { Football, Dumbbell, BadgeCheck } from 'lucide-react'

export default function Hero({ onGetStarted }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.4),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.4),transparent_50%)]" />
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold text-white tracking-tight"
            >
              Booking Lapangan Olahraga jadi Mudah dan Cepat
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-5 text-lg text-slate-200"
            >
              Sewa lapangan Futsal, Mini Soccer, dan Badminton dalam hitungan detik.
              Pilih jadwal, isi data, langsung konfirmasi.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={onGetStarted}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition"
              >
                Mulai Booking
              </button>
              <div className="flex items-center text-slate-300">
                <BadgeCheck className="w-5 h-5 text-emerald-400 mr-2" />
                <span>Konfirmasi instan</span>
              </div>
            </motion.div>
            <div className="mt-8 grid grid-cols-3 gap-6">
              {[{icon: Football, label: 'Futsal'}, {icon: Dumbbell, label: 'Mini Soccer'}, {icon: Dumbbell, label: 'Badminton'}].map((it, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur">
                  <it.icon className="w-6 h-6 text-white" />
                  <div className="mt-2 text-white font-semibold">{it.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative">
            <div className="rounded-3xl bg-white/5 border border-white/10 p-4 backdrop-blur shadow-2xl">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 grid grid-cols-3 gap-3 p-3">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="rounded-xl bg-white/5 border border-white/10" />
                ))}
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-emerald-500/30 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-blue-500/30 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
