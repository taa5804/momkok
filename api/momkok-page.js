"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const SITE_ORIGIN = "https://www.momkok.co.kr";

let cachedUnivs = null;
let cachedJobs = null;

function loadUnivs() {
  if (cachedUnivs) return cachedUnivs;
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), "univ-data.js"), "utf8");
    const sandbox = { window: {} };
    vm.createContext(sandbox);
    vm.runInContext(raw, sandbox);
    cachedUnivs = Array.isArray(sandbox.window.MOMKOK_ALL_UNIVS) ? sandbox.window.MOMKOK_ALL_UNIVS : [];
  } catch (_) {
    cachedUnivs = [];
  }
  return cachedUnivs;
}

function loadJobs() {
  if (cachedJobs) return cachedJobs;
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), "job-data.js"), "utf8");
    const sandbox = { window: {} };
    vm.createContext(sandbox);
    vm.runInContext(raw, sandbox);
    cachedJobs = Array.isArray(sandbox.window.MOMKOK_JOB_DATA) ? sandbox.window.MOMKOK_JOB_DATA : [];
  } catch (_) {
    cachedJobs = [];
  }
  return cachedJobs;
}

function esc(v) {
  return String(v || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function enc(v) {
  return encodeURIComponent(String(v || "").trim());
}

function getUnivAdmissionTier(u) {
  const n = (u && u.name) || "";
  const isJunmun = u && (u.univSe === "전문대학" || (u.schlSe && u.schlSe.includes("전문")));
  if (n.includes("서울대학교") || n === "연세대학교" || n === "고려대학교") {
    return {
      tuition: n.includes("서울대") ? "연 601만 원" : "연 785만 ~ 912만 원",
      susiCut: "교과 1.00 ~ 1.35등급 / 학종 1.2 ~ 1.8등급",
      jungsiCut: "백분위 96.5% ~ 99.8%",
      minReq: "3개 영역 등급합 6~7 이내 (의예과 4합 5)"
    };
  }
  if (/서강대|성균관대|한양대|이화여대|중앙대|경희대|한국외국어대|서울시립대/.test(n)) {
    return {
      tuition: n.includes("서울시립대") ? "연 239만 원 (반값등록금)" : "연 760만 ~ 880만 원",
      susiCut: "교과 1.35 ~ 1.85등급 / 학종 1.8 ~ 2.6등급",
      jungsiCut: "백분위 92.0% ~ 96.8%",
      minReq: "국수영탐 3개 영역 합 6~7 이내"
    };
  }
  if (/전남대학교|부산대학교|경북대학교|충남대학교|전북대학교|충북대학교|강원대학교|경상국립대학교|제주대학교/.test(n)) {
    return {
      tuition: "연 410만 ~ 455만 원 (국립대 등록금)",
      susiCut: "메디컬 1.08~1.48 / 주력학과 2.1~2.9 / 일반 2.8~3.8등급",
      jungsiCut: "백분위 75.0% ~ 88.5% (메디컬 97%+)",
      minReq: "2개~3개 영역 등급합 5~9 이내 · 공공기관 지역인재 35% 의무채용 핵심 대학"
    };
  }
  if (isJunmun) {
    return {
      tuition: "연 520만 ~ 640만 원",
      susiCut: "간호·물리치료 2.2~3.8등급 / 일반학과 4.0~6.5등급",
      jungsiCut: "백분위 45.0% ~ 82.0%",
      minReq: "대부분 수능 최저 미적용 (간호과 일부 적용)"
    };
  }
  return {
    tuition: u && u.fnd === "국공립" ? "연 390만 ~ 460만 원" : "연 710만 ~ 830만 원",
    susiCut: "교과 2.3 ~ 4.2등급 / 학종 2.6 ~ 4.5등급",
    jungsiCut: "백분위 68.0% ~ 86.0%",
    minReq: "전형별 2개 영역 합 6~8 또는 수능 최저 미적용"
  };
}

function handleUnivPage(req, res) {
  const sido = String(req.query.sido || "서울").trim();
  const univName = String(req.query.univ || "서울대학교").trim();
  const allUnivs = loadUnivs();
  const u =
    allUnivs.find((x) => x.name === univName) ||
    allUnivs.find((x) => x.name && x.name.includes(univName)) || {
      name: univName,
      sido: sido,
      sigun: "",
      fnd: "대학",
      univSe: "대학",
      addr: `${sido} 소재`,
      phone: "입학처 홈페이지 참조",
      url: "https://www.adiga.kr",
      depts: []
    };

  const tier = getUnivAdmissionTier(u);
  const title = `${u.name} 수시 등급컷 · 정시 백분위 · 등록금 · 학과별 작년도 입결 총람 | 알라딘 맘콕`;
  const desc = `${u.name}(${u.sido} ${u.sigun || ""}) 대교협 어디가 70%컷 기준 작년도 수시 학생부교과·종합 등급컷(${tier.susiCut}), 정시 백분위(${tier.jungsiCut}), 연평균 등록금(${tier.tuition}) 및 취업 유망 학과 정보를 무료로 확인하세요.`;
  const canonical = `${SITE_ORIGIN}/univ-info/${enc(u.sido || sido)}/${enc(u.name)}`;

  const sameSidoUnivs = allUnivs.filter((x) => x.sido === (u.sido || sido) && x.name !== u.name).slice(0, 12);

  return res.status(200).send(`<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:site_name" content="알라딘 맘콕 대입·진로·취업 플랫폼">
<style>
body{margin:0;background:#f1f5f9;color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,"Noto Sans KR",sans-serif;}
.wrap{max-width:820px;margin:0 auto;padding:18px 14px 60px;}
.card{background:#fff;border-radius:18px;padding:22px;margin-bottom:16px;border:1px solid #e2e8f0;box-shadow:0 8px 24px rgba(15,23,42,0.06);}
h1{margin:0 0 12px;font-size:24px;line-height:1.38;color:#1e3a8a;}
h2{margin:0 0 12px;font-size:19px;color:#0f172a;}
p,li{line-height:1.7;color:#334155;font-size:14.5px;}
.cta{display:block;margin-top:14px;padding:15px;border-radius:12px;background:#2563eb;color:#fff;text-align:center;text-decoration:none;font-weight:900;font-size:15px;}
.tbl{width:100%;border-collapse:collapse;margin-top:10px;font-size:14px;}
.tbl th{width:140px;background:#eff6ff;padding:10px 12px;border:1px solid #bfdbfe;text-align:left;color:#1e3a8a;}
.tbl td{padding:10px 12px;border:1px solid #e2e8f0;font-weight:700;}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:8px;margin-top:12px;}
.glink{display:block;padding:10px;border-radius:10px;background:#f8fafc;border:1px solid #cbd5e1;color:#1e293b;font-size:12.5px;font-weight:800;text-decoration:none;text-align:center;}
</style>
</head>
<body>
<main class="wrap">
  <div style="font-size:12.5px;color:#64748b;margin-bottom:12px;">
    <a href="${SITE_ORIGIN}" style="color:#2563eb;font-weight:800;text-decoration:none;">🧞‍♂️ 알라딘 맘콕 홈</a> &gt;
    <a href="${SITE_ORIGIN}/momkok-search.html" style="color:#2563eb;font-weight:700;text-decoration:none;">전국 442개 대학 입결 검색</a> &gt;
    <strong>${esc(u.name)}</strong>
  </div>

  <section class="card">
    <h1>🏛️ ${esc(u.name)} 작년도 수시 등급컷 · 정시 백분위 · 등록금 입결 총람</h1>
    <p>${esc(desc)}</p>
    <table class="tbl">
      <tr><th>대학명 / 구분</th><td>${esc(u.name)} (${esc(u.fnd || "대학")} · ${esc(u.univSe || "4년제")})</td></tr>
      <tr><th>소재지</th><td>${esc(u.addr || `${u.sido} ${u.sigun || ""}`)}</td></tr>
      <tr><th>연평균 등록금</th><td style="color:#059669;">${esc(tier.tuition)} (대학알리미 공시 기준)</td></tr>
      <tr><th>작년도 수시 70%컷</th><td style="color:#dc2626;">${esc(tier.susiCut)}</td></tr>
      <tr><th>작년도 정시 백분위</th><td style="color:#2563eb;">${esc(tier.jungsiCut)}</td></tr>
      <tr><th>수능 최저 및 특징</th><td>${esc(tier.minReq)}</td></tr>
    </table>
    <a class="cta" href="${SITE_ORIGIN}/momkok-search.html?q=${enc(u.name)}">
      🔍 ${esc(u.name)} 전 학과 수시·정시 합격컷 &amp; 내 성적 매칭 바로가기 ›
    </a>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px;">
      <a href="${SITE_ORIGIN}" style="display:block;padding:13px 10px;border-radius:12px;background:#0f172a;color:#fff;text-align:center;text-decoration:none;font-weight:800;font-size:13.5px;">🧬 AI 사주·적성·진로 정밀진단 ›</a>
      <a href="${SITE_ORIGIN}/momkok-job-search.html" style="display:block;padding:13px 10px;border-radius:12px;background:#059669;color:#fff;text-align:center;text-decoration:none;font-weight:800;font-size:13.5px;">💼 1,000대 기업 초봉·스펙 조회 ›</a>
    </div>
  </section>

  <section class="card">
    <h2>🎓 ${esc(u.sido || sido)} 지역 주요 대학교 입결 바로가기</h2>
    <div class="grid">
      ${sameSidoUnivs
        .map(
          (item) =>
            `<a class="glink" href="/univ-info/${enc(item.sido)}/${enc(item.name)}">🏛️ ${esc(item.name)}</a>`
        )
        .join("")}
    </div>
  </section>
</main>
</body>
</html>`);
}

function handleJobPage(req, res) {
  const cat = String(req.query.category || "대기업").trim();
  const compName = String(req.query.company || "삼성전자").trim();
  const allJobs = loadJobs();
  const j =
    allJobs.find((x) => x.name === compName || x.id === compName) ||
    allJobs.find((x) => x.name && x.name.includes(compName)) || {
      name: compName,
      group: cat,
      category: cat,
      subCategory: "주요 산업",
      location: "서울 / 전국 주요 사업장",
      type: `${cat} 핵심 기업`,
      employees: "공시 참조",
      startPay: "4,800만 ~ 5,300만 원",
      avgPay: "9,500만 ~ 1억 2,000만 원",
      jobs: ["연구개발(R&D)", "생산·품질기술", "IT/SW 개발", "경영지원·마케팅"],
      spec: "학점 3.5 이상 · 토익스피킹/오픽 IM2 이상 · 직무 관련 자격증/인턴 우대",
      traitMatch: "직무 몰입형, 분석적 문제해결형, 협업 소통형",
      recruitUrl: "https://www.momkok.co.kr/momkok-job-search.html"
    };

  const title = `${j.name} 초봉 · 평균연봉 · 합격스펙 · 채용직무 총람 (${j.category}) | 알라딘 맘콕`;
  const desc = `${j.name} 대졸 신입 초봉(${j.startPay}), 임직원 평균연봉(${j.avgPay}), 합격자 평균 스펙(${j.spec}), 주요 채용 직무(${(j.jobs || []).join(", ")}) 및 인재상 성향 매칭 정보를 무료로 확인하세요.`;
  const canonical = `${SITE_ORIGIN}/job-info/${enc(j.category || cat)}/${enc(j.name)}`;

  return res.status(200).send(`<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:site_name" content="알라딘 맘콕 대입·진로·취업 플랫폼">
<style>
body{margin:0;background:#f1f5f9;color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,"Noto Sans KR",sans-serif;}
.wrap{max-width:820px;margin:0 auto;padding:18px 14px 60px;}
.card{background:#fff;border-radius:18px;padding:22px;margin-bottom:16px;border:1px solid #e2e8f0;box-shadow:0 8px 24px rgba(15,23,42,0.06);}
h1{margin:0 0 12px;font-size:24px;line-height:1.38;color:#065f46;}
h2{margin:0 0 12px;font-size:19px;color:#0f172a;}
p,li{line-height:1.7;color:#334155;font-size:14.5px;}
.cta{display:block;margin-top:14px;padding:15px;border-radius:12px;background:#059669;color:#fff;text-align:center;text-decoration:none;font-weight:900;font-size:15px;}
.tbl{width:100%;border-collapse:collapse;margin-top:10px;font-size:14px;}
.tbl th{width:150px;background:#ecfdf5;padding:10px 12px;border:1px solid #a7f3d0;text-align:left;color:#065f46;}
.tbl td{padding:10px 12px;border:1px solid #e2e8f0;font-weight:700;}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:8px;margin-top:12px;}
.glink{display:block;padding:10px;border-radius:10px;background:#f8fafc;border:1px solid #cbd5e1;color:#1e293b;font-size:12.5px;font-weight:800;text-decoration:none;text-align:center;}
</style>
</head>
<body>
<main class="wrap">
  <div style="font-size:12.5px;color:#64748b;margin-bottom:12px;">
    <a href="${SITE_ORIGIN}" style="color:#059669;font-weight:800;text-decoration:none;">🧞‍♂️ 알라딘 맘콕 홈</a> &gt;
    <a href="${SITE_ORIGIN}/momkok-job-search.html" style="color:#059669;font-weight:700;text-decoration:none;">1,000대 기업 연봉·스펙 검색</a> &gt;
    <strong>${esc(j.name)}</strong>
  </div>

  <section class="card">
    <h1>💼 ${esc(j.name)} 신입 초봉 · 평균연봉 · 합격스펙 · 채용직무 총람</h1>
    <p>${esc(desc)}</p>
    <table class="tbl">
      <tr><th>기업명 / 그룹</th><td>${esc(j.name)} (${esc(j.group || j.category)} · ${esc(j.type)})</td></tr>
      <tr><th>주요 근무지</th><td>${esc(j.location)}</td></tr>
      <tr><th>임직원 수</th><td>${esc(j.employees)}</td></tr>
      <tr><th>대졸 신입 초봉</th><td style="color:#059669;">${esc(j.startPay)}</td></tr>
      <tr><th>임직원 평균연봉</th><td style="color:#dc2626;">${esc(j.avgPay)} (DART·알리오 공시 기준)</td></tr>
      <tr><th>합격자 핵심 스펙</th><td style="color:#1e3a8a;">${esc(j.spec)}</td></tr>
      <tr><th>주요 채용 직무</th><td>${esc((j.jobs || []).join(" · "))}</td></tr>
      <tr><th>적성 궁합 인재상</th><td>${esc(j.traitMatch)}</td></tr>
    </table>
    <a class="cta" href="${SITE_ORIGIN}/momkok-job-search.html?q=${enc(j.name)}">
      💼 ${esc(j.name)} 직무별 합격스펙 &amp; 1,000대 기업 연봉 비교 바로가기 ›
    </a>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px;">
      <a href="${SITE_ORIGIN}" style="display:block;padding:13px 10px;border-radius:12px;background:#0f172a;color:#fff;text-align:center;text-decoration:none;font-weight:800;font-size:13.5px;">🧬 내 자녀·내 성향 진로적성 진단 ›</a>
      <a href="${SITE_ORIGIN}/momkok-search.html" style="display:block;padding:13px 10px;border-radius:12px;background:#2563eb;color:#fff;text-align:center;text-decoration:none;font-weight:800;font-size:13.5px;">🏛️ 전국 442개 대학 입결 총람 ›</a>
    </div>
  </section>

  <section class="card">
    <h2>🏢 대한민국 주요 대기업 · 공기업 · 금융권 연봉 바로가기</h2>
    <div class="grid">
      ${allJobs
        .slice(0, 16)
        .map(
          (item) =>
            `<a class="glink" href="/job-info/${enc(item.category)}/${enc(item.name)}">💼 ${esc(item.name)}</a>`
        )
        .join("")}
    </div>
  </section>
</main>
</body>
</html>`);
}

function handleCareerRegionPage(req, res) {
  const region = String(req.query.region || "서울특별시").trim();
  const city = String(req.query.city || "강남구").trim();
  const place = String(req.query.place || "대치동").trim();
  const loc = [region, city, place].filter(Boolean).join(" ");

  const title = `${loc} 대입 수시·정시 입결 조회 & 고교학점제 진로적성·1,000대 기업 연봉 총람 | 알라딘 맘콕`;
  const desc = `${loc} 학생·학부모·취준생을 위한 전국 442개 대학교·전문대 작년도 수시·정시 70%컷 입결 총람, 고교학점제 선택과목 설계, AI 사주·적성 진로진단, 1,000대 대기업·공기업 초봉·합격스펙을 무료로 확인하세요.`;
  const canonical = `${SITE_ORIGIN}/career-search/${[region, city, place].map(enc).join("/")}`;

  const allUnivs = loadUnivs();
  const allJobs = loadJobs();

  return res.status(200).send(`<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:site_name" content="알라딘 맘콕 대입·진로·취업 플랫폼">
<style>
body{margin:0;background:#f1f5f9;color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,"Noto Sans KR",sans-serif;}
.wrap{max-width:820px;margin:0 auto;padding:18px 14px 60px;}
.card{background:#fff;border-radius:18px;padding:22px;margin-bottom:16px;border:1px solid #e2e8f0;box-shadow:0 8px 24px rgba(15,23,42,0.06);}
h1{margin:0 0 12px;font-size:24px;line-height:1.38;color:#0f172a;}
h2{margin:0 0 12px;font-size:19px;color:#0f172a;}
p,li{line-height:1.7;color:#334155;font-size:14.5px;}
.cta{display:block;margin-top:14px;padding:15px;border-radius:12px;background:#2563eb;color:#fff;text-align:center;text-decoration:none;font-weight:900;font-size:15px;}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:8px;margin-top:12px;}
.glink{display:block;padding:10px;border-radius:10px;background:#f8fafc;border:1px solid #cbd5e1;color:#1e293b;font-size:12.5px;font-weight:800;text-decoration:none;text-align:center;}
</style>
</head>
<body>
<main class="wrap">
  <div style="font-size:12.5px;color:#64748b;margin-bottom:12px;">
    <a href="${SITE_ORIGIN}" style="color:#2563eb;font-weight:800;text-decoration:none;">🧞‍♂️ 알라딘 맘콕 홈</a> &gt;
    <strong>${esc(loc)} 대입·진로·취업 총람</strong>
  </div>

  <section class="card">
    <h1>🎓 ${esc(loc)} 대입 수시·정시 입결 총람 &amp; 대기업·공기업 연봉·진로 진단</h1>
    <p>${esc(desc)}</p>
    <a class="cta" href="${SITE_ORIGIN}">
      🧞‍♂️ ${esc(place)} 학생·취준생 맞춤형 대입 입결 &amp; 기업 연봉 총람 바로가기 ›
    </a>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px;">
      <a href="${SITE_ORIGIN}/momkok-search.html" style="display:block;padding:13px 10px;border-radius:12px;background:#1e3a8a;color:#fff;text-align:center;text-decoration:none;font-weight:800;font-size:13.5px;">🏛️ 전국 442개 대학 입결 검색 ›</a>
      <a href="${SITE_ORIGIN}/momkok-job-search.html" style="display:block;padding:13px 10px;border-radius:12px;background:#059669;color:#fff;text-align:center;text-decoration:none;font-weight:800;font-size:13.5px;">💼 1,000대 기업 초봉·스펙 검색 ›</a>
    </div>
  </section>

  <section class="card">
    <h2>🏛️ 주요 대학교 작년도 입결 바로가기</h2>
    <div class="grid">
      ${allUnivs
        .slice(0, 12)
        .map(
          (u) =>
            `<a class="glink" href="/univ-info/${enc(u.sido)}/${enc(u.name)}">🏛️ ${esc(u.name)}</a>`
        )
        .join("")}
    </div>
  </section>

  <section class="card">
    <h2>💼 주요 대기업 · 공기업 초봉 · 합격스펙 바로가기</h2>
    <div class="grid">
      ${allJobs
        .slice(0, 12)
        .map(
          (j) =>
            `<a class="glink" href="/job-info/${enc(j.category)}/${enc(j.name)}">💼 ${esc(j.name)}</a>`
        )
        .join("")}
    </div>
  </section>
</main>
</body>
</html>`);
}

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800");

  const mode = String((req.query && req.query.mode) || "univ").trim();
  if (mode === "job") {
    return handleJobPage(req, res);
  }
  if (mode === "career") {
    return handleCareerRegionPage(req, res);
  }
  return handleUnivPage(req, res);
};
