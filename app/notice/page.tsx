import { Header } from "@/components/layout";
import NoticeSearch from "@/components/notice/NoticeSearch";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

type Props = {
	searchParams: Promise<{
		query?: string;
	}>;
};

export default async function NoticePage({ searchParams }: Props) {
	const supabase = await createClient();

	const { query = "" } = await searchParams;

	let request = supabase
		.from("notices")
		.select("id, title, created_at")
		.order("created_at", { ascending: false });

	if (query) {
		request = request.ilike("title", `%${query}%`);
	}

	const { data: notices, error } = await request;

	if (error) {
		return (
			<div className="w-full min-h-dvh">
				<Header type="navigation" title="공지사항" isSetting={true}></Header>
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
			<Header type="navigation" title="공지사항" isSetting={true}></Header>
			<div className="container">
				<div className="p-5">
					<NoticeSearch defaultValue={query} />
					<div className="mt-6">
						{notices && notices.length === 0 ? (
							<p className="text-center text-primary-500">
								검색 결과가 없습니다.
							</p>
						) : (
							notices?.map((notice) => (
								<Link
									key={notice.id}
									href={`/notice/${notice.id}`}
									className="block mb-2"
								>
									<div className="p-3 bg-(--color-surface-overlay) rounded-xl">
										<h3 className="text-primary-100 line-clamp-2">
											{notice.title}
										</h3>
										<p className="mt-3 text-primary-500 text-right">
											{new Date(notice.created_at).toLocaleDateString()}
										</p>
									</div>
								</Link>
							))
						)}
					</div>
				</div>
				{/* <div className="app_bottom">
					<Button type="button" size="md" variant="primary700" full>
						더보기
					</Button>
				</div> */}
			</div>
		</div>
	);
}