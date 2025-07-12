// DMM TVのスクレイピングとリンク検証用ユーティリティ

export interface DMMContent {
  title: string
  url: string
  thumbnail?: string
  description?: string
  isAvailable: boolean
}

// DMM TVの検索結果からコンテンツ情報を取得
export async function searchDMMContent(query: string): Promise<DMMContent[]> {
  try {
    // 実際の実装では、DMM TVの検索APIまたはスクレイピングを行う
    // ここではモック実装
    const searchUrl = `https://tv.dmm.com/vod/list/?keyword=${encodeURIComponent(query)}`

    // 実際のスクレイピング処理（サーバーサイドで実行）
    // const response = await fetch(searchUrl)
    // const html = await response.text()
    // const $ = cheerio.load(html)

    // モックデータを返す（実際の実装では解析結果を返す）
    return getMockDMMContent(query)
  } catch (error) {
    console.error("DMM content search failed:", error)
    return []
  }
}

// リンクの有効性をチェック
export async function validateDMMLink(url: string): Promise<boolean> {
  try {
    // URLの形式をチェック
    if (!url || typeof url !== "string") {
      return false
    }

    // DMM TVのURLかどうかをチェック
    if (!url.includes("tv.dmm.com")) {
      return false
    }

    const response = await fetch(url, {
      method: "HEAD",
      timeout: 5000, // 5秒でタイムアウト
    })

    return response.ok && response.status === 200
  } catch (error) {
    console.error("Link validation failed:", error)
    return false
  }
}

// DMM TVの正しいURL形式を生成
export function generateDMMUrl(contentId: string, type: "movie" | "series" = "movie"): string {
  if (type === "series") {
    return `https://tv.dmm.com/vod/?season=${contentId}`
  }
  return `https://tv.dmm.com/vod/detail/${contentId}/`
}

// 作品タイトルからDMM TVで検索するURL（修正版）
export function generateDMMSearchUrl(title: string): string {
  return `https://tv.dmm.com/vod/list/?keyword=${encodeURIComponent(title)}`
}

// モックデータ（実際の実装では削除）
function getMockDMMContent(query: string): DMMContent[] {
  const mockData: Record<string, DMMContent> = {
    となりのトトロ: {
      title: "となりのトトロ",
      url: "https://tv.dmm.com/vod/list/?keyword=%E3%81%A8%E3%81%AA%E3%82%8A%E3%81%AE%E3%83%88%E3%83%88%E3%83%AD",
      thumbnail: "/placeholder.svg?height=300&width=200",
      description: "心温まるジブリの名作",
      isAvailable: true,
    },
    ワンピース: {
      title: "ワンピース",
      url: "https://tv.dmm.com/vod/list/?keyword=%E3%83%AF%E3%83%B3%E3%83%94%E3%83%BC%E3%82%B9",
      thumbnail: "/placeholder.svg?height=300&width=200",
      description: "海賊王を目指す冒険アニメ",
      isAvailable: true,
    },
    進撃の巨人: {
      title: "進撃の巨人",
      url: "https://tv.dmm.com/vod/list/?keyword=%E9%80%B2%E6%92%83%E3%81%AE%E5%B7%A8%E4%BA%BA",
      thumbnail: "/placeholder.svg?height=300&width=200",
      description: "人類と巨人の戦い",
      isAvailable: true,
    },
  }

  return Object.values(mockData).filter((content) => content.title.includes(query) || query.includes(content.title))
}
