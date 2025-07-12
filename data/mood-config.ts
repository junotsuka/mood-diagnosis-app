import { Heart, Zap, Sparkles, Flame, Star, Smile, Leaf, type LucideIcon } from "lucide-react"
import type { MoodType } from "@/types/mood"

export interface MoodConfig {
  icon: LucideIcon
  color: string
  bgColor: string
  borderColor: string
}

export const MOOD_CONFIG: Record<MoodType, MoodConfig> = {
  healing: {
    icon: Heart,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  energetic: {
    icon: Zap,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  emotional: {
    icon: Sparkles,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  exciting: {
    icon: Star,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  thrilling: {
    icon: Flame,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  funny: {
    icon: Smile,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  calm: {
    icon: Leaf,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
  },
}

export const MOOD_LABELS: Record<MoodType, string> = {
  healing: "癒されたい",
  energetic: "元気になりたい",
  emotional: "感動したい",
  exciting: "ワクワクしたい",
  thrilling: "刺激がほしい",
  funny: "笑いたい",
  calm: "落ち着きたい",
}
