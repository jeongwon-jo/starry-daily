import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const FALLBACK_QUESTIONS = [
  "오늘 가장 기억에 남는 순간은 무엇인가요?",
  "오늘 나를 가장 웃게 만든 것은 무엇인가요?",
  "오늘 스스로에게 해주고 싶은 말은 무엇인가요?",
  "오늘 하루를 한 단어로 표현한다면?",
  "오늘 가장 고마웠던 일은 무엇인가요?",
];

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: diaries } = await supabase
      .from("diary")
      .select("content")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5);

    const pastContents = diaries?.map((d) => d.content).filter(Boolean) ?? [];

    let question: string;

    if (pastContents.length === 0) {
      question = FALLBACK_QUESTIONS[Math.floor(Math.random() * FALLBACK_QUESTIONS.length)];
    } else {
      const diaryContext = pastContents
        .map((c, i) => `일기 ${i + 1}: ${c}`)
        .join("\n");

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "너는 사용자의 일기를 읽고 오늘 쓸 일기 질문을 한 문장으로 생성하는 AI야. " +
              "질문은 한국어로, 따뜻하고 자기성찰적인 톤으로 작성해. " +
              "과거 일기 내용과 연관된 새로운 질문을 만들어. " +
              "질문 문장만 출력하고 다른 말은 하지 마.",
          },
          {
            role: "user",
            content: `아래는 내 최근 일기 내용이야:\n\n${diaryContext}\n\n오늘 일기에 쓸 질문 하나를 생성해줘.`,
          },
        ],
        max_tokens: 100,
        temperature: 0.9,
      });

      question =
        completion.choices[0]?.message?.content?.trim() ??
        FALLBACK_QUESTIONS[Math.floor(Math.random() * FALLBACK_QUESTIONS.length)];
    }

    return NextResponse.json({ question });
  } catch {
    const fallback = FALLBACK_QUESTIONS[Math.floor(Math.random() * FALLBACK_QUESTIONS.length)];
    return NextResponse.json({ question: fallback });
  }
}
