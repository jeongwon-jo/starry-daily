"use client";

import { Header } from "@/components/layout";


export default function TermPage() {
  return (
		<div className="w-full min-h-dvh">
			<Header type="navigation" title="이용약관" isSetting={true}></Header>
			<div className="container">
				<div className="p-5">
					<div className="mb-6">
						<h3 className="text-xl text-primary-100 mb-3">이용약관</h3>
						<p className="text-primary-200">
							<span className="block font-bold mb-1">제1조 (목적)</span>본
							약관은 별별하루(이하 “서비스”)가 제공하는 테스트 목적의 웹 서비스
							이용과 관련하여, 서비스와 이용자 간의 권리·의무 및 책임사항을
							규정함을 목적으로 합니다.
							<span className="block font-bold mb-1">
								제2조 (서비스의 성격)
							</span>
							본 서비스는 포트폴리오 및 테스트용 프로젝트로 운영되며, 실제
							상업적 목적의 서비스가 아님을 원칙으로 합니다. 이에 따라 서비스의
							제공은 예고 없이 변경, 중단될 수 있습니다.
							<span className="block font-bold mb-1">
								제3조 (이용자의 의무)
							</span>
							이용자는 다음 행위를 하여서는 안 됩니다.
							<br />
							타인의 정보를 무단으로 사용하는 행위 <br />
							서비스의 정상적인 운영을 방해하는 행위
							<br /> 테스트 목적을 벗어난 악의적인 접근 또는 시도
							<span className="block font-bold mb-1">제4조 (책임의 제한)</span>
							본 서비스는 테스트 목적으로 제공되므로, 서비스 이용 과정에서
							발생한 데이터 손실, 오류, 장애 등에 대해 운영자는 책임을 지지
							않습니다.
							<span className="block font-bold mb-1">제5조 (약관의 변경)</span>
							본 약관은 서비스 개선 및 정책 변경에 따라 수정될 수 있으며, 변경
							사항은 서비스 내 공지를 통해 안내됩니다.
						</p>
					</div>
					<div className="mb-3">
						<h3 className="text-xl text-primary-100 mb-3">개인정보처리방침</h3>
						<p className="text-primary-200">
							<span className="block font-bold mb-1">
								1. 개인정보의 수집 목적
							</span>
							본 서비스는 테스트 프로젝트로, 서비스 기능 구현 및 테스트를 위해
							최소한의 개인정보를 수집할 수 있습니다.
							<span className="block font-bold mb-1">
								2. 수집하는 개인정보 항목
							</span>
							이메일 주소 (로그인 및 사용자 식별 목적)
							<br /> 닉네임 또는 사용자 이름 <br />
							서비스 이용 기록 (로그 데이터) <br />※ 실제 민감 정보는 수집하지
							않습니다.
							<span className="block font-bold mb-1">
								3. 개인정보의 보관 및 이용 기간
							</span>
							수집된 개인정보는 테스트 기간 동안에만 보관되며, 프로젝트 종료
							또는 서비스 중단 시 지체 없이 삭제됩니다.
							<span className="block font-bold mb-1">
								4. 개인정보의 제3자 제공
							</span>
							본 서비스는 이용자의 개인정보를 외부에 제공하지 않습니다.
							<span className="block font-bold mb-1">
								5. 개인정보 보호에 대한 고지
							</span>
							본 서비스는 테스트 프로젝트로, 상용 서비스 수준의 보안이 적용되지
							않을 수 있습니다. 중요한 개인정보 입력은 지양해 주시기 바랍니다.
							<span className="block font-bold mb-1">
								6. 개인정보 보호 책임자
							</span>
							담당자: 프로젝트 관리자 <br /> 문의: (테스트 프로젝트용 이메일
							또는 미기재 가능)
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
