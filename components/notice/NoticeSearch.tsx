"use client";

import { IconSearch } from "@/components/icons";
import { Input } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
	defaultValue?: string;
};

export default function NoticeSearch({ defaultValue = "" }: Props) {
	const router = useRouter();
	const [searchWord, setSearchWord] = useState(defaultValue);

	const handleSearch = () => {
		if (!searchWord.trim()) {
			router.push("/notice");
			return;
		}

		router.push(`/notice?query=${encodeURIComponent(searchWord)}`);
	};

	return (
		<div className="flex items-center justify-between bg-primary-900 pr-3 gap-2 rounded-xl">
			<Input
				type="text"
				value={searchWord}
				onChange={(e) => setSearchWord(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") handleSearch();
				}}
				placeholder="검색어를 입력해 주세요."
			/>
			<button type="button" onClick={handleSearch}>
				<IconSearch className="text-primary-500" />
			</button>
		</div>
	);
}
