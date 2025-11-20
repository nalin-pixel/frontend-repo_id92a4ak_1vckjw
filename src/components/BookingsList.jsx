import { useEffect, useState } from 'react'

export default function BookingsList({ sport, date }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const params = new URLSearchParams()
      if (sport) params.set('sport', sport)
      if (date) params.set('date', date)
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/bookings?${params.toString()}`)
      const data = await res.json()
      setItems(data)
      setLoading(false)
    }
    load()
  }, [sport, date])

  if (!date) return null
  if (loading) return <div className="text-slate-300">Memuat data booking...</div>

  return (
    <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-4">
      <div className="text-white font-semibold mb-3">Jadwal Terisi</div>
      {items.length === 0 && <div className="text-slate-300 text-sm">Belum ada booking untuk tanggal ini.</div>}
      <div className="space-y-2">
        {items.map(b => (
          <div key={b.id} className="flex flex-wrap items-center justify-between text-slate-200 text-sm bg-white/5 border border-white/10 rounded-lg p-2">
            <div className="flex-1">Lap {b.court} • {b.start_time} - {b.end_time} • {b.customer_name}</div>
            <div className="text-emerald-400 font-medium">Rp{(b.total_price || 0).toLocaleString('id-ID')}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
