import { useState } from 'react'

const EXAMPLE_PROMPTS = [
  'Luxury dark with gold accents',
  'Clean minimal light theme',
  'Cyberpunk neon purple',
  'Warm earthy tones',
  'Ocean blue professional',
  'Rose gold feminine brand',
]

interface GeneratorFormProps {
  onGenerate: (prompt: string) => void
  generating: boolean
  disabled: boolean
}

export default function GeneratorForm({ onGenerate, generating, disabled }: GeneratorFormProps) {
  const [prompt, setPrompt] = useState('')
  const maxLength = 500

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim() || generating || disabled) return
    onGenerate(prompt.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="theme-prompt" className="block text-sm font-medium text-nestui-text mb-2">
          Describe your ideal theme
        </label>
        <textarea
          id="theme-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value.slice(0, maxLength))}
          placeholder="e.g. A sleek dark theme with deep navy backgrounds and electric blue accents, giving a premium tech feel..."
          disabled={generating || disabled}
          rows={4}
          className="w-full rounded-lg bg-nestui-bg/60 border border-nestui-border/50 px-4 py-3 text-sm text-nestui-text placeholder:text-nestui-text3 focus:outline-none focus:border-nestui-blue/40 focus:shadow-[0_0_0_3px_rgba(91,143,255,0.08)] resize-none disabled:opacity-50 transition-all"
        />
        <div className="flex justify-end mt-1.5">
          <span className={`text-[11px] font-mono ${prompt.length >= maxLength ? 'text-red-400' : 'text-nestui-text3'}`}>
            {prompt.length}/{maxLength}
          </span>
        </div>
      </div>

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-nestui-text3 mb-2.5">Try an example</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setPrompt(example)}
              disabled={generating || disabled}
              className="px-3 py-1.5 text-xs rounded-lg border border-nestui-border/40 text-nestui-text2 hover:text-nestui-text hover:border-nestui-blue/20 hover:bg-nestui-blue/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={!prompt.trim() || generating || disabled}
        className="w-full py-3 rounded-lg bg-gradient-to-r from-nestui-blue to-blue-500 text-white text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(91,143,255,0.25)] hover:scale-[1.005] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100 flex items-center justify-center gap-2 cursor-pointer"
      >
        {generating ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Generating theme...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            Generate Theme
          </>
        )}
      </button>
    </form>
  )
}
