import { defineConfig } from 'unocss'

export default defineConfig({
  rules: [
    // Permite classes como `row-span-1`, `row-span-2`, ..., `row-span-10`
    [/^row-span-(\d+)$/, ([, d]) => ({ 'grid-row-end': `span ${d}` })],
    [/^col-span-(\d+)$/, ([, d]) => ({ 'grid-column-end': `span ${d}` })],
  ],
  shortcuts: {
    'scroll-min': [
      'overflow-auto',
      'scrollbar-width-thin',
      'scrollbar-color-purple-500-transparent',
      '[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-2',
      '[&::-webkit-scrollbar-thumb]:bg-purple-500 [&::-webkit-scrollbar-thumb]:rounded-full',
      '[&::-webkit-scrollbar-thumb:hover]:bg-purple-600'
    ].join(' '),
  }
})