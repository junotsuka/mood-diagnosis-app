import type {
  MoodScore,
  MoodType,
  Content,
  DiagnosisResult,
  Question,
} from "@/types/mood";
import { mockContents } from "@/data/mock-data";

export function calculateMoodScores(
  answers: number[][],
  questions: Question[]
): MoodScore {
  const scores: MoodScore = {
    healing: 0,
    energetic: 0,
    emotional: 0,
    exciting: 0,
    thrilling: 0,
    funny: 0,
    calm: 0,
  };

  // 各回答のスコアを合計
  answers.forEach((questionAnswers, questionIndex) => {
    questionAnswers.forEach((optionIndex) => {
      const question = questions[questionIndex];
      const option = question.options[optionIndex];

      Object.entries(option.scores).forEach(([mood, score]) => {
        scores[mood] = (scores[mood] || 0) + score;
      });
    });
  });

  return scores;
}

export function getPrimaryMood(scores: MoodScore): MoodType {
  let maxScore = 0;
  let primaryMood: MoodType = "healing";

  Object.entries(scores).forEach(([mood, score]) => {
    if (score > maxScore) {
      maxScore = score;
      primaryMood = mood as MoodType;
    }
  });

  return primaryMood;
}

// コンテンツのスコアを計算する関数
function calculateContentScore(content: Content, scores: MoodScore): number {
  let totalScore = 0;
  let moodCount = 0;

  content.moods.forEach((mood) => {
    totalScore += scores[mood] || 0;
    moodCount++;
  });

  // 平均スコアを計算
  const averageScore = moodCount > 0 ? totalScore / moodCount : 0;

  // ムードの数が多いほどボーナス（多様性を重視）
  const diversityBonus = content.moods.length * 0.5;

  return averageScore + diversityBonus;
}

// スコアに基づいてコンテンツをランク付けする関数
function rankContentsByScore(
  contents: Content[],
  scores: MoodScore
): Content[] {
  return contents
    .map((content) => ({
      content,
      score: calculateContentScore(content, scores),
    }))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.content);
}

// 多様性を確保するための関数
function ensureDiversity(
  recommendations: Content[],
  scores: MoodScore
): Content[] {
  const diversified: Content[] = [];
  const usedMoods = new Set<MoodType>();

  // まず、各ムードから少なくとも1つずつ選ぶ
  const moodTypes: MoodType[] = [
    "healing",
    "energetic",
    "emotional",
    "exciting",
    "thrilling",
    "funny",
    "calm",
  ];

  moodTypes.forEach((mood) => {
    if (scores[mood] > 0) {
      const moodContents = mockContents.filter(
        (content) =>
          content.moods.includes(mood) && !diversified.includes(content)
      );
      if (moodContents.length > 0) {
        // スコアが高い順にソートして上位のものを選択
        const sorted = moodContents.sort(
          (a, b) =>
            calculateContentScore(b, scores) - calculateContentScore(a, scores)
        );
        diversified.push(sorted[0]);
        usedMoods.add(mood);
      }
    }
  });

  // 残りのスロットを埋める
  const remaining = mockContents.filter(
    (content) => !diversified.includes(content)
  );
  const rankedRemaining = rankContentsByScore(remaining, scores);

  const targetCount = 10;
  while (diversified.length < targetCount && rankedRemaining.length > 0) {
    diversified.push(rankedRemaining.shift()!);
  }

  return diversified.slice(0, targetCount);
}

// ジブリ作品のタイトルに含まれるキーワード一覧
const GHIBLI_KEYWORDS = [
  "トトロ",
  "千と千尋",
  "もののけ姫",
  "ハウル",
  "魔女の宅急便",
  "崖の上のポニョ",
  "風立ちぬ",
  "紅の豚",
  "天空の城ラピュタ",
];

// ジブリ作品かどうか判定
function isGhibli(content: Content): boolean {
  return GHIBLI_KEYWORDS.some((keyword) => content.title.includes(keyword));
}

export function getRecommendations(scores: MoodScore, limit = 10): Content[] {
  // ジブリ作品を除外
  const nonGhibliContents = mockContents.filter(
    (content) => !isGhibli(content)
  );

  // スコアに基づいてコンテンツをランク付け
  const rankedContents = rankContentsByScore(nonGhibliContents, scores);

  // 多様性を確保
  const diverseRecommendations = ensureDiversity(rankedContents, scores);

  // ランダム性を少し加える（同じ結果を避けるため）
  const shuffled = [...diverseRecommendations].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, limit);
}

export function performDiagnosis(
  answers: number[][],
  questions: Question[]
): DiagnosisResult {
  const scores = calculateMoodScores(answers, questions);
  const primaryMood = getPrimaryMood(scores);
  const recommendations = getRecommendations(scores);

  return {
    primaryMood,
    scores,
    recommendations,
  };
}
