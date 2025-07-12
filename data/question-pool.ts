import type { Question } from "@/types/mood";

// 質問カテゴリごとの質問プール
export interface QuestionPool {
  category: string;
  questions: Question[];
}

// 各カテゴリの質問プール
export const questionPools: QuestionPool[] = [
  // カテゴリ1: ジャンルの好み
  {
    category: "genre_preference",
    questions: [
      {
        id: 101,
        text: "今、一番観たいジャンルはどれですか？",
        options: [
          { text: "心温まるヒューマンドラマ", scores: { healing: 3, calm: 2 } },
          {
            text: "ドキドキのサスペンス・ミステリー",
            scores: { thrilling: 3, exciting: 2 },
          },
          { text: "爆笑できるコメディ", scores: { funny: 3, energetic: 1 } },
          {
            text: "感動のラブストーリー",
            scores: { emotional: 3, healing: 1 },
          },
        ],
      },
      {
        id: 102,
        text: "映画やドラマで惹かれる設定は？",
        options: [
          { text: "美しい自然や田舎の風景", scores: { healing: 3, calm: 2 } },
          { text: "未来都市や異世界", scores: { exciting: 3, thrilling: 2 } },
          { text: "賑やかな学校や職場", scores: { funny: 2, energetic: 2 } },
          { text: "歴史ある街や文化", scores: { emotional: 2, calm: 2 } },
        ],
      },
      {
        id: 103,
        text: "どんな雰囲気の作品を観たいですか？",
        options: [
          { text: "のんびり癒やされる雰囲気", scores: { healing: 3, calm: 2 } },
          {
            text: "ハラハラドキドキの展開",
            scores: { thrilling: 2, exciting: 3 },
          },
          {
            text: "とにかく笑える明るい雰囲気",
            scores: { funny: 3, energetic: 1 },
          },
          { text: "心に響く感動的な雰囲気", scores: { emotional: 3, calm: 1 } },
        ],
      },
      {
        id: 104,
        text: "理想的な主人公のタイプは？",
        options: [
          { text: "優しくて穏やかな人", scores: { healing: 2, calm: 3 } },
          {
            text: "元気で行動力のある人",
            scores: { energetic: 3, exciting: 1 },
          },
          { text: "ユニークで面白い人", scores: { funny: 3, thrilling: 1 } },
          { text: "深みがあって魅力的な人", scores: { emotional: 3, calm: 1 } },
        ],
      },
    ],
  },
  // カテゴリ2: 観たいシチュエーション
  {
    category: "situation_preference",
    questions: [
      {
        id: 201,
        text: "どんなシチュエーションの作品が観たいですか？",
        options: [
          {
            text: "家族や仲間との絆が描かれる",
            scores: { healing: 2, emotional: 2 },
          },
          {
            text: "冒険やバトルが盛り上がる",
            scores: { thrilling: 3, exciting: 2 },
          },
          { text: "日常の中の小さな幸せ", scores: { calm: 3, healing: 1 } },
          {
            text: "恋愛や人間関係の葛藤",
            scores: { emotional: 3, healing: 1 },
          },
        ],
      },
      {
        id: 202,
        text: "作品の舞台で惹かれるのは？",
        options: [
          { text: "現代の日本や身近な場所", scores: { calm: 2, healing: 2 } },
          {
            text: "ファンタジーや異世界",
            scores: { exciting: 3, thrilling: 2 },
          },
          { text: "海外や異文化の街", scores: { emotional: 2, calm: 2 } },
          { text: "未来やSFの世界", scores: { thrilling: 2, exciting: 3 } },
        ],
      },
      {
        id: 203,
        text: "どんな展開が好きですか？",
        options: [
          {
            text: "じんわり心に残るストーリー",
            scores: { healing: 2, emotional: 2 },
          },
          {
            text: "予想外のどんでん返し",
            scores: { thrilling: 3, exciting: 2 },
          },
          {
            text: "テンポよく進むコメディ",
            scores: { funny: 3, energetic: 1 },
          },
          {
            text: "涙が止まらない感動作",
            scores: { emotional: 3, healing: 1 },
          },
        ],
      },
      {
        id: 204,
        text: "作品を選ぶときに重視するのは？",
        options: [
          { text: "癒やされる雰囲気", scores: { healing: 3, calm: 2 } },
          {
            text: "ハラハラドキドキする展開",
            scores: { thrilling: 2, exciting: 3 },
          },
          { text: "笑いの要素", scores: { funny: 3, energetic: 1 } },
          { text: "心に響くメッセージ", scores: { emotional: 3, calm: 1 } },
        ],
      },
    ],
  },
  // カテゴリ3: 作品の長さや雰囲気
  {
    category: "length_and_mood",
    questions: [
      {
        id: 301,
        text: "今日はどんな長さの作品を観たいですか？",
        options: [
          { text: "短編や1話完結もの", scores: { funny: 2, healing: 2 } },
          { text: "映画1本分くらい", scores: { emotional: 2, exciting: 2 } },
          {
            text: "連続ドラマやシリーズもの",
            scores: { thrilling: 2, energetic: 2 },
          },
          { text: "特にこだわりはない", scores: { calm: 2, healing: 1 } },
        ],
      },
      {
        id: 302,
        text: "今の気分に合う雰囲気は？",
        options: [
          { text: "静かで落ち着いた雰囲気", scores: { calm: 3, healing: 2 } },
          { text: "ワクワクする冒険感", scores: { exciting: 3, thrilling: 2 } },
          { text: "明るく楽しい雰囲気", scores: { funny: 3, energetic: 1 } },
          {
            text: "心が揺さぶられる感動",
            scores: { emotional: 3, healing: 1 },
          },
        ],
      },
      {
        id: 303,
        text: "どんな時に映画やドラマを観たくなりますか？",
        options: [
          { text: "リラックスしたい時", scores: { healing: 3, calm: 2 } },
          { text: "刺激が欲しい時", scores: { thrilling: 3, exciting: 2 } },
          { text: "笑いたい時", scores: { funny: 3, energetic: 1 } },
          { text: "感動したい時", scores: { emotional: 3, healing: 1 } },
        ],
      },
      {
        id: 304,
        text: "作品のどんな要素に惹かれますか？",
        options: [
          { text: "美しい映像や音楽", scores: { healing: 2, emotional: 2 } },
          { text: "スリリングな展開", scores: { thrilling: 3, exciting: 2 } },
          { text: "個性的なキャラクター", scores: { funny: 2, energetic: 2 } },
          { text: "深いテーマやメッセージ", scores: { emotional: 3, calm: 1 } },
        ],
      },
    ],
  },
  // カテゴリ4: 作品の視聴スタイル
  {
    category: "watching_style",
    questions: [
      {
        id: 401,
        text: "誰と一緒に観ることが多いですか？",
        options: [
          { text: "一人でじっくり", scores: { calm: 3, healing: 2 } },
          { text: "家族やパートナーと", scores: { healing: 2, emotional: 2 } },
          { text: "友人や仲間とワイワイ", scores: { funny: 3, energetic: 2 } },
          {
            text: "SNSで感想を共有しながら",
            scores: { exciting: 2, thrilling: 2 },
          },
        ],
      },
      {
        id: 402,
        text: "どんな時に新しい作品を探しますか？",
        options: [
          { text: "気分転換したい時", scores: { healing: 2, exciting: 2 } },
          { text: "話題作が気になる時", scores: { exciting: 3, thrilling: 2 } },
          { text: "好きな俳優や監督の新作", scores: { emotional: 2, calm: 2 } },
          {
            text: "ジャンル問わず色々観たい時",
            scores: { funny: 2, energetic: 2 },
          },
        ],
      },
      {
        id: 403,
        text: "作品を選ぶときの決め手は？",
        options: [
          { text: "口コミやレビュー", scores: { emotional: 2, calm: 2 } },
          { text: "予告編やあらすじ", scores: { exciting: 2, thrilling: 2 } },
          { text: "出演者やスタッフ", scores: { funny: 2, energetic: 2 } },
          { text: "直感や気分", scores: { healing: 2, calm: 2 } },
        ],
      },
      {
        id: 404,
        text: "どんなエンディングが好きですか？",
        options: [
          { text: "ハッピーエンド", scores: { healing: 2, funny: 2 } },
          { text: "切ない余韻が残る", scores: { emotional: 3, calm: 1 } },
          { text: "衝撃のラスト", scores: { thrilling: 3, exciting: 2 } },
          { text: "考察が深まる結末", scores: { emotional: 2, calm: 2 } },
        ],
      },
    ],
  },
];

// ランダムに質問を選択する関数
export function generateRandomQuestions(count = 4): Question[] {
  const selectedQuestions: Question[] = [];
  const usedCategories = new Set<string>();

  // 各カテゴリから最大1つずつ選択
  const shuffledPools = [...questionPools].sort(() => Math.random() - 0.5);

  for (const pool of shuffledPools) {
    if (selectedQuestions.length >= count) break;
    if (usedCategories.has(pool.category)) continue;

    // カテゴリ内からランダムに1つ選択
    const randomQuestion =
      pool.questions[Math.floor(Math.random() * pool.questions.length)];
    selectedQuestions.push(randomQuestion);
    usedCategories.add(pool.category);
  }

  // 足りない場合は重複を許可して追加
  while (selectedQuestions.length < count) {
    const randomPool =
      questionPools[Math.floor(Math.random() * questionPools.length)];
    const randomQuestion =
      randomPool.questions[
        Math.floor(Math.random() * randomPool.questions.length)
      ];

    // 同じ質問IDの重複は避ける
    if (!selectedQuestions.some((q) => q.id === randomQuestion.id)) {
      selectedQuestions.push(randomQuestion);
    }
  }

  return selectedQuestions;
}

// デフォルトの質問セット（後方互換性のため）
export const defaultQuestions = generateRandomQuestions(4);
