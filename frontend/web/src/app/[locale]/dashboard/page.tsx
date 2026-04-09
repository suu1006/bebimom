"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";

/* ═══════════════════════════════════
   아이콘
═══════════════════════════════════ */
const BottleIcon = ({ white, sm }: { white?: boolean; sm?: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" className={sm ? "w-5 h-5" : "w-7 h-7"}
    stroke={white ? "white" : "#5B8DEF"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 2h6M8 5h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
    <path d="M10 10c0-1.1.9-2 2-2s2 .9 2 2v4H10v-4z" /><line x1="12" y1="14" x2="12" y2="17" />
  </svg>
);
const MoonIcon = ({ white, sm }: { white?: boolean; sm?: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" className={sm ? "w-5 h-5" : "w-7 h-7"}
    stroke={white ? "white" : "#7B6CF6"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
  </svg>
);
const DropIcon = ({ white, sm }: { white?: boolean; sm?: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" className={sm ? "w-5 h-5" : "w-7 h-7"}
    stroke={white ? "white" : "#4BB8A9"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.48 2 4 8 4 12a8 8 0 0 0 16 0c0-4-2.48-10-8-10z" />
  </svg>
);
const PulseIcon = ({ white, sm }: { white?: boolean; sm?: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" className={sm ? "w-5 h-5" : "w-7 h-7"}
    stroke={white ? "white" : "#C47EE8"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2,12 6,12 8,5 10,19 12,8 14,15 16,12 22,12" />
  </svg>
);
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9,22 9,12 15,12 15,22" />
  </svg>
);
const BarChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const GearIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const SparkleIcon = ({ color = "#D4537E" }: { color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
    <circle cx="18" cy="5" r="1" fill={color} /><circle cx="19" cy="8" r="0.5" fill={color} />
  </svg>
);
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" />
  </svg>
);
const TrendUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" />
  </svg>
);
const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="9,12 11,14 15,10" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9,18 15,12 9,6" />
  </svg>
);

/* ═══════════════════════════════════
   K-DST 데이터 (4~5개월 기준)
═══════════════════════════════════ */
type KDSTDomain = "대근육" | "소근육" | "인지" | "언어" | "사회성" | "자조";
type KDSTAnswer = 0 | 1 | 2 | 3 | null;

interface KDSTQuestion {
  id: number;
  domain: KDSTDomain;
  text: string;
}

const KDST_QUESTIONS: KDSTQuestion[] = [
  // 대근육 운동
  { id: 1,  domain: "대근육", text: "엎어놓으면 머리를 45도 이상 들 수 있다" },
  { id: 2,  domain: "대근육", text: "엎어놓으면 머리를 90도 이상 들 수 있다" },
  { id: 3,  domain: "대근육", text: "엎어놓으면 두 팔로 몸통을 지지하여 가슴을 들 수 있다" },
  { id: 4,  domain: "대근육", text: "양쪽 겨드랑이를 잡아주면 발로 버틸 수 있다" },
  { id: 5,  domain: "대근육", text: "잡아서 세워주면 발로 바닥을 밀 수 있다" },
  // 소근육 운동
  { id: 6,  domain: "소근육", text: "손에 딸랑이를 쥐어주면 잠깐 동안 잡고 있을 수 있다" },
  { id: 7,  domain: "소근육", text: "스스로 손을 쥐었다 폈다 할 수 있다" },
  { id: 8,  domain: "소근육", text: "손을 입 근처로 가져갈 수 있다" },
  { id: 9,  domain: "소근육", text: "양손을 모아 몸 중앙으로 가져올 수 있다" },
  { id: 10, domain: "소근육", text: "물건을 잡으려고 손을 뻗을 수 있다" },
  // 인지
  { id: 11, domain: "인지", text: "얼굴을 바라보면 눈을 맞출 수 있다" },
  { id: 12, domain: "인지", text: "움직이는 물체를 시선으로 180도 따라갈 수 있다" },
  { id: 13, domain: "인지", text: "소리가 나는 방향으로 고개를 돌릴 수 있다" },
  { id: 14, domain: "인지", text: "거울 속 자기 얼굴을 바라볼 수 있다" },
  { id: 15, domain: "인지", text: "여러 색깔의 물건에 관심을 보인다" },
  // 언어
  { id: 16, domain: "언어", text: "양육자가 말을 걸면 소리를 내어 반응할 수 있다" },
  { id: 17, domain: "언어", text: "옹알이를 할 수 있다" },
  { id: 18, domain: "언어", text: "웃는 소리를 낼 수 있다" },
  { id: 19, domain: "언어", text: "소리를 낼 때 음의 높낮이가 다양하다" },
  { id: 20, domain: "언어", text: "큰 소리가 나면 반응한다" },
  // 사회성
  { id: 21, domain: "사회성", text: "양육자를 바라보며 미소를 지을 수 있다" },
  { id: 22, domain: "사회성", text: "여러 사람 중에서 양육자를 알아볼 수 있다" },
  { id: 23, domain: "사회성", text: "사람의 목소리를 들으면 관심을 보인다" },
  { id: 24, domain: "사회성", text: "놀아주면 즐겁게 반응할 수 있다" },
  { id: 25, domain: "사회성", text: "낯선 사람과 아는 사람을 구별하는 듯한 모습을 보인다" },
  // 자조
  { id: 26, domain: "자조", text: "배가 고프면 울어서 표현할 수 있다" },
  { id: 27, domain: "자조", text: "불편하면 울어서 표현할 수 있다" },
  { id: 28, domain: "자조", text: "기저귀가 젖으면 울어서 표현할 수 있다" },
  { id: 29, domain: "자조", text: "달래주면 금세 그칠 수 있다" },
  { id: 30, domain: "자조", text: "주먹이나 손가락을 빨 수 있다" },
];

const DOMAINS: KDSTDomain[] = ["대근육", "소근육", "인지", "언어", "사회성", "자조"];
const DOMAIN_COLOR: Record<KDSTDomain, string> = {
  대근육: "bg-orange-100 text-orange-600",
  소근육: "bg-blue-100 text-blue-600",
  인지: "bg-purple-100 text-purple-600",
  언어: "bg-green-100 text-green-600",
  사회성: "bg-pink-100 text-pink-600",
  자조: "bg-yellow-100 text-yellow-600",
};
const DOMAIN_BAR: Record<KDSTDomain, string> = {
  대근육: "bg-orange-400",
  소근육: "bg-blue-400",
  인지: "bg-purple-400",
  언어: "bg-green-400",
  사회성: "bg-pink-400",
  자조: "bg-yellow-400",
};

function scoreDomain(answers: Record<number, KDSTAnswer>, domain: KDSTDomain) {
  const qs = KDST_QUESTIONS.filter((q) => q.domain === domain);
  return qs.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
}

function interpretDomain(score: number, total: number): { label: string; color: string } {
  const ratio = score / total;
  if (ratio >= 0.9) return { label: "빠른 발달", color: "text-blue-600" };
  if (ratio >= 0.7) return { label: "또래 수준", color: "text-green-600" };
  if (ratio >= 0.5) return { label: "추적 검사 필요", color: "text-orange-500" };
  return { label: "심화 평가 필요", color: "text-red-500" };
}

/* ═══════════════════════════════════
   바텀시트 폼
═══════════════════════════════════ */
type SheetType = "select" | "수유" | "수면" | "기저귀" | "유축";

function nowTimeString() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

function FeedingForm({ onClose }: { onClose: () => void }) {
  const [feedType, setFeedType] = useState<"분유" | "모유" | "이유식">("분유");
  const [time, setTime] = useState(nowTimeString());
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center shrink-0"><BottleIcon white /></div>
        <div className="flex-1"><p className="font-bold text-gray-900 text-base">수유 기록</p><p className="text-xs text-gray-400 mt-0.5">오늘의 발자취 남기기</p></div>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500">✕</button>
      </div>
      <div className="space-y-5 flex-1 overflow-y-auto">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">유형 선택</p>
          <div className="flex gap-2">
            {(["분유", "모유", "이유식"] as const).map((t) => (
              <button key={t} onClick={() => setFeedType(t)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${feedType === t ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-500 border-gray-200"}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><p className="text-xs font-medium text-gray-500 mb-2">시간</p><input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-blue-400" /></div>
          <div><p className="text-xs font-medium text-gray-500 mb-2">양 (ML)</p><input type="number" placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-blue-400" /></div>
        </div>
        <div><p className="text-xs font-medium text-gray-500 mb-2">메모</p><textarea rows={3} placeholder="특이사항이 있다면 적어주세요." value={memo} onChange={(e) => setMemo(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 resize-none focus:outline-none focus:border-blue-400" /></div>
      </div>
      <button onClick={onClose} className="mt-6 w-full py-4 rounded-2xl bg-blue-500 text-white font-semibold text-base hover:bg-blue-600 active:scale-95 transition-all">기록 완료하기</button>
    </div>
  );
}

function SleepForm({ onClose }: { onClose: () => void }) {
  const [sleepType, setSleepType] = useState<"낮잠" | "밤잠">("낮잠");
  const [startTime, setStartTime] = useState(nowTimeString());
  const [endTime, setEndTime] = useState("");
  const [memo, setMemo] = useState("");
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center shrink-0"><MoonIcon white /></div>
        <div className="flex-1"><p className="font-bold text-gray-900 text-base">수면 기록</p><p className="text-xs text-gray-400 mt-0.5">오늘의 발자취 남기기</p></div>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500">✕</button>
      </div>
      <div className="space-y-5 flex-1 overflow-y-auto">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">수면 종류</p>
          <div className="flex gap-2">
            {(["낮잠", "밤잠"] as const).map((t) => (
              <button key={t} onClick={() => setSleepType(t)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${sleepType === t ? "bg-indigo-500 text-white border-indigo-500" : "bg-white text-gray-500 border-gray-200"}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><p className="text-xs font-medium text-gray-500 mb-2">시작 시간</p><input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-indigo-400" /></div>
          <div><p className="text-xs font-medium text-gray-500 mb-2">종료 시간</p><input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-indigo-400" /></div>
        </div>
        <div><p className="text-xs font-medium text-gray-500 mb-2">메모</p><textarea rows={3} placeholder="특이사항이 있다면 적어주세요." value={memo} onChange={(e) => setMemo(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 resize-none focus:outline-none focus:border-indigo-400" /></div>
      </div>
      <button onClick={onClose} className="mt-6 w-full py-4 rounded-2xl bg-indigo-500 text-white font-semibold text-base hover:bg-indigo-600 active:scale-95 transition-all">기록 완료하기</button>
    </div>
  );
}

function DiaperForm({ onClose }: { onClose: () => void }) {
  const [diaperType, setDiaperType] = useState<"소변" | "대변" | "둘다">("소변");
  const [time, setTime] = useState(nowTimeString());
  const [memo, setMemo] = useState("");
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center shrink-0"><DropIcon white /></div>
        <div className="flex-1"><p className="font-bold text-gray-900 text-base">기저귀 기록</p><p className="text-xs text-gray-400 mt-0.5">오늘의 발자취 남기기</p></div>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500">✕</button>
      </div>
      <div className="space-y-5 flex-1 overflow-y-auto">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">유형 선택</p>
          <div className="flex gap-2">
            {(["소변", "대변", "둘다"] as const).map((t) => (
              <button key={t} onClick={() => setDiaperType(t)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${diaperType === t ? "bg-teal-500 text-white border-teal-500" : "bg-white text-gray-500 border-gray-200"}`}>{t}</button>
            ))}
          </div>
        </div>
        <div><p className="text-xs font-medium text-gray-500 mb-2">시간</p><input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-teal-400" /></div>
        <div><p className="text-xs font-medium text-gray-500 mb-2">메모</p><textarea rows={3} placeholder="특이사항이 있다면 적어주세요." value={memo} onChange={(e) => setMemo(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 resize-none focus:outline-none focus:border-teal-400" /></div>
      </div>
      <button onClick={onClose} className="mt-6 w-full py-4 rounded-2xl bg-teal-500 text-white font-semibold text-base hover:bg-teal-600 active:scale-95 transition-all">기록 완료하기</button>
    </div>
  );
}

function PumpingForm({ onClose }: { onClose: () => void }) {
  const [time, setTime] = useState(nowTimeString());
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-violet-500 flex items-center justify-center shrink-0"><PulseIcon white /></div>
        <div className="flex-1"><p className="font-bold text-gray-900 text-base">유축 기록</p><p className="text-xs text-gray-400 mt-0.5">오늘의 발자취 남기기</p></div>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500">✕</button>
      </div>
      <div className="space-y-5 flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3">
          <div><p className="text-xs font-medium text-gray-500 mb-2">시간</p><input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-violet-400" /></div>
          <div><p className="text-xs font-medium text-gray-500 mb-2">양 (ML)</p><input type="number" placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-violet-400" /></div>
        </div>
        <div><p className="text-xs font-medium text-gray-500 mb-2">메모</p><textarea rows={3} placeholder="특이사항이 있다면 적어주세요." value={memo} onChange={(e) => setMemo(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 resize-none focus:outline-none focus:border-violet-400" /></div>
      </div>
      <button onClick={onClose} className="mt-6 w-full py-4 rounded-2xl bg-violet-500 text-white font-semibold text-base hover:bg-violet-600 active:scale-95 transition-all">기록 완료하기</button>
    </div>
  );
}

function SelectSheet({ onSelect }: { onSelect: (t: SheetType) => void }) {
  const items = [
    { type: "수유" as const, icon: <BottleIcon white />, bg: "bg-blue-500", label: "수유", desc: "모유 · 분유 · 이유식" },
    { type: "수면" as const, icon: <MoonIcon white />, bg: "bg-indigo-500", label: "수면", desc: "낮잠 · 밤잠" },
    { type: "기저귀" as const, icon: <DropIcon white />, bg: "bg-teal-500", label: "기저귀", desc: "소변 · 대변" },
    { type: "유축" as const, icon: <PulseIcon white />, bg: "bg-violet-500", label: "유축", desc: "유축량 기록" },
  ];
  return (
    <div>
      <p className="text-center text-base font-bold text-gray-900 mb-1">기록 추가</p>
      <p className="text-center text-xs text-gray-400 mb-6">무엇을 기록할까요?</p>
      <div className="grid grid-cols-2 gap-3">
        {items.map(({ type, icon, bg, label, desc }) => (
          <button key={type} onClick={() => onSelect(type)}
            className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4 hover:bg-gray-100 active:scale-95 transition-all text-left">
            <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0`}>{icon}</div>
            <div><p className="text-sm font-semibold text-gray-800">{label}</p><p className="text-[11px] text-gray-400 mt-0.5">{desc}</p></div>
          </button>
        ))}
      </div>
    </div>
  );
}

function BottomSheet({ open, onClose, type, onTypeChange }: {
  open: boolean; onClose: () => void; type: SheetType; onTypeChange: (t: SheetType) => void;
}) {
  return (
    <>
      <div className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={onClose} />
      <div className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${open ? "translate-y-0" : "translate-y-full"}`} style={{ maxHeight: "85dvh" }}>
        <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 rounded-full bg-gray-200" /></div>
        <div className="px-6 pb-8 pt-4 overflow-y-auto" style={{ maxHeight: "calc(85dvh - 24px)" }}>
          {type === "select" && <SelectSheet onSelect={onTypeChange} />}
          {type === "수유" && <FeedingForm onClose={onClose} />}
          {type === "수면" && <SleepForm onClose={onClose} />}
          {type === "기저귀" && <DiaperForm onClose={onClose} />}
          {type === "유축" && <PumpingForm onClose={onClose} />}
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════
   K-DST 설문 컴포넌트
═══════════════════════════════════ */
type KDSTStep = "intro" | "survey" | "result";

function KDSTView() {
  const [step, setStep] = useState<KDSTStep>("intro");
  const [activeDomain, setActiveDomain] = useState<KDSTDomain>("대근육");
  const [answers, setAnswers] = useState<Record<number, KDSTAnswer>>({});

  const domainQuestions = KDST_QUESTIONS.filter((q) => q.domain === activeDomain);
  const domainIndex = DOMAINS.indexOf(activeDomain);
  const answeredInDomain = domainQuestions.filter((q) => answers[q.id] !== undefined && answers[q.id] !== null).length;
  const totalAnswered = KDST_QUESTIONS.filter((q) => answers[q.id] !== undefined && answers[q.id] !== null).length;
  const allAnswered = totalAnswered === KDST_QUESTIONS.length;

  function setAnswer(id: number, val: KDSTAnswer) {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  }

  const ANSWER_OPTIONS: { label: string; val: KDSTAnswer; active: string }[] = [
    { label: "잘 함", val: 3, active: "bg-green-500 text-white border-green-500" },
    { label: "가끔 함", val: 2, active: "bg-blue-500 text-white border-blue-500" },
    { label: "못함", val: 1, active: "bg-orange-400 text-white border-orange-400" },
    { label: "모름", val: 0, active: "bg-gray-400 text-white border-gray-400" },
  ];

  if (step === "intro") {
    return (
      <div>
        {/* 안내 카드 */}
        <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-5 mb-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
              <SparkleIcon color="#6366f1" />
            </div>
            <span className="font-semibold text-gray-800 text-sm">K-DST 발달 선별 검사</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            한국 영유아 발달 선별 검사(K-DST)는 대근육·소근육·인지·언어·사회성·자조 6개 영역의 발달을 평가합니다.
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {DOMAINS.map((d) => (
              <span key={d} className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${DOMAIN_COLOR[d]}`}>{d}</span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-white border border-gray-100 p-4 mb-5 shadow-sm space-y-2.5">
          {[
            { icon: "📋", text: "총 30문항 (영역별 5문항)" },
            { icon: "⏱️", text: "소요 시간 약 5~10분" },
            { icon: "👶", text: "4~5개월 영아 기준 문항" },
            { icon: "💡", text: "최근 1주 기준으로 응답해 주세요" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <span className="text-base">{icon}</span>
              <p className="text-sm text-gray-600">{text}</p>
            </div>
          ))}
        </div>
        <button onClick={() => setStep("survey")}
          className="w-full py-4 rounded-2xl bg-indigo-500 text-white font-semibold text-base hover:bg-indigo-600 active:scale-95 transition-all">
          검사 시작하기
        </button>
      </div>
    );
  }

  if (step === "survey") {
    return (
      <div>
        {/* 진행 바 */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500 font-medium">{totalAnswered} / {KDST_QUESTIONS.length} 문항 완료</span>
            <span className="text-xs text-indigo-500 font-medium">{Math.round((totalAnswered / KDST_QUESTIONS.length) * 100)}%</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
            <div className="h-full bg-indigo-400 rounded-full transition-all duration-500" style={{ width: `${(totalAnswered / KDST_QUESTIONS.length) * 100}%` }} />
          </div>
        </div>

        {/* 영역 탭 */}
        <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1 scrollbar-hide">
          {DOMAINS.map((d) => {
            const dAnswered = KDST_QUESTIONS.filter((q) => q.domain === d && answers[q.id] !== undefined && answers[q.id] !== null).length;
            const dTotal = KDST_QUESTIONS.filter((q) => q.domain === d).length;
            const done = dAnswered === dTotal;
            return (
              <button key={d} onClick={() => setActiveDomain(d)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                  activeDomain === d ? "bg-indigo-500 text-white border-indigo-500"
                    : done ? "bg-green-50 text-green-600 border-green-200"
                    : "bg-white text-gray-500 border-gray-200"
                }`}>
                {done ? "✓ " : ""}{d}
              </button>
            );
          })}
        </div>

        {/* 문항 */}
        <div className="space-y-4 mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {activeDomain} 운동 &mdash; {answeredInDomain}/{domainQuestions.length} 완료
          </p>
          {domainQuestions.map((q, i) => (
            <div key={q.id} className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
              <p className="text-sm font-medium text-gray-800 mb-3">
                <span className="text-indigo-400 font-bold mr-1">{domainIndex * 5 + i + 1}.</span>
                {q.text}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {ANSWER_OPTIONS.map(({ label, val, active }) => (
                  <button key={label} onClick={() => setAnswer(q.id, val)}
                    className={`py-2 rounded-xl text-xs font-medium border transition ${answers[q.id] === val ? active : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 다음 영역 / 결과보기 */}
        {domainIndex < DOMAINS.length - 1 ? (
          <button onClick={() => setActiveDomain(DOMAINS[domainIndex + 1])}
            className="w-full py-4 rounded-2xl bg-indigo-500 text-white font-semibold text-base hover:bg-indigo-600 active:scale-95 transition-all">
            다음 영역으로 →
          </button>
        ) : (
          <button onClick={() => setStep("result")} disabled={!allAnswered}
            className={`w-full py-4 rounded-2xl font-semibold text-base transition-all ${allAnswered ? "bg-green-500 text-white hover:bg-green-600 active:scale-95" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
            {allAnswered ? "결과 보기" : `${KDST_QUESTIONS.length - totalAnswered}문항 남았어요`}
          </button>
        )}
      </div>
    );
  }

  // result
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-lg font-bold text-gray-900">검사 결과</p>
          <p className="text-xs text-gray-400 mt-0.5">4~5개월 발달 선별 결과</p>
        </div>
        <button onClick={() => { setAnswers({}); setStep("intro"); setActiveDomain("대근육"); }}
          className="text-xs text-indigo-500 font-medium border border-indigo-200 px-3 py-1.5 rounded-full">
          다시 검사
        </button>
      </div>

      {/* 종합 */}
      {(() => {
        const total = KDST_QUESTIONS.reduce((s, q) => s + (answers[q.id] ?? 0), 0);
        const max = KDST_QUESTIONS.length * 3;
        const pct = Math.round((total / max) * 100);
        return (
          <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-5 mb-5 text-center">
            <p className="text-xs text-indigo-400 font-medium mb-1">종합 점수</p>
            <p className="text-4xl font-bold text-indigo-600 mb-1">{total}<span className="text-base text-indigo-300">/{max}</span></p>
            <div className="h-2.5 rounded-full bg-indigo-100 mt-3 mb-1 overflow-hidden">
              <div className="h-full bg-indigo-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
            </div>
            <p className="text-xs text-indigo-400">{pct}% 달성</p>
          </div>
        );
      })()}

      {/* 영역별 결과 */}
      <div className="space-y-3 mb-6">
        {DOMAINS.map((d) => {
          const qs = KDST_QUESTIONS.filter((q) => q.domain === d);
          const score = scoreDomain(answers, d);
          const max = qs.length * 3;
          const pct = Math.round((score / max) * 100);
          const interp = interpretDomain(score, max);
          return (
            <div key={d} className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${DOMAIN_COLOR[d]}`}>{d}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-800">{score}<span className="text-xs text-gray-400">/{max}</span></span>
                  <span className={`ml-2 text-xs font-medium ${interp.color}`}>{interp.label}</span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className={`h-full ${DOMAIN_BAR[d]} rounded-full transition-all`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* 안내 */}
      <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4 text-sm text-amber-700 leading-relaxed">
        ⚠️ 이 검사는 전문 의료 진단을 대체하지 않습니다. &quot;추적 검사 필요&quot; 또는 &quot;심화 평가 필요&quot; 결과가 있으면 소아과 전문의와 상담하세요.
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   리포트 뷰
═══════════════════════════════════ */
function ReportView({ babyName }: { babyName: string }) {
  const [showKDST, setShowKDST] = useState(false);

  const aiInsights = [
    { icon: <TrendUpIcon />, title: "수면의 질이 향상되었어요", desc: "이번 주 총 수면 시간이 15% 증가했습니다. 밤중 깸 횟수도 1회로 줄었어요.", bg: "bg-green-50" },
    { icon: <CheckCircleIcon />, title: "수유량이 일정해요", desc: "일평균 수유량은 690ml로, 현재 월령과 체중 백분위수에 아주 적절합니다.", bg: "bg-indigo-50" },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-6 pb-28 space-y-6">
      {/* 헤더 */}
      <div className="pt-2">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">주간 리포트</h1>
        <p className="mt-1 text-sm text-gray-400">AI가 분석한 {babyName}의 생활 패턴</p>
      </div>

      {/* AI 건강 리포트 */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-gray-50">
          <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
            <SparkleIcon />
          </div>
          <span className="font-bold text-gray-800">AI 건강 리포트</span>
        </div>
        <div className="divide-y divide-gray-50">
          {aiInsights.map(({ icon, title, desc, bg }) => (
            <div key={title} className="flex items-start gap-3 px-5 py-4">
              <div className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center shrink-0 mt-0.5`}>{icon}</div>
              <div>
                <p className="text-sm font-bold text-gray-800">{title}</p>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 이번 주 통계 */}
      <section>
        <h2 className="text-sm font-bold text-gray-700 mb-3">이번 주 통계</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "평균 수유 횟수", value: "7.4회/일", sub: "전주 대비 +0.3회", color: "text-blue-500" },
            { label: "평균 수면 시간", value: "16.2h/일", sub: "전주 대비 +1.2h", color: "text-indigo-500" },
            { label: "기저귀 교체", value: "8.1회/일", sub: "소변 6.8, 대변 1.3", color: "text-teal-500" },
            { label: "유축량", value: "680ml/일", sub: "전주 대비 +30ml", color: "text-violet-500" },
          ].map(({ label, value, sub, color }) => (
            <div key={label} className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
              <p className="text-xs text-gray-400 mb-1">{label}</p>
              <p className={`text-base font-bold ${color}`}>{value}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* K-DST 발달 검사 */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-700">K-DST 발달 선별 검사</h2>
          <span className="text-[11px] text-gray-400 bg-gray-100 px-2 py-1 rounded-full">4~5개월</span>
        </div>

        {!showKDST ? (
          <button onClick={() => setShowKDST(true)}
            className="w-full rounded-2xl bg-white border border-indigo-100 p-5 text-left hover:bg-indigo-50 transition-colors shadow-sm group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <SparkleIcon color="#6366f1" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">발달 선별 검사 시작</p>
                  <p className="text-xs text-gray-400 mt-0.5">30문항 · 약 5~10분</p>
                </div>
              </div>
              <span className="text-indigo-400 group-hover:translate-x-1 transition-transform">
                <ChevronRightIcon />
              </span>
            </div>
          </button>
        ) : (
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
            <KDSTView />
          </div>
        )}
      </section>
    </div>
  );
}

/* ═══════════════════════════════════
   AI 상담 채팅 뷰
═══════════════════════════════════ */
interface ChatMessage {
  id: number;
  role: "ai" | "user";
  text: string;
  time: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: 1, role: "ai", text: "안녕하세요! 저는 베이비케어 AI예요 👶\n레오의 건강, 수유, 수면, 발달에 관해 무엇이든 물어보세요!", time: "지금" },
];

const SUGGESTIONS = [
  "생후 3개월 수유량은?",
  "밤중 수유 줄이는 법",
  "낮잠 스케줄 잡는 법",
  "예방접종 일정 알려줘",
];

function ChatView({ babyName }: { babyName: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const msgIdRef = useRef(100);

  const AI_RESPONSES: Record<string, string> = {
    "생후 3개월 수유량은?": `생후 3개월 아기의 하루 수유량은 보통 **600~900ml** 정도예요.\n\n한 번에 120~180ml씩, 하루 5~7회 정도가 일반적이에요. ${babyName}의 현재 평균 690ml는 아주 적절한 수준이에요! 😊`,
    "밤중 수유 줄이는 법": `밤중 수유를 줄이려면 이렇게 해보세요:\n\n1. 낮 동안 수유 텀을 충분히 확보하기\n2. 잠들기 전 마지막 수유를 충분히 하기\n3. 밤중에 깰 때 바로 수유하지 않고 5분 정도 기다려 보기\n\n생후 4~6개월 이후부터 서서히 줄여가는 게 좋아요!`,
    "낮잠 스케줄 잡는 법": `3개월 아기의 낮잠은 하루 4~5회, 총 4~6시간 정도가 적당해요.\n\n깨어있는 시간(wake window)이 60~90분이 되면 재우는 것이 좋아요. ${babyName}의 최근 수면 패턴이 안정되고 있으니 조금만 더 규칙적으로 맞춰보세요! 🌙`,
    "예방접종 일정 알려줘": `생후 3개월 즈음의 예방접종 일정이에요:\n\n• **2개월**: B형간염 2차, DTaP·IPV·Hib 1차, 폐렴구균 1차, 로타바이러스 1차\n• **4개월**: DTaP·IPV·Hib 2차, 폐렴구균 2차, 로타바이러스 2차\n\n다음 접종일을 꼭 메모해두세요! 💉`,
  };

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;
    const uid = ++msgIdRef.current;

    const userMsg: ChatMessage = { id: uid, role: "user", text: text.trim(), time: timeStr };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = AI_RESPONSES[text.trim()] ?? "좋은 질문이에요! 좀 더 구체적인 상황을 알려주시면 더 정확한 답변을 드릴 수 있어요 😊";
      const aiMsg: ChatMessage = { id: uid + 1, role: "ai", text: reply, time: timeStr };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 h-screen">
      {/* 채팅 헤더 */}
      <div className="px-5 pt-12 pb-4 bg-white border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-pink-300 to-pink-500 flex items-center justify-center text-lg shadow-sm">🤖</div>
          <div>
            <p className="font-bold text-gray-900 text-sm">베이비케어 AI</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] text-green-500">온라인</span>
            </div>
          </div>
        </div>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-44">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
            {msg.role === "ai" && (
              <div className="w-7 h-7 rounded-full bg-linear-to-br from-pink-300 to-pink-500 flex items-center justify-center text-sm shrink-0 mb-1">🤖</div>
            )}
            <div className={`max-w-[78%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
              <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                msg.role === "user"
                  ? "bg-pink-400 text-white rounded-br-sm"
                  : "bg-white border border-gray-100 text-gray-700 shadow-sm rounded-bl-sm"
              }`}>
                {msg.text}
              </div>
              <span className="text-[10px] text-gray-300 px-1">{msg.time}</span>
            </div>
          </div>
        ))}

        {/* 타이핑 인디케이터 */}
        {isTyping && (
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-full bg-linear-to-br from-pink-300 to-pink-500 flex items-center justify-center text-sm shrink-0">🤖</div>
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
              {[0, 1, 2].map((i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* 추천 질문 + 입력창 */}
      <div className="fixed bottom-[72px] left-1/2 -translate-x-1/2 w-full max-w-md bg-[#FAF8F6] border-t border-gray-100 px-4 pt-3 pb-2">
        {/* 추천 칩 */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => sendMessage(s)}
              className="shrink-0 text-xs bg-white border border-pink-200 text-pink-500 font-medium px-3 py-1.5 rounded-full hover:bg-pink-50 transition whitespace-nowrap">
              {s}
            </button>
          ))}
        </div>
        {/* 입력 */}
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") sendMessage(input); }}
            placeholder="궁금한 것을 물어보세요..."
            className="flex-1 bg-white border border-gray-200 rounded-2xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-pink-300"
          />
          <button onClick={() => sendMessage(input)} disabled={!input.trim()}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition ${input.trim() ? "bg-pink-400 text-white active:scale-95" : "bg-gray-100 text-gray-300"}`}>
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22,2 15,22 11,13 2,9" fill="currentColor" stroke="none" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   설정 뷰
═══════════════════════════════════ */
function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${on ? "bg-pink-400" : "bg-gray-200"}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${on ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

function SettingsView({ user, babyName, babyAge, onLogout }: {
  user: { name: string | null; email: string };
  babyName: string;
  babyAge: string;
  onLogout: () => void;
}) {
  const initial = user.name?.[0] ?? user.email?.[0]?.toUpperCase() ?? "?";
  const [notif, setNotif] = useState({ feeding: true, sleep: true, develop: false, daily: true });

  return (
    <div className="flex-1 overflow-y-auto pb-28">
      {/* 상단 그라데이션 헤더 */}
      <div className="bg-linear-to-b from-pink-50 to-[#FAF8F6] px-6 pt-12 pb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-5">설정</h1>
        {/* 프로필 카드 */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-linear-to-br from-pink-300 to-pink-500 flex items-center justify-center text-xl font-bold text-white shrink-0 shadow-sm">
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            {user.name && <p className="font-bold text-gray-900 truncate">{user.name}</p>}
            <p className="text-sm text-gray-400 mt-0.5 truncate">{user.email}</p>
          </div>
          <button className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="px-6 space-y-5">
        {/* 아기 정보 */}
        <section>
          <p className="text-xs font-semibold text-gray-400 mb-2 px-1">아기 정보</p>
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
            {[
              { icon: "👶", label: "이름", value: babyName },
              { icon: "📅", label: "월령", value: babyAge },
              { icon: "⚖️", label: "체중", value: "6.2 kg" },
              { icon: "📏", label: "신장", value: "61 cm" },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 px-5 py-3.5">
                <span className="text-base w-5 text-center">{icon}</span>
                <span className="text-sm text-gray-700 flex-1">{label}</span>
                <span className="text-sm font-medium text-gray-500">{value}</span>
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-gray-300" stroke="currentColor" strokeWidth="2"><polyline points="9,18 15,12 9,6" /></svg>
              </div>
            ))}
          </div>
        </section>

        {/* 알림 설정 */}
        <section>
          <p className="text-xs font-semibold text-gray-400 mb-2 px-1">알림 설정</p>
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
            {([
              { key: "feeding" as const, icon: "🍼", label: "수유 알림" },
              { key: "sleep" as const, icon: "🌙", label: "수면 알림" },
              { key: "develop" as const, icon: "📋", label: "발달 검사 알림" },
              { key: "daily" as const, icon: "📊", label: "일일 리포트 알림" },
            ]).map(({ key, icon, label }) => (
              <div key={key} className="flex items-center gap-3 px-5 py-3.5">
                <span className="text-base w-5 text-center">{icon}</span>
                <span className="text-sm text-gray-700 flex-1">{label}</span>
                <Toggle on={notif[key]} onToggle={() => setNotif((p) => ({ ...p, [key]: !p[key] }))} />
              </div>
            ))}
          </div>
        </section>

        {/* 앱 정보 */}
        <section>
          <p className="text-xs font-semibold text-gray-400 mb-2 px-1">앱 정보</p>
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
            {[
              { icon: "ℹ️", label: "버전", value: "1.0.0", arrow: false },
              { icon: "📄", label: "이용약관", value: "", arrow: true },
              { icon: "🔒", label: "개인정보 처리방침", value: "", arrow: true },
              { icon: "💬", label: "문의하기", value: "", arrow: true },
            ].map(({ icon, label, value, arrow }) => (
              <button key={label} className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition text-left">
                <span className="text-base w-5 text-center">{icon}</span>
                <span className="text-sm text-gray-700 flex-1">{label}</span>
                {value ? <span className="text-sm text-gray-400">{value}</span> : null}
                {arrow && <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-gray-300" stroke="currentColor" strokeWidth="2"><polyline points="9,18 15,12 9,6" /></svg>}
              </button>
            ))}
          </div>
        </section>

        {/* 계정 */}
        <section>
          <p className="text-xs font-semibold text-gray-400 mb-2 px-1">계정</p>
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
            <button className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition text-left">
              <span className="text-base w-5 text-center">🔑</span>
              <span className="text-sm text-gray-700 flex-1">비밀번호 변경</span>
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-gray-300" stroke="currentColor" strokeWidth="2"><polyline points="9,18 15,12 9,6" /></svg>
            </button>
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-red-50 transition text-left">
              <span className="text-base w-5 text-center">🚪</span>
              <span className="text-sm text-red-500 font-medium flex-1">로그아웃</span>
            </button>
          </div>
        </section>

        <p className="text-center text-xs text-gray-300 pb-2">베이비케어 AI · Made with ❤️</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   홈 뷰
═══════════════════════════════════ */
const todaySummary = [
  { label: "수유", value: "3회", sub: "총 420ml", color: "text-blue-500" },
  { label: "수면", value: "8.5h", sub: "낮잠 2회", color: "text-purple-500" },
  { label: "기저귀", value: "6회", sub: "소변 5, 대변 1", color: "text-teal-500" },
];

function HomeView({ babyName, babyAge }: { babyName: string; babyAge: string }) {
  return (
    <div className="flex-1 overflow-y-auto pb-28">
      {/* 헤더 */}
      <header className="px-6 pt-12 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">베이비케어 AI</h1>
            <p className="mt-0.5 text-sm text-gray-400">{babyName} · {babyAge}</p>
          </div>
          <button className="w-11 h-11 rounded-full bg-pink-100 flex items-center justify-center text-xl shadow-sm">👶</button>
        </div>
      </header>

      <div className="px-6 space-y-6">
        {/* AI 인사이트 */}
        <div className="relative rounded-2xl bg-pink-50 border border-pink-100 p-5 overflow-hidden shadow-sm">
          <div className="absolute right-4 top-4 opacity-10" aria-hidden="true">
            <svg viewBox="0 0 60 60" fill="none" className="w-20 h-20" stroke="#D4537E" strokeWidth="2">
              <polyline points="2,30 15,30 20,10 26,50 32,18 38,38 44,30 58,30" />
              <circle cx="52" cy="10" r="4" /><circle cx="56" cy="17" r="2" />
            </svg>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center shrink-0"><SparkleIcon /></div>
            <span className="font-semibold text-gray-800">AI 인사이트</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-600">
            {babyName}의 수면 패턴이 안정되고 있어요. 어제 낮잠을 20% 더 잤네요. 오늘은 오후에 깨어있는 시간이 조금 더 길어질 수 있어요!
          </p>
        </div>

        {/* 오늘의 요약 */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-800">오늘의 요약</h2>
            <button className="text-sm text-pink-500 font-medium">상세보기 &gt;</button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {todaySummary.map(({ label, value, sub, color }) => (
              <div key={label} className="rounded-2xl bg-white border border-gray-100 p-4 flex flex-col items-center text-center shadow-sm">
                <span className="text-xs text-gray-400 mb-1">{label}</span>
                <span className={`text-lg font-bold ${color}`}>{value}</span>
                <span className="text-[11px] text-gray-400 mt-0.5">{sub}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 최근 활동 */}
        <section>
          <h2 className="text-base font-bold text-gray-800 mb-4">최근 활동</h2>
          <div className="space-y-2">
            {[
              { time: "13:30", label: "수유", desc: "모유 120ml", icon: "🍼", color: "bg-blue-50" },
              { time: "11:00", label: "수면 시작", desc: "낮잠", icon: "🌙", color: "bg-purple-50" },
              { time: "09:45", label: "기저귀", desc: "소변", icon: "💧", color: "bg-teal-50" },
            ].map(({ time, label, desc, icon, color }) => (
              <div key={`${time}-${label}`} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm">
                <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center text-base`}>{icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{label}</p>
                  <p className="text-xs text-gray-400">{desc}</p>
                </div>
                <span className="text-xs text-gray-400">{time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 타임라인 */}
        <section>
          <h2 className="text-base font-bold text-gray-800 mb-5">타임라인</h2>
          <div className="relative">
            <div className="absolute left-[19px] top-5 bottom-5 w-0.5 bg-gray-200" />
            <div className="space-y-6">
              {[
                { icon: <BottleIcon white sm />, iconBg: "bg-indigo-500", title: "젖병 수유", desc: "120 ml · 유축 모유", time: "오전 10:30" },
                { icon: <MoonIcon white sm />, iconBg: "bg-indigo-600", title: "기상", desc: "1시간 45분 수면", time: "오전 09:15" },
                { icon: <MoonIcon white sm />, iconBg: "bg-indigo-200", title: "낮잠 시작", desc: "쉽게 잠듦", time: "오전 07:30" },
                { icon: <DropIcon white sm />, iconBg: "bg-teal-500", title: "기저귀 교체", desc: "소변", time: "오전 07:10" },
              ].map(({ icon, iconBg, title, desc, time }, idx) => (
                <div key={idx} className="flex items-start gap-4 relative">
                  <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center shrink-0 z-10 shadow-sm`}>{icon}</div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm font-bold text-gray-800">{title}</p>
                    <p className="text-sm text-gray-400 mt-0.5">{desc}</p>
                  </div>
                  <div className="flex items-center gap-1 pt-1 shrink-0 text-gray-400">
                    <ClockIcon /><span className="text-xs">{time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   메인 페이지
═══════════════════════════════════ */
export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading, clearAuth } = useAuth();
  const [activeTab, setActiveTab] = useState("홈");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetType, setSheetType] = useState<SheetType>("select");

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, user]);

  function openSheet(type: SheetType = "select") {
    setSheetType(type);
    setSheetOpen(true);
  }

  async function handleLogout() {
    try {
      await api("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout API failed:", e);
    } finally {
      clearAuth();
      router.push("/login");
    }
  }

  if (!isLoading && !user) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F6]">
        <div className="w-6 h-6 rounded-full border-2 border-pink-200 border-t-pink-500 animate-spin" />
      </div>
    );
  }

  const babyName = "레오";
  const babyAge = "생후 3개월";

  const navItems = [
    { label: "홈", icon: <HomeIcon /> },
    { label: "리포트", icon: <BarChartIcon /> },
    { label: "AI 상담", icon: <ChatIcon /> },
    { label: "설정", icon: <GearIcon /> },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F6] flex flex-col max-w-md mx-auto relative">
      {/* 탭 콘텐츠 */}
      {activeTab === "홈" && <HomeView babyName={babyName} babyAge={babyAge} />}
      {activeTab === "리포트" && <ReportView babyName={babyName} />}
      {activeTab === "AI 상담" && <ChatView babyName={babyName} />}
      {activeTab === "설정" && <SettingsView user={{ name: user?.name ?? null, email: user?.email ?? "" }} babyName={babyName} babyAge={babyAge} onLogout={handleLogout} />}

      {/* 하단 네비게이션 */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 shadow-lg z-30">
        <div className="flex items-center justify-around px-2 pt-3 pb-6">
          {navItems.slice(0, 2).map(({ label, icon }) => (
            <button key={label} onClick={() => setActiveTab(label)}
              className={`flex flex-col items-center gap-1 px-3 transition-colors ${activeTab === label ? "text-pink-500" : "text-gray-400"}`}>
              {icon}
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          ))}

          <button onClick={() => openSheet("select")}
            className="w-14 h-14 rounded-full bg-pink-400 flex items-center justify-center shadow-lg -mt-6 active:scale-95 transition-transform">
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>

          {navItems.slice(2).map(({ label, icon }) => (
            <button key={label} onClick={() => setActiveTab(label)}
              className={`flex flex-col items-center gap-1 px-3 transition-colors ${activeTab === label ? "text-pink-500" : "text-gray-400"}`}>
              {icon}
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* 바텀시트 */}
      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} type={sheetType} onTypeChange={setSheetType} />
    </div>
  );
}
