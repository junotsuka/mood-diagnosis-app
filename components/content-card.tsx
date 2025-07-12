"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Play, AlertCircle, CheckCircle, Copyright } from "lucide-react"
import { MOOD_LABELS, MOOD_CONFIG } from "@/data/mood-config"
import type { Content } from "@/types/mood"

interface ContentCardProps {
  content: Content
}

export function ContentCard({ content }: ContentCardProps) {
  const [linkStatus, setLinkStatus] = useState<"checking" | "valid" | "invalid">("checking")
  const [imageError, setImageError] = useState(false)
  const [tmdbThumbnail, setTmdbThumbnail] = useState<string>("")
  const [isLoadingThumbnail, setIsLoadingThumbnail] = useState(true)

  useEffect(() => {
    // リンクの有効性をチェック
    const validateLink = async () => {
      try {
        const response = await fetch(`/api/dmm-content?validate=${encodeURIComponent(content.dmmUrl)}`)

        // レスポンスが正常でない場合
        if (!response.ok) {
          console.warn(`Link validation failed with status: ${response.status}`)
          setLinkStatus("invalid")
          return
        }

        // Content-Typeをチェック
        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          console.warn("Response is not JSON")
          setLinkStatus("invalid")
          return
        }

        const data = await response.json()
        setLinkStatus(data.isValid ? "valid" : "invalid")
      } catch (error) {
        console.error("Link validation failed:", error)
        setLinkStatus("invalid")
      }
    }

    validateLink()
  }, [content.dmmUrl])

  useEffect(() => {
    // TMDB APIから画像を取得
    const fetchTMDBThumbnail = async () => {
      if (content.thumbnail) {
        // 既に画像URLがある場合はそれを使用
        setTmdbThumbnail(content.thumbnail)
        setIsLoadingThumbnail(false)
        return
      }

      try {
        const response = await fetch(`/api/tmdb?q=${encodeURIComponent(content.title)}`)
        const data = await response.json()
        setTmdbThumbnail(data.thumbnail)
      } catch (error) {
        console.error("Failed to fetch TMDB thumbnail:", error)
        setTmdbThumbnail("/placeholder.svg?height=750&width=500&text=NO+IMAGE")
      } finally {
        setIsLoadingThumbnail(false)
      }
    }

    fetchTMDBThumbnail()
  }, [content.title, content.thumbnail])

  const handleClick = () => {
    if (linkStatus === "valid") {
      window.open(content.dmmUrl, "_blank", "noopener,noreferrer")
    } else {
      // フォールバック: DMM TVの検索ページに遷移
      const searchUrl = `https://tv.dmm.com/vod/list/?keyword=${encodeURIComponent(content.title)}`
      window.open(searchUrl, "_blank", "noopener,noreferrer")
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm border-0 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer">
      <div className="relative" onClick={handleClick}>
        {isLoadingThumbnail ? (
          <div className="w-full h-80 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-2 border-purple-500 border-t-transparent rounded-full" />
          </div>
        ) : !imageError && tmdbThumbnail ? (
          <img
            src={tmdbThumbnail || "/placeholder.svg"}
            alt={content.title}
            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
            crossOrigin="anonymous"
          />
        ) : (
          <div className="w-full h-80 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex items-center justify-center">
            <div className="text-center">
              <div className="bg-gradient-to-br from-pink-400 to-purple-500 p-4 rounded-2xl mx-auto mb-3 w-fit">
                <Play className="h-8 w-8 text-white" />
              </div>
              <p className="text-gray-600 font-bold text-sm px-4">{content.title}</p>
              <p className="text-gray-400 text-xs mt-1">NO IMAGE</p>
            </div>
          </div>
        )}

        {/* 著作権表示 */}
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white flex items-center gap-1">
          <Copyright className="h-3 w-3" />
          <span>DMM TV</span>
        </div>

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-xl group-hover:bg-white transition-colors shadow-lg">
          <Play className="h-5 w-5 text-purple-600" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
            <span className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              視聴ページへ
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <h4 className="font-bold text-xl text-gray-800 group-hover:text-purple-600 transition-colors leading-tight">
          {content.title}
        </h4>
        <p className="text-gray-600 line-clamp-3 leading-relaxed">{content.description}</p>

        <div className="flex flex-wrap gap-2">
          {content.moods.map((mood) => {
            const config = MOOD_CONFIG[mood]
            const IconComponent = config.icon
            return (
              <Badge
                key={mood}
                className={`${config.bgColor} ${config.color} border-0 font-bold px-3 py-1 rounded-full shadow-sm`}
              >
                <IconComponent className="h-3 w-3 mr-1" />
                {MOOD_LABELS[mood]}
              </Badge>
            )
          })}
        </div>

        <Button
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-pink-500/25 group/button border-0"
          onClick={(e) => {
            e.stopPropagation()
            handleClick()
          }}
        >
          <div className="flex items-center justify-center gap-2">
            {linkStatus === "checking" && (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                リンク確認中...
              </>
            )}
            {linkStatus === "valid" && (
              <>
                <CheckCircle className="h-5 w-5 text-green-300" />
                <ExternalLink className="h-5 w-5 group-hover/button:translate-x-1 transition-transform" />
                DMM TVで視聴
              </>
            )}
            {linkStatus === "invalid" && (
              <>
                <AlertCircle className="h-5 w-5 text-yellow-300" />
                <ExternalLink className="h-5 w-5 group-hover/button:translate-x-1 transition-transform" />
                DMM TVで検索
              </>
            )}
          </div>
        </Button>
      </div>
    </div>
  )
}
