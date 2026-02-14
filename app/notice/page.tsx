import { Header } from "@/components/layout";
import NoticeList from "@/components/notice/NoticeList";
import NoticeSearch from "@/components/notice/NoticeSearch";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";
type Props = {
  searchParams: Promise<{ query?: string }>;
};

export default async function NoticePage({ searchParams }: Props) {
  const supabase = await createClient();
	
	const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query ?? "";

  let request = supabase
		.from("notices")
		.select("id, title, created_at", { count: "exact" }) 
		.order("created_at", { ascending: false })
		.range(0, 9);

  if (query) {
    request = request.ilike("title", `%${query}%`);
  }

  const { data: notices, count,  error } = await request;

  if (error) {
    return (
		<div className="w-full min-h-dvh">
      <Header type="navigation" title="공지사항" isSetting={true} />

      <div className="container pb-20">
        <div className="p-5">
					<p className="text-center text-primary-500">
            에러가 발생했습니다.
          </p>
        </div>
      </div>
    </div>);
  }

  return (
    <div className="w-full min-h-dvh">
      <Header type="navigation" title="공지사항" isSetting={true} />

      <div className="container pb-20">
        <div className="p-5">
          <NoticeSearch defaultValue={query} />
          <NoticeList key={query} initialData={notices ?? []} query={query} totalCoutProp={count ?? 0}/>
        </div>
      </div>
    </div>
  );
}
