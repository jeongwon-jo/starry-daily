# 🌟 별별하루 (Starry Daily)

> 소중한 하루를 정리하며 행운의 별을 모아보는 감성 일기 앱

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-2-3ECF8E?logo=supabase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)

---

## 📖 소개

**별별하루**는 매일 일기를 쓰고, 쌓인 일기를 별로 시각화해서 유리병에 모아가는 감성 다이어리 앱입니다.  
일반 일기 작성과 AI가 내 과거 일기를 기반으로 생성하는 맞춤 질문 일기, 두 가지 방식을 지원합니다.

🔗 **라이브 데모**: [https://starry-daily.vercel.app](https://starry-daily.vercel.app)

---

## ✨ 주요 기능

- **일기 작성** — 자유 일기 또는 AI 맞춤 질문 기반 일기 선택
- **AI 질문 생성** — 과거 일기 내용을 분석해 오늘에 맞는 한 문장 질문 자동 생성 (OpenAI GPT-4o-mini)
- **별 시각화** — 작성한 일기가 기분별 색상의 별로 변환되어 유리병에 쌓임
- **캘린더 & 리스트 뷰** — 월별 캘린더 또는 리스트로 일기 조회
- **다크 / 라이트 테마** — 사용자 설정 테마 저장
- **앱 잠금** — 비밀번호로 앱 접근 보호
- **이메일 인증 회원가입** — 6자리 인증코드 이메일 발송
- **공지사항** — 검색 및 무한 스크롤 지원

---

## 🛠 기술 스택

| 분류            | 기술                      |
| --------------- | ------------------------- |
| Framework       | Next.js 16 (App Router)   |
| Language        | TypeScript 5              |
| Styling         | Tailwind CSS 4            |
| Database / Auth | Supabase                  |
| AI              | OpenAI GPT-4o-mini        |
| Email           | Nodemailer (SMTP), Resend |
| Deployment      | Vercel                    |

---

## 🚀 설치 방법

### 사전 요구사항

- Node.js 20 이상
- Supabase 프로젝트
- OpenAI API 키
- SMTP 메일 서버 (Gmail 등)

### 설치

```bash
git clone https://github.com/your-username/starry-daily.git
cd starry-daily
npm install
```

---

## ▶️ 실행 / 빌드 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린트 검사
npm run lint
```

개발 서버 실행 후 [http://localhost:3000](http://localhost:3000) 에서 확인하세요.

---

## 📁 프로젝트 구조

```
starry-daily/
├── app/
│   ├── (root)/              # 메인 홈 (별 유리병 화면)
│   ├── diary/               # 일기 목록 (캘린더 / 리스트)
│   │   ├── [id]/            # 일기 상세 / 수정
│   │   └── write/           # 일기 작성 / 완료
│   ├── login/               # 로그인
│   ├── signup/              # 회원가입 (4단계)
│   ├── setting/             # 설정 (테마, 잠금, 이용약관)
│   ├── notice/              # 공지사항 목록 / 상세
│   ├── lock/                # 잠금 설정
│   ├── unlock/              # 잠금 해제
│   └── api/
│       ├── auth/
│       │   ├── send-verification/   # 이메일 인증코드 발송
│       │   └── verify-code/         # 인증코드 확인
│       ├── delete-account/          # 회원 탈퇴
│       └── diary/
│           └── generate-question/   # AI 일기 질문 생성
├── components/
│   ├── ui/                  # 공통 UI (Button, Input, Loading, Modal 등)
│   ├── diary/               # 일기 관련 컴포넌트
│   ├── layout/              # 헤더 등 레이아웃
│   ├── notice/              # 공지사항 컴포넌트
│   └── signup/              # 회원가입 단계 컴포넌트
├── providers/
│   ├── ThemeProvider.tsx    # 다크/라이트 테마 컨텍스트
│   └── LockGuard.tsx        # 앱 잠금 가드
├── utils/
│   └── supabase/            # Supabase 클라이언트 (server / client)
├── lib/
│   └── smtp.ts              # 메일 발송 유틸
└── public/
    └── fonts/               # 로컬 폰트 (학교안심 나들이체)
```

<!-- ## 📡 API 문서

### `POST /api/auth/send-verification`

이메일로 6자리 인증코드를 발송합니다.

**요청**

```json
{ "email": "user@example.com" }
```

**응답**

```json
{ "ok": true, "emailSent": true }
```

---

### `POST /api/auth/verify-code`

인증코드를 검증합니다.

**요청**

```json
{ "email": "user@example.com", "code": "123456" }
```

**응답**

```json
{ "ok": true }
```

---

### `GET /api/diary/generate-question`

로그인된 사용자의 최근 일기 5개를 기반으로 AI 질문을 생성합니다. 인증 필요 (Supabase 세션).

**응답**

```json
{ "question": "오늘 가장 마음에 남은 대화는 무엇인가요?" }
```

---

### `POST /api/delete-account`

사용자 계정 및 모든 일기 데이터를 삭제합니다.

**요청**

```json
{ "userId": "uuid" }
```

**응답**

```json
{ "success": true }
``` -->

<!--

## 🤝 기여 방법

1. 이 저장소를 Fork합니다.
2. 기능 브랜치를 생성합니다. (`git checkout -b feat/기능명`)
3. 변경사항을 커밋합니다. (`git commit -m "feat: 기능 추가"`)
4. 브랜치에 Push합니다. (`git push origin feat/기능명`)
5. Pull Request를 생성합니다.

**커밋 메시지 규칙**

| 타입       | 설명             |
| ---------- | ---------------- |
| `feat`     | 새로운 기능 추가 |
| `fix`      | 버그 수정        |
| `refactor` | 리팩토링         |
| `style`    | UI / 스타일 변경 |
| `docs`     | 문서 수정        |
| `chore`    | 빌드, 설정 변경  | -->
