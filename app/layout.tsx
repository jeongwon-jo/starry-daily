import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";

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
  title: "별별하루",
  description: "소중한 하루를 정리하며 행운의 별을 모아보세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="ko" className="dark">
			<body className={SchoolSafeOuting.variable}>
				<ThemeProvider initialTheme="dark">
					<div className="wrap">{children}</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
