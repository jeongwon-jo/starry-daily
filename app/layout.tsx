import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import LockGuard from "@/providers/LockGuard";

const SchoolSafeOuting = localFont({
	src: [
		{
			path: "../public/fonts/Hakgyoansim_Nadeuri_L.otf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../public/fonts/Hakgyoansim_Nadeuri_B.otf",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-SchoolSafeOuting",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://starry-daily.vercel.app/"),
  title: "별별하루",
  description: "소중한 하루를 정리하며 행운의 별을 모아보세요!",
	openGraph: {
    title: "Starry Daily",
    description: "별처럼 기록하는 나만의 하루",
    url: "https://starry-daily.vercel.app/",
    siteName: "Starry Daily",
    images: [
      {
        url: "/images/opengraph.png",
        width: 926,
        height: 452,
        alt: "Starry Daily OG Image",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="ko" className="dark">
			<body className={SchoolSafeOuting.variable}>
				<LockGuard>
					<ThemeProvider initialTheme="dark">
						<div className="wrap">{children}</div>
					</ThemeProvider>
				</LockGuard>
			</body>
		</html>
	);
}
