export interface FavoriteResult {
  model: string
  mode: 'concise' | 'detailed' | 'novel' | 'always-want' | 'custom'
  image: string
  time: number
  result: string
}
