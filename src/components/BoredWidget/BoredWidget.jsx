import { useState, useRef, useEffect } from 'react'
import './BoredWidget.css'

/* ── Static content ────────────────────────────────────────────────────── */

const WELCOME = [
  '╔══════════════════════════════════════════╗',
  '║   AY-TERMINAL  v1.0.0                   ║',
  '║   Ahmad Ozair Yousufi\'s dev console     ║',
  '╚══════════════════════════════════════════╝',
  '',
  '  👋  Hey there! Type help to get started.',
  '',
]

const DEV_JOKES = [
  "Why do programmers prefer dark mode? Light attracts bugs. 🐛",
  "99 bugs in the code… take one down, patch it around… 127 bugs in the code.",
  "A QA engineer walks into a bar. Orders 1 beer. Orders 0. Orders -1. Orders NULL. Bar explodes.",
  "Why did the dev go broke? Used up all their cache. 💸",
  "There are 10 types of people: those who understand binary, and those who don't.",
  "To understand recursion, you must first understand recursion.",
  "Why do Java devs wear glasses? Because they don't C#. 👓",
  "I'd tell you a UDP joke but you might not get it.",
  "A SQL query walks into a bar, walks up to two tables and asks… 'Can I JOIN you?'",
  "Why was the JavaScript dev sad? Because they didn't know how to 'null' their feelings.",
  "// TODO: write a better joke",
]

const FLAVOR_ERRORS = [
  "Hint: even Stack Overflow can't help you with that one.",
  "Hint: try 'help' — that one actually works.",
  "Hint: have you tried turning it off and on again?",
  "Hint: 404 command not found… in this or any dimension.",
  "Hint: maybe a career in management instead?",
]

const SKILL_BARS = [
  { name: 'React      ', pct: 85 },
  { name: 'JavaScript ', pct: 88 },
  { name: 'TypeScript ', pct: 75 },
  { name: 'Node.js    ', pct: 82 },
  { name: 'PostgreSQL ', pct: 72 },
  { name: 'CSS3       ', pct: 85 },
  { name: 'Git        ', pct: 80 },
]

function mkBar(pct) {
  const n = Math.round(pct / 10)
  return '█'.repeat(n) + '░'.repeat(10 - n)
}

/* ── Command registry ──────────────────────────────────────────────────── */

const COMMANDS = {
  help: () => [
    '┌──────────────────────────────────────────────┐',
    '│  Commands                                    │',
    '├──────────────────────────────────────────────┤',
    '│  whoami      About Ahmad                     │',
    '│  skills      Skill proficiency chart         │',
    '│  projects    Project highlights              │',
    '│  joke        A (probably bad) dev joke       │',
    '│  sudo hire   ...just try it 😏              │',
    '│  coffee      Essential developer fuel        │',
    '│  ping        Connection check                │',
    '│  matrix      Wake up, Neo…                  │',
    '│  clear       Clear the terminal              │',
    '│  exit        Close this terminal             │',
    '└──────────────────────────────────────────────┘',
  ],

  whoami: () => [
    '',
    '  Name     :  Ahmad Ozair Yousufi',
    '  Role     :  Junior Software Engineer',
    '  Stack    :  React · Node.js · PostgreSQL · React Native',
    '  Study    :  BSc Software Development @ Staffordshire Uni',
    '  Status   :  🟢 Open to opportunities',
    '  Location :  🇬🇧 United Kingdom',
    '  GitHub   :  github.com/AOYousufi',
    '  Email    :  ozairyousufi1400@gmail.com',
    '',
  ],

  skills: () => [
    '',
    '  ── Proficiency ──────────────────────────',
    ...SKILL_BARS.map(s => `  ${s.name}  [${mkBar(s.pct)}]  ${s.pct}%`),
    '',
  ],

  projects: () => [
    '',
    '  ┌────────────────────────────────────────┐',
    '  │  NC-News           Full-Stack · React  │',
    '  │  Virtual Exhibition Front End · APIs   │',
    '  │  My Plants         React Native        │',
    '  │  Tech Returners    Client · Industry   │',
    '  └────────────────────────────────────────┘',
    '  Visit /projects for demos & source code.',
    '',
  ],

  joke: () => {
    const j = DEV_JOKES[Math.floor(Math.random() * DEV_JOKES.length)]
    return ['', `  😂  ${j}`, '']
  },

  ping: () => [
    '',
    '  PONG! 🏓',
    '  Latency: 1ms  ·  Status: alive  ·  Vibes: immaculate',
    '',
  ],

  coffee: () => [
    '',
    '        ( (        ',
    '         ) )       ',
    '      ........     ',
    '      |      |]    ',
    '      \\      /     ',
    "       `----'      ",
    '',
    '  ☕  Here\'s your coffee. You\'ve earned it.',
    '',
  ],

  matrix: () => {
    const chars = '01アイウエオカキクケコサシスセソハヒフヘホ'
    const rows = Array.from({ length: 7 }, () =>
      '  ' +
      Array.from({ length: 40 }, () =>
        chars[Math.floor(Math.random() * chars.length)]
      ).join('')
    )
    return ['', ...rows, '', '  Wake up, Neo…', '  The Matrix has you.', '']
  },
}

/* ── Command processor ─────────────────────────────────────────────────── */

function processCommand(raw) {
  const input = raw.trim().toLowerCase()
  if (!input) return { type: 'noop' }

  if (input === 'clear' || input === 'cls') return { type: 'clear' }
  if (['exit', 'close', 'quit', 'q'].includes(input)) return { type: 'exit' }

  if (input === 'sudo hire ahmad' || input === 'sudo hire') {
    return {
      type: 'output',
      lines: [
        '',
        '  [sudo] password for recruiter: ●●●●●●●●',
        '  Verifying credentials…',
        '  ✅ Authentication successful',
        '  🚀 Initiating hiring sequence for Ahmad Ozair Yousufi…',
        '',
        '  [████████████████████████] 100%',
        '',
        '  ✅ Hired successfully. Excellent decision.',
        '  📬 Reach out: ozairyousufi1400@gmail.com',
        '  🎉 You\'re going to love working together.',
        '',
      ],
    }
  }

  // Typo helpers
  if (input === 'ls' || input === 'dir') {
    return {
      type: 'output',
      lines: ['  projects/  education/  work/  contact/  .secrets (permission denied)'],
    }
  }
  if (input === 'pwd') return { type: 'output', lines: ['  /home/visitor/portfolio'] }
  if (input === 'cat readme') {
    return { type: 'output', lines: COMMANDS.whoami() }
  }
  if (input === 'rm -rf /' || input === 'rm -rf *') {
    return {
      type: 'output',
      lines: [
        '  Deleting everything… ██████████ 100%',
        '  Just kidding. Nice try though. 😄',
      ],
    }
  }
  if (input === 'sudo make me a sandwich') {
    return { type: 'output', lines: ['  🥪 Okay.'] }
  }
  if (input.startsWith('sudo') && input !== 'sudo hire') {
    return { type: 'output', lines: ['  Nice try. Only \'sudo hire\' works here. 😏'] }
  }

  const fn = COMMANDS[input]
  if (fn) return { type: 'output', lines: fn() }

  const flavor = FLAVOR_ERRORS[Math.floor(Math.random() * FLAVOR_ERRORS.length)]
  return {
    type: 'error',
    lines: [`  bash: ${input}: command not found`, `  ${flavor}`],
  }
}

/* ── Component ─────────────────────────────────────────────────────────── */

export default function BoredWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [entries, setEntries] = useState([])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)

  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll output
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [entries])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80)
    }
  }, [isOpen])

  // Escape closes
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') setIsOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen])

  function openTerminal() {
    setEntries([])
    setInput('')
    setCmdHistory([])
    setHistIdx(-1)
    setIsOpen(true)
  }

  function submit() {
    const raw = input
    const result = processCommand(raw)

    if (result.type === 'noop') return
    if (result.type === 'exit') { setIsOpen(false); return }
    if (result.type === 'clear') { setEntries([]); setInput(''); return }

    if (raw.trim()) {
      setCmdHistory(prev => [raw.trim(), ...prev])
    }
    setHistIdx(-1)
    setInput('')

    setEntries(prev => [
      ...prev,
      { kind: 'in', text: raw.trim() },
      { kind: result.type === 'error' ? 'err' : 'out', lines: result.lines },
    ])
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      submit()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHistIdx(i => {
        const next = Math.min(i + 1, cmdHistory.length - 1)
        if (next >= 0) setInput(cmdHistory[next])
        return next
      })
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHistIdx(i => {
        const next = Math.max(i - 1, -1)
        setInput(next === -1 ? '' : cmdHistory[next])
        return next
      })
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const partial = input.trim().toLowerCase()
      const match = Object.keys(COMMANDS).find(k => k.startsWith(partial))
      if (match) setInput(match)
    }
  }

  return (
    <div className="bored-widget">
      {/* ── Trigger bubble ─────────────────────────────────────────── */}
      {!isOpen && (
        <button
          className="bored-trigger"
          onClick={openTerminal}
          aria-label="Open interactive terminal Easter egg"
        >
          <span className="bored-icon" aria-hidden="true">{'</>'}</span>
          <span className="bored-label">Bored?</span>
          <span className="bored-pulse" aria-hidden="true" />
        </button>
      )}

      {/* ── Terminal window ─────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="terminal-window"
          role="dialog"
          aria-label="Interactive developer terminal"
          aria-modal="false"
        >
          {/* macOS-style title bar */}
          <div className="terminal-titlebar" aria-hidden="true">
            <div className="terminal-dots">
              <button
                className="terminal-dot dot-red"
                onClick={() => setIsOpen(false)}
                aria-label="Close terminal"
                title="Close"
              />
              <button
                className="terminal-dot dot-yellow"
                onClick={() => setEntries([])}
                aria-label="Clear terminal output"
                title="Clear"
              />
              <span className="terminal-dot dot-green" title="Maximise" />
            </div>
            <span className="terminal-title-text">
              ay-terminal — visitor@portfolio
            </span>
          </div>

          {/* Output / history */}
          <div className="terminal-body" ref={bodyRef}>
            {/* Welcome banner */}
            {WELCOME.map((line, i) => (
              <div key={`w${i}`} className="t-line t-line--banner">
                {line || ' '}
              </div>
            ))}

            {/* Command entries */}
            {entries.map((entry, i) => (
              <div key={i}>
                {entry.kind === 'in' && (
                  <div className="t-line t-line--in">
                    <span className="t-prompt" aria-hidden="true">visitor@portfolio:~$</span>
                    {' '}{entry.text}
                  </div>
                )}
                {entry.kind !== 'in' &&
                  entry.lines.map((line, j) => (
                    <div
                      key={j}
                      className={`t-line t-line--${entry.kind}`}
                    >
                      {line || ' '}
                    </div>
                  ))}
              </div>
            ))}
          </div>

          {/* Input row */}
          <div className="terminal-input-row">
            <span className="t-prompt" aria-hidden="true">visitor@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={input}
              onChange={e => { setInput(e.target.value); setHistIdx(-1) }}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              aria-label="Type a terminal command"
              placeholder="type a command…"
            />
          </div>
        </div>
      )}
    </div>
  )
}
