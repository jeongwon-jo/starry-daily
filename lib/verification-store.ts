/**
 * 인증코드 임시 저장 (개발/소규모용 인메모리)
 * 프로덕션에서는 Redis 또는 Supabase 테이블 사용 권장
 */
const store = new Map<
	string,
	{ code: string; expiresAt: number }
>();

const TTL_MS = 5 * 60 * 1000; // 5분

export function setCode(email: string, code: string): void {
	store.set(email.toLowerCase(), {
		code,
		expiresAt: Date.now() + TTL_MS,
	});
}

export function verifyAndConsume(email: string, code: string): boolean {
	const key = email.toLowerCase();
	const entry = store.get(key);
	if (!entry) return false;
	if (entry.expiresAt < Date.now()) {
		store.delete(key);
		return false;
	}
	if (entry.code !== code) return false;
	store.delete(key);
	return true;
}
