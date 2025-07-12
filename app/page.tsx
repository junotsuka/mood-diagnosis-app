"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RotateCcw,
  TrendingUp,
  Check,
  Heart,
  Zap,
  Star,
  ExternalLink,
} from "lucide-react";
import { MOOD_LABELS, MOOD_DESCRIPTIONS } from "@/data/mock-data";
import { MOOD_CONFIG } from "@/data/mood-config";
import { performDiagnosis } from "@/utils/diagnosis";
import { generateRandomQuestions } from "@/data/question-pool";
import type { DiagnosisResult, Question } from "@/types/mood";
import { Badge } from "@/components/ui/badge";

type AppState = "home" | "diagnosis" | "result";

export default function MoodDiagnosisApp() {
  const [currentState, setCurrentState] = useState<AppState>("home");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[][]>([]);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  // 初回ロード時とリセット時に新しい質問を生成
  useEffect(() => {
    setQuestions(generateRandomQuestions(4));
  }, []);

  const startDiagnosis = () => {
    setCurrentState("diagnosis");
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    if (!newAnswers[currentQuestion]) {
      newAnswers[currentQuestion] = [];
    }
    newAnswers[currentQuestion] = [optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 診断完了
      const diagnosisResult = performDiagnosis(newAnswers, questions);
      setResult(diagnosisResult);
      setCurrentState("result");
    }
  };

  const resetDiagnosis = () => {
    setCurrentState("home");
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    // 新しい質問セットを生成
    setQuestions(generateRandomQuestions(4));
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (currentState === "home") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md mx-auto space-y-8">
            {/* ヒーローセクション */}
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <h1
                  className="font-black leading-tight text-4xl"
                  style={{
                    fontFamily: "Arial Narrow, Arial, sans-serif",
                    fontWeight: "bold",
                    fontStyle: "italic",
                    color: "#ffffff",
                  }}
                >
                  DMMTV Pics
                </h1>

                <p className="text-lg text-gray-300 font-medium leading-relaxed">
                  {"今日の気分でサクッと決めよう"}
                </p>
              </div>

              {/* 特徴カード（コンパクト版） */}
              <div className="space-y-2">
                <Card className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 shadow-xl rounded-2xl overflow-hidden">
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-2 rounded-xl shadow-lg flex-shrink-0">
                      <Heart className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-bold text-gray-100">
                        気分にピッタリ
                      </h3>
                      <p className="text-xs text-gray-400">
                        今の気分を分析して、最適な作品をレコメンド
                      </p>
                    </div>
                  </CardContent>

                  <CardContent className="p-3 flex items-center gap-3 border-t border-gray-700/50">
                    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-xl shadow-lg flex-shrink-0">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-bold text-gray-100">
                        超簡単診断
                      </h3>
                      <p className="text-xs text-gray-400">
                        4つの質問に答えるだけ！サクッと1分で完了
                      </p>
                    </div>
                  </CardContent>

                  <CardContent className="p-3 flex items-center gap-3 border-t border-gray-700/50">
                    <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-xl shadow-lg flex-shrink-0">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-bold text-gray-100">
                        新しい発見
                      </h3>
                      <p className="text-xs text-gray-400">
                        今みるべき作品との出会いが待ってる
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* CTA */}
              <Button
                onClick={startDiagnosis}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 border-0 py-8"
              >
                はじめる
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentState === "diagnosis" && questions.length > 0) {
    const question = questions[currentQuestion];

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <Card className="w-full max-w-md bg-gray-800/90 backdrop-blur-sm border border-gray-700 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">
                    質問 {currentQuestion + 1} / {questions.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-bold">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>
              <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-pink-400 transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              <div className="text-center space-y-3">
                <h2 className="text-xl font-bold text-gray-100 leading-tight">
                  {question.text}
                </h2>
              </div>

              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full p-4 h-auto text-left justify-start bg-gray-700/50 hover:bg-gray-800/80 border-2 border-gray-600 hover:border-purple-400 text-sm font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group"
                    onClick={() => handleAnswer(index)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:from-purple-400/30 group-hover:to-pink-400/30 p-2 rounded-lg transition-colors border border-purple-500/30">
                        <Check className="h-4 w-4 text-purple-400" />
                      </div>
                      <span className="group-hover:text-gray-100 text-white">
                        {option.text}
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentState === "result" && result) {
    const moodConfig = MOOD_CONFIG[result.primaryMood];
    const MoodIcon = moodConfig.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="relative z-10 p-4 space-y-6">
          <div className="max-w-md mx-auto space-y-6">
            {/* 診断結果 */}
            <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="text-center pb-4 pt-6">
                <CardTitle className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                  診断結果
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6 pb-8">
                <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 border-2 border-gray-600 p-6 rounded-2xl shadow-lg py-3.5">
                  <h3 className="text-sm font-bold mb-2 text-gray-400">
                    今の気分は
                  </h3>
                  <p className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-0.5">
                    {MOOD_LABELS[result.primaryMood]}
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {MOOD_DESCRIPTIONS[result.primaryMood]}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* おすすめ作品 */}
            <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="pt-6 pb-4">
                <CardTitle className="text-2xl font-black text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  おすすめ作品
                </CardTitle>
                <p className="text-center text-sm text-gray-400 mt-2">
                  あなたにぴったりの作品を10作品ピックアップ！
                </p>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="space-y-3">
                  {result.recommendations.map((content, index) => (
                    <div
                      key={content.id}
                      className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-gray-600 rounded-xl p-4 hover:shadow-lg hover:border-purple-500 transition-all duration-300 group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs px-2 py-1 rounded-full min-w-[1.5rem] text-center">
                              {index + 1}
                            </div>
                            <h4 className="font-bold text-gray-100 group-hover:text-purple-400 transition-colors leading-tight italic leading-7 text-base">
                              {content.title}
                            </h4>
                          </div>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-3 py-1 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25 group/button border-0 text-xs"
                            onClick={() => {
                              const searchUrl = `https://tv.dmm.com/vod/list/?keyword=${encodeURIComponent(
                                content.title
                              )}`;
                              window.open(
                                searchUrl,
                                "_blank",
                                "noopener,noreferrer"
                              );
                            }}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            視聴
                          </Button>
                        </div>

                        <p className="text-xs text-gray-400 leading-relaxed">
                          {content.description}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {content.moods.map((mood) => {
                            const config = MOOD_CONFIG[mood];
                            const IconComponent = config.icon;
                            return (
                              <Badge
                                key={mood}
                                className="bg-gray-700/50 text-gray-300 border border-gray-600 font-bold px-2 py-0.5 rounded-full shadow-sm text-xs hover:bg-purple-600/20 hover:border-purple-500 transition-colors"
                              >
                                <IconComponent className="h-2 w-2 mr-1" />
                                {MOOD_LABELS[mood]}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 再診断ボタン */}
            <div className="text-center pb-6">
              <Button
                onClick={resetDiagnosis}
                className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white text-lg font-bold py-4 rounded-2xl shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 border-0"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                もう一度診断する
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
