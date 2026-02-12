import DiaryForm from "@/components/diary/DiaryForm";
import { Header } from "@/components/layout";

const QUESTIONS = [
	"오늘 가장 기억에 남는 말은?",
	"오늘 나를 가장 웃게 만든 순간은?",
	"오늘 가장 고마웠던 일은?",
	"오늘의 감정을 한 단어로 표현하면?",
	"오늘 스스로에게 해주고 싶은 말은?",
];

export default async function DiaryWritePage({
	searchParams,
}: {
	searchParams: Promise<{ type?: string }>;
}) {
	const params = await searchParams;
	const type = params?.type;

	const randomQuestion = getDailyQuestion(type);

	function getDailyQuestion(type?: string) {
		if (type !== "question") return null;

		const today = new Date().toISOString().split("T")[0];
		const hash = today
			.split("-")
			.join("")
			.split("")
			.reduce((a, b) => a + Number(b), 0);

		return QUESTIONS[hash % QUESTIONS.length];
	}

	return (
		<div className="w-full min-h-dvh">
			<Header type="navigation" title="작성하기" isSetting={true}></Header>
			<div className="container">
				<DiaryForm type={type ?? ""} randomQuestion={randomQuestion} />
			</div>
		</div>
	);
}
