import { useMemo, useState } from 'react'

export default function BookingForm({ sport, onSuccess }) {
  const [form, setForm] = useState({
    customer_name: '',
    phone: '',
    court: 1,
    date: '',
    start_time: '',
    end_time: '',
    notes: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const hours = useMemo(() => {
    const s = parseInt(form.start_time.split(':')[0] || '0', 10)
    const e = parseInt(form.end_time.split(':')[0] || '0', 10)
    return e > s ? e - s : 0
  }, [form.start_time, form.end_time])
  const total = hours * (sport?.price_per_hour || 0)

  const genTimes = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => `${from + i}:00`)

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, sport: sport.key, court: Number(form.court) })
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || 'Gagal membuat booking')
      }
      const data = await res.json()
      onSuccess?.(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Nama</label>
          <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={form.customer_name} onChange={e=>setForm({...form, customer_name:e.target.value})} required />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">No. HP</label>
          <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} required />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Tanggal</label>
          <input type="date" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} required />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Jam Mulai</label>
          <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={form.start_time} onChange={e=>setForm({...form, start_time:e.target.value})} required>
            <option value="" disabled>Pilih</option>
            {genTimes(sport.open_hour, sport.close_hour - 1).map(t=> <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Jam Selesai</label>
          <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={form.end_time} onChange={e=>setForm({...form, end_time:e.target.value})} required>
            <option value="" disabled>Pilih</option>
            {genTimes(sport.open_hour + 1, sport.close_hour).map(t=> <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Nomor Lapangan</label>
          <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={form.court} onChange={e=>setForm({...form, court:e.target.value})}>
            {Array.from({ length: sport.courts }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Catatan</label>
          <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} placeholder="Opsional" />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 p-4">
        <div className="text-slate-200 text-sm">Total</div>
        <div className="text-white font-semibold">Rp{(total).toLocaleString('id-ID')}</div>
      </div>

      {error && <div className="text-red-400 text-sm">{error}</div>}

      <button disabled={submitting} className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition disabled:opacity-50">
        {submitting ? 'Memproses...' : 'Konfirmasi Booking'}
      </button>
    </form>
  )
}
