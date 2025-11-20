import { useEffect, useState } from 'react'

export default function SportsPicker({ onSelect }) {
  const [sports, setSports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sports`)
        if (!res.ok) throw new Error('Gagal memuat data olahraga')
        const data = await res.json()
        setSports(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchSports()
  }, [])

  if (loading) return <div className="text-slate-200">Memuat...</div>
  if (error) return <div className="text-red-300">{error}</div>

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sports.map((s) => (
        <button
          key={s.key}
          onClick={() => onSelect(s)}
          className="group text-left rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition"
        >
          <div className="flex items-center justify-between">
            <div className="text-white font-semibold text-xl">{s.name}</div>
            <span className="text-emerald-400 text-sm">Rp{(s.price_per_hour).toLocaleString('id-ID')}/jam</span>
          </div>
          <div className="mt-2 text-slate-300 text-sm">{s.courts} lapangan • Buka {s.open_hour}:00 - {s.close_hour}:00</div>
        </button>
      ))}
    </div>
  )
}
