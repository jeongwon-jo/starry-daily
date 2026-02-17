import { Header } from "@/components/layout";
import { createClient } from "@/utils/supabase/server";
import DiaryForm from "@/components/diary/DiaryForm";
type Props = {
  params: {
    id: string;
  };
};

export default async function DiaryWritePage({ params }: Props) {
	const supabase = await createClient();

	const { id } = await params;

	const { data: diary, error } = await supabase
		.from("diary")
		.select("*")
		.eq("id", id)
		.single();
	
	if (error || !diary) {
		return (
			<div className="w-full min-h-dvh">
				<Header type="navigation" title="작성하기" isSetting></Header>
				<div className="container">
					<div className="p-5">
						<p className="mt-10 text-primary-100 text-center">
							일기장을 불러오지 못했습니다.
						</p>
						<p className="mt-4 text-primary-300 text-sm text-center mt-2">
							{error?.message}
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full min-h-dvh">
			<Header type="navigation" title="작성하기" isSetting={true}></Header>
			<div className="container">
				<DiaryForm diary={diary} type={diary.question ? "question" : "diary"} randomQuestion={diary.question} />
			</div>
		</div>
	);
}
