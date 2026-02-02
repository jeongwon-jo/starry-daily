"use client";

import { Header } from "@/components/layout";
import { Button, Input } from "@/components/ui";
import { useState } from "react";

export interface StepProps {
	onNext: () => void;
}

export default function SignupStep1Page() {
	const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [vertifyNumber, setVertifyNumber] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");

	return (
		<div className="w-full min-h-dvh">
			<Header type="navigation" title="계정만들기"></Header>
			<div className="container">
				<div className="px-5 py-5 pb-30 w-full">
					<div className="relative overflow-hidden w-full">
						<div
							className="flex w-full transition-transform duration-300 ease-out"
							style={{ transform: `translateX(-${step * 100}%)` }}
						></div>
					</div>
					<div className="mb-6">
						<h3 className="text-2xl font-bold text-primary-100">
							이름을 입력해 주세요.
						</h3>
					</div>
					<div>
						<Input
							id="name"
							type="text"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
							placeholder="띄어쓰기 없이 입력"
						/>
						<div className="mt-6">
							<Button type="button" size="md" variant="primary700" full>
								다음
							</Button>
						</div>
						{/* <div className="mb-6">
							<label
								htmlFor="birth"
								className="inline-block text-base text-gray-700 mb-2"
							>
								생년월일
							</label>
							<div>
								<Input
									id="birth"
									type="number"
									value={birth}
									onChange={(e) => {
										setBirth(e.target.value);
									}}
									placeholder="생년월일을 입력해 주세요.(YYYYMMDD)"
								/>
							</div>
						</div>
						<div className="mb-6">
							<label
								htmlFor="email"
								className="inline-block text-base text-gray-700 mb-2"
							>
								이메일 인증
							</label>
							<div>
								<div className="flex items-center gap-2 mb-2">
									<Input
										id="email"
										type="text"
										value={email}
										onChange={(e) => {
											setEmail(e.target.value);
										}}
										placeholder="이메일을 입력해 주세요."
									/>
									<Button
										type="button"
										size="md"
										variant="primary"
										className="w-17.25 rounded-lg"
									>
										인증
									</Button>
								</div>
								<Input
									id="veritfyNumber"
									type="number"
									value={vertifyNumber}
									onChange={(e) => {
										setVertifyNumber(e.target.value);
									}}
									placeholder="인증번호를 입력해 주세요."
								/>
							</div>
						</div>
						<div className="mb-6">
							<label
								htmlFor="pwd"
								className="inline-block text-base text-gray-700 mb-2"
							>
								패스워드
							</label>
							<div>
								<Input
									id="pwd"
									type="password"
									value={pwd}
									onChange={(e) => {
										setPwd(e.target.value);
									}}
									placeholder="패스워드를 입력해 주세요."
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="pwdConfirm"
								className="inline-block text-base text-gray-700 mb-2"
							>
								패스워드 확인
							</label>
							<div>
								<Input
									id="pwdConfirm"
									type="password"
									value={pwdConfirm}
									onChange={(e) => {
										setPwdConfirm(e.target.value);
									}}
									placeholder="패스워드를 한번 더 입력해 주세요."
								/>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
}
