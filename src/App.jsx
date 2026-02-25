import { useState } from 'react'

const operators = ['+', '-', '*', '/']
const isOp = (c) => operators.includes(c)

export default function App() {
  const [input, setInput] = useState('0')
  const [lastPressed, setLastPressed] = useState('')

  function press(val) {
    if (input === '0' && val === '0') return

    if (val === '.') {
      const parts = input.split(/[+\-*/]/)
      if (parts[parts.length - 1].includes('.')) return
    }

    if (isOp(val)) {
      if (isOp(lastPressed)) {
        if (val === '-' && lastPressed !== '-') {
          setInput(input + val)
          setLastPressed(val)
          return
        }
        setInput(input.slice(0, -1) + val)
        setLastPressed(val)
        return
      }
      setInput(input + val)
      setLastPressed(val)
      return
    }

    if (input === '0' && /[0-9]/.test(val)) {
      setInput(val)
      setLastPressed(val)
      return
    }

    setInput(input + val)
    setLastPressed(val)
  }

  function calculate() {
    try {
      let expr = input
      while (isOp(expr.slice(-1))) expr = expr.slice(0, -1)
      // eslint-disable-next-line no-eval
      const result = parseFloat(eval(expr).toFixed(10))
      setInput(result.toString())
      setLastPressed('=')
    } catch {
      setInput('Error')
    }
  }

  function clear() { setInput('0'); setLastPressed('') }
  function del() {
    if (input.length === 1) { setInput('0'); setLastPressed('') }
    else { const s = input.slice(0, -1); setInput(s); setLastPressed(s.slice(-1)) }
  }

  const btn = (label, onClick, extra = '') => (
    <button
      onClick={onClick}
      className={`h-16 rounded-xl text-lg font-medium transition-colors ${extra}`}
    >
      {label}
    </button>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="w-80">
        <div className="bg-white/3 border border-white/8 rounded-2xl px-5 py-4 mb-3 text-right">
          <p className="text-3xl font-mono text-white tracking-wider truncate">{input}</p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {btn('AC', clear, 'col-span-2 bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30')}
          {btn('DEL', del, 'bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30')}
          {btn('/', () => press('/'), 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30')}

          {['7','8','9'].map(n => btn(n, () => press(n), 'bg-white/5 text-gray-200 border border-white/8 hover:bg-white/10'))}
          {btn('×', () => press('*'), 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30')}

          {['4','5','6'].map(n => btn(n, () => press(n), 'bg-white/5 text-gray-200 border border-white/8 hover:bg-white/10'))}
          {btn('−', () => press('-'), 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30')}

          {['1','2','3'].map(n => btn(n, () => press(n), 'bg-white/5 text-gray-200 border border-white/8 hover:bg-white/10'))}
          {btn('+', () => press('+'), 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30')}

          {btn('0', () => press('0'), 'col-span-2 bg-white/5 text-gray-200 border border-white/8 hover:bg-white/10')}
          {btn('.', () => press('.'), 'bg-white/5 text-gray-200 border border-white/8 hover:bg-white/10')}
          {btn('=', calculate, 'bg-white text-black hover:bg-gray-200')}
        </div>
      </div>
    </div>
  )
}
