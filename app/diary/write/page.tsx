import DiaryForm from "@/components/diary/DiaryForm";
import { Header } from "@/components/layout";

export default async function DiaryWritePage({
	searchParams,
}: {
	searchParams: Promise<{ type?: string; date?: string }>;
}) {
	const params = await searchParams;
	const type = params?.type;
	const selectedDate = params?.date;

	return (
		<div className="w-full min-h-dvh">
			<Header type="navigation" title="작성하기" isSetting={true}></Header>
			<div className="container">
				<DiaryForm type={type ?? ""} selectedDate={selectedDate ?? ""} />
			</div>
		</div>
	);
}
