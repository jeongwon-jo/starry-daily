"use client";

import { Button, Loading } from "@/components/ui";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useState } from "react";

type Notice = {
  id: number;
  title: string;
  created_at: string;
};

type Props = {
  initialData: Notice[];
  totalCoutProp: number;
  query: string;
};

export default function NoticeList({
  initialData,
  totalCoutProp,
  query,
}: Props) {
  const supabase = createClient();
  const [notices, setNotices] = useState(initialData);
  const [totalCount, setTotalCount] = useState(totalCoutProp);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    setIsLoading(true);

    const from = page * 10;
    const to = from + 9;

    let request = supabase
      .from("notices")
      .select("id, title, created_at", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (query) {
      request = request.ilike("title", `%${query}%`);
    }

    const { data, count } = await request;

    if (data && data.length > 0) {
      setNotices((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    }

    if (typeof count === "number") {
      setTotalCount(count);
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  } else
    return (
      <>
        <div className="mt-6">
          {notices.length === 0 ? (
            <p className="text-center text-primary-500">
              검색 결과가 없습니다.
            </p>
          ) : (
            notices.map((notice) => (
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
                    {new Date(notice.created_at).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\. /g, ".").replace(/\.$/, "")}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>

        {notices.length < totalCount && (
          <div className="app_bottom">
            <Button
              type="button"
              size="md"
              variant="primary700"
              full
              onClick={loadMore}
            >
              더보기
            </Button>
          </div>
        )}
      </>
    );
}
