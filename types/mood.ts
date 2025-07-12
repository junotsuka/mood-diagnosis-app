export type MoodType = "healing" | "energetic" | "emotional" | "exciting" | "thrilling" | "funny" | "calm"

export interface MoodScore {
  [key: string]: number
}

export interface Question {
  id: number
  text: string
  options: {
    text: string
    scores: MoodScore
  }[]
}

export interface Content {
  id: number
  title: string
  description: string
  thumbnail: string
  dmmUrl: string
  moods: MoodType[]
}

export interface DiagnosisResult {
  primaryMood: MoodType
  scores: MoodScore
  recommendations: Content[]
}
