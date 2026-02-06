import { Header } from "@/components/layout";
import { Button } from "@/components/ui";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

type Props = {
	params: Promise<{
		id: string;
	}>;
};

export default async function NoticeDtlPage({ params }: Props) {
	const supabase = await createClient();

	const { id } = await params;

	const { data: notice, error } = await supabase
		.from("notices")
		.select("id, title, content, created_at")
		.eq("id", id)
		.single();

	console.log(notice);

	if (error || !notice) {
		return (
			<div className="w-full min-h-dvh">
				<Header type="navigation" title="공지사항" isSetting></Header>
				<div className="container">
					<div className="p-5">
						<p className="text-primary-100 text-center">
							공지사항을 불러오지 못했습니다.
						</p>
						<p className="text-primary-300 text-sm text-center mt-2">
							{error.message}
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full min-h-dvh">
			<Header type="navigation" title="공지사항" isSetting />

			<div className="container">
				<div className="p-5">
					<div>
						<h3 className="text-lg text-primary-100">{notice.title}</h3>
						<p className="mt-2 text-primary-500">
							{new Date(notice.created_at).toLocaleDateString()}
						</p>
					</div>

					<div className="mt-6 bg-(--color-surface-overlay) p-3 text-primary-100 whitespace-pre-wrap">
						{notice.content}
					</div>
				</div>

				<div className="app_bottom">
					<Link href="/notice">
						<Button type="button" size="md" variant="primary700" full>
							목록으로
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
