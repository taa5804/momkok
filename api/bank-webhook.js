"use strict";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://dcysjuxyjqtvkihdsjvv.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || "sb_publishable_RZBX7u1v8MLBCfEJT0-eRg_jPcIulG2";
const LEDGER_STORE_ID = "momkok_bank_ledger";

// 불일치(수동확인 필요) 시 알림 수신 번호 (대표님 지정 번호)
const MISMATCH_ALERT_PHONE = "01051105770";

// 문자 발송 함수 (ClawOps 1차 + wooriapt NCP SENS 백업)
async function sendSmsMessage(toPhone, bodyText, subjectText) {
  const cleanPhone = String(toPhone || "").replace(/\D/g, "");
  if (!cleanPhone || cleanPhone.length < 10) {
    return { ok: false, error: "Invalid phone number" };
  }

  const CLAWOPS_ACCOUNT_ID = process.env.CLAWOPS_ACCOUNT_ID || "ACUfJGlcU6IkNZxuxn";
  const CLAWOPS_API_KEY = process.env.CLAWOPS_API_KEY || "sk_vuT1vZJtqWMHdjROjqAi1x7XpGGpjSY2";
  const CLAWOPS_FROM_NUMBER = "07052767712";

  let clawOk = false;
  let clawResult = null;

  try {
    const clawRes = await fetch(`https://api.claw-ops.com/v1/accounts/${CLAWOPS_ACCOUNT_ID}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CLAWOPS_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        To: cleanPhone,
        From: CLAWOPS_FROM_NUMBER,
        Body: bodyText
      })
    });
    clawResult = await clawRes.json().catch(() => ({}));
    if (clawRes.ok && clawResult && clawResult.messageId) {
      clawOk = true;
    }
  } catch (e) {
    clawResult = { error: e.message };
  }

  // 백업 발송 (NCP SENS 게이트웨이)
  let ncpOk = false;
  try {
    const ncpRes = await fetch("https://www.wooriapt.app/api/send-sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: cleanPhone,
        type: "LMS",
        subject: subjectText || "[알라딘 맘콕 알림]",
        content: bodyText
      })
    });
    const ncpData = await ncpRes.json().catch(() => ({}));
    if (ncpRes.ok && (ncpData.ok || ncpData.success)) {
      ncpOk = true;
    }
  } catch (e) {}

  return { ok: clawOk || ncpOk, clawOk, ncpOk, clawResult };
}

// 학부모 리포트 열람 승인 문자 발송
async function sendParentApprovalSms(order) {
  const is35 = order.tier === "master" || Number(order.amount) >= 90000 || String(order.code).startsWith("99");
  const viewParam = is35 ? "35" : "20";
  const reportName = is35 ? "35장 VIP 마스터 바이블" : "20장 기본형 정밀 바인더";
  const directUrl = `https://www.momkok.co.kr/report.html?view=${viewParam}&code=${order.code}`;

  const msg = [
    `[알라딘 맘콕] 입금 확인 및 ${reportName} 자동 승인 안내`,
    ``,
    `${order.name} 학부모님, 입금(${Number(order.amount).toLocaleString()}원)이 정상 확인되어 즉시 승인되었습니다.`,
    ``,
    `■ 전용 알림번호: ${order.code}`,
    `■ 열람 가능 상품: ${reportName} (자녀 2명·총 2회 열람 가능)`,
    ``,
    `▼ 아래 직통 링크를 터치하시면 메인화면 없이 자녀의 리포트 본문이 즉시 열리며 PDF 저장이 가능합니다:`,
    directUrl
  ].join("\n");

  return await sendSmsMessage(order.phone, msg, `[알라딘 맘콕] ${reportName} 열람 안내`);
}

// 불일치 발생 시 010-5110-5770으로 알림 문자 발송
async function sendMismatchAlertSms({ reason, parsedDepositor, parsedAmount, rawSms, pendingOrders, unmatchedId }) {
  const lines = [
    `[알라딘 맘콕 입금 불일치 알림]`,
    `사유: ${reason}`,
    ``,
    `■ 수신된 입금문자 분석`,
    `• 입금자명: ${parsedDepositor || "미상"}`,
    `• 입금금액: ${parsedAmount ? Number(parsedAmount).toLocaleString() + "원" : "미상"}`,
    `• 문자원문: ${String(rawSms || "").replace(/\s+/g, " ").slice(0, 120)}`
  ];

  if (pendingOrders && pendingOrders.length > 0) {
    lines.push(``);
    lines.push(`■ 현재 입금대기 신청건 (${pendingOrders.length}건):`);
    pendingOrders.slice(0, 3).forEach((o, idx) => {
      lines.push(`${idx + 1}) ${o.name} (${o.phone}) / ${Number(o.amount).toLocaleString()}원 / 코드:${o.code}`);
      lines.push(`▶ 원클릭 승인: https://www.momkok.co.kr/api/bank-webhook?action=quick_approve&id=${encodeURIComponent(o.id)}`);
    });
  } else {
    lines.push(``);
    lines.push(`■ 현재 대기 중인 입금신청 건이 없습니다.`);
    lines.push(`(학부모님이 입금 신청서를 나중에 작성하면 자동 매칭됩니다)`);
  }

  return await sendSmsMessage(MISMATCH_ALERT_PHONE, lines.join("\n"), "[맘콕] 입금 불일치 확인요청");
}

// Supabase 장부 읽기
async function loadLedger() {
  const url = `${SUPABASE_URL}/rest/v1/store_info?store_id=eq.${LEDGER_STORE_ID}&select=id,hours&limit=1`;
  const res = await fetch(url, {
    headers: { apikey: SUPABASE_KEY }
  });
  const rows = await res.json().catch(() => []);
  if (Array.isArray(rows) && rows.length > 0 && rows[0].hours) {
    try {
      const parsed = typeof rows[0].hours === "string" ? JSON.parse(rows[0].hours) : rows[0].hours;
      return {
        rowExists: true,
        orders: Array.isArray(parsed.orders) ? parsed.orders : [],
        unmatched: Array.isArray(parsed.unmatched) ? parsed.unmatched : [],
        logs: Array.isArray(parsed.logs) ? parsed.logs : []
      };
    } catch (e) {}
  }
  return { rowExists: Array.isArray(rows) && rows.length > 0, orders: [], unmatched: [], logs: [] };
}

// Supabase 장부 저장
async function saveLedger(ledger) {
  const payload = {
    orders: (ledger.orders || []).slice(0, 300),
    unmatched: (ledger.unmatched || []).slice(0, 100),
    logs: (ledger.logs || []).slice(0, 150)
  };
  const headers = {
    apikey: SUPABASE_KEY,
    "Content-Type": "application/json",
    Prefer: "return=minimal"
  };
  const body = JSON.stringify({
    store_id: LEDGER_STORE_ID,
    store_name: "알라딘맘콕_자동입금장부",
    hours: JSON.stringify(payload)
  });

  if (ledger.rowExists) {
    await fetch(`${SUPABASE_URL}/rest/v1/store_info?store_id=eq.${LEDGER_STORE_ID}`, {
      method: "PATCH",
      headers,
      body
    });
  } else {
    await fetch(`${SUPABASE_URL}/rest/v1/store_info`, {
      method: "POST",
      headers,
      body
    });
  }
}

// KB국민은행 및 국내 은행 입금 문자 파서
function parseBankSms(rawText) {
  const text = String(rawText || "").trim();
  if (!text) return { isDeposit: false, amount: 0, depositor: "", raw: "" };

  // 출금/취소 문자는 무시 (단, '입금' 키워드가 있으면 입금으로 처리)
  const hasDepositWord = /입금|무통장|입금액|받으실분/.test(text);
  const isWithdrawOnly = /출금|체크승인|카드승인|자동이체출금/.test(text) && !hasDepositWord;

  // 1) 잔액 부분 먼저 제거하여 잔액 숫자와 입금액 숫자 혼동 방지
  const textWithoutBalance = text.replace(/잔액[\s:：]*[0-9,]+원?/g, " ");

  // 2) 입금액 추출
  let amount = 0;
  // 패턴 A: '입금 49,000' 또는 '입금: 49,000원' 또는 '입금액 49,000'
  const mAfter = textWithoutBalance.match(/입금(?:액|금액)?[\s:：]*([0-9]{1,3}(?:,[0-9]{3})+|[0-9]{4,8})\s*원?/);
  // 패턴 B: '49,000원 입금' 또는 '49,000 입금'
  const mBefore = textWithoutBalance.match(/([0-9]{1,3}(?:,[0-9]{3})+|[0-9]{4,8})\s*원?\s*입금/);

  if (mAfter) {
    amount = parseInt(mAfter[1].replace(/,/g, ""), 10);
  } else if (mBefore) {
    amount = parseInt(mBefore[1].replace(/,/g, ""), 10);
  } else {
    // 패턴 C: 일반 금액 숫자 (4,000원 이상) 추출
    const allNums = [...textWithoutBalance.matchAll(/\b([0-9]{1,3}(?:,[0-9]{3})+|[0-9]{4,8})\s*원?\b/g)]
      .map(m => parseInt(m[1].replace(/,/g, ""), 10))
      .filter(n => n >= 1000 && n <= 10000000 && n !== 626402 && n !== 239069);
    if (allNums.length > 0) {
      amount = allNums[0];
    }
  }

  // 3) 입금자명 추출
  // 불필요 토큰 제거: [Web발신], [KB], 국민은행, 날짜(11/18), 시간(09:40), 계좌번호(626402**069), 금액, '입금', '잔액' 등
  let cleaned = textWithoutBalance
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/[0-9]{1,2}\/[0-9]{1,2}/g, " ")
    .replace(/[0-9]{1,2}:[0-9]{2}(?::[0-9]{2})?/g, " ")
    .replace(/[0-9*-]{6,}/g, " ")
    .replace(/[0-9,]+원?/g, " ")
    .replace(/KB국민은행|KB국민|국민은행|KB|Web발신|입금액|입금|무통장|보내신분|적요|잔액|송해석님?|송해석/gi, " ");

  const tokens = cleaned
    .split(/[\s\r\n/|,.:：()]+/)
    .map(t => t.trim())
    .filter(t => t.length >= 2 && t.length <= 10 && /[가-힣a-zA-Z]/.test(t));

  const depositor = tokens.length > 0 ? tokens[0] : "";

  return {
    isDeposit: !isWithdrawOnly && (hasDepositWord || amount > 0),
    amount,
    depositor,
    tokens,
    raw: text
  };
}

function normalizeName(s) {
  return String(s || "").replace(/\s+/g, "").toLowerCase();
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    let body = {};
    if (req.body) {
      if (typeof req.body === "string") {
        try {
          body = JSON.parse(req.body);
        } catch (e) {
          // form-urlencoded or plain text
          if (req.body.includes("=")) {
            const params = new URLSearchParams(req.body);
            for (const [k, v] of params.entries()) body[k] = v;
          } else {
            body = { text: req.body };
          }
        }
      } else if (typeof req.body === "object") {
        body = req.body;
      }
    }

    const query = req.query || {};
    const action = String(body.action || query.action || "").trim();

    // ---------------------------------------------------------
    // 1. 학부모 입금 신청 등록 (action = 'register')
    // ---------------------------------------------------------
    if (action === "register") {
      const name = String(body.name || query.name || "").trim();
      const phone = String(body.phone || query.phone || "").replace(/\D/g, "");
      const tier = String(body.tier || query.tier || "basic").trim();
      const isMaster = tier === "master" || String(body.amount || "").includes("99");
      const amount = Number(String(body.amount || (isMaster ? 99000 : 49000)).replace(/\D/g, "")) || (isMaster ? 99000 : 49000);
      const code = String(body.code || (isMaster ? "99" + Math.floor(1000 + Math.random() * 9000) : "" + Math.floor(1000 + Math.random() * 9000)));
      const school = String(body.school || "").trim();
      const grade = String(body.grade || "").trim();

      if (!name || !phone) {
        return res.status(400).json({ ok: false, message: "입금자 성함과 휴대폰 번호를 입력해 주세요." });
      }

      const ledger = await loadLedger();
      const nowIso = new Date().toISOString();
      const orderId = "MK-" + Date.now().toString().slice(-6) + Math.floor(10 + Math.random() * 89);

      const newOrder = {
        id: orderId,
        name,
        phone,
        tier: isMaster ? "master" : "basic",
        tierLabel: isMaster ? "심화 마스터팩 (35장)" : "기본형 정밀 (20장)",
        amount,
        code,
        school: school || "학교 미지정",
        grade: grade || "학년 미지정",
        status: "pending",
        createdAt: nowIso
      };

      // 혹시 최근 30분 이내에 먼저 입금된 미매칭 건(unmatched) 중 이름+금액이 일치하는 건이 있는지 확인
      const normName = normalizeName(name);
      const preMatchedIdx = ledger.unmatched.findIndex(u => {
        if (u.used) return false;
        const sameAmt = Number(u.amount) === Number(amount);
        const sameName =
          normalizeName(u.depositor) === normName ||
          normalizeName(u.raw).includes(normName);
        return sameAmt && sameName;
      });

      if (preMatchedIdx >= 0) {
        ledger.unmatched[preMatchedIdx].used = true;
        newOrder.status = "approved";
        newOrder.approvedAt = nowIso;
        newOrder.matchedSms = ledger.unmatched[preMatchedIdx].raw;
        ledger.orders.unshift(newOrder);
        ledger.logs.unshift({
          time: nowIso,
          type: "AUTO_APPROVED_PREDEPOSIT",
          orderId: newOrder.id,
          name: newOrder.name,
          amount: newOrder.amount
        });
        await saveLedger(ledger);
        await sendParentApprovalSms(newOrder);

        return res.status(200).json({
          ok: true,
          status: "approved",
          order: newOrder,
          message: "이미 입금된 내역이 확인되어 즉시 자동 승인되었습니다."
        });
      }

      ledger.orders.unshift(newOrder);
      await saveLedger(ledger);

      return res.status(200).json({
        ok: true,
        status: "pending",
        order: newOrder,
        message: "입금 대기 등록 완료. 계좌 입금 즉시 자동 승인됩니다."
      });
    }

    // ---------------------------------------------------------
    // 2. 실시간 승인 상태 조회 (action = 'status')
    // ---------------------------------------------------------
    if (action === "status") {
      const id = String(query.id || body.id || "").trim();
      const code = String(query.code || body.code || "").trim();
      const ledger = await loadLedger();

      const found = ledger.orders.find(o => (id && o.id === id) || (code && String(o.code) === code));
      if (!found) {
        return res.status(200).json({ ok: false, status: "not_found" });
      }
      return res.status(200).json({
        ok: true,
        status: found.status,
        order: found
      });
    }

    // ---------------------------------------------------------
    // 3. 관리자용 전체 목록 조회 (action = 'list')
    // ---------------------------------------------------------
    if (action === "list") {
      const ledger = await loadLedger();
      return res.status(200).json({
        ok: true,
        orders: ledger.orders.slice(0, 100),
        unmatched: ledger.unmatched.slice(0, 50),
        logs: ledger.logs.slice(0, 50)
      });
    }

    // ---------------------------------------------------------
    // 4. 원클릭 수동 승인 (action = 'quick_approve')
    // ---------------------------------------------------------
    if (action === "quick_approve") {
      const id = String(query.id || body.id || "").trim();
      const ledger = await loadLedger();
      const target = ledger.orders.find(o => o.id === id);

      if (!target) {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        return res.status(404).send(`<!DOCTYPE html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>맘콕 승인 확인</title></head><body style="font-family:sans-serif;text-align:center;padding:40px 20px;"><h2>⚠️ 해당 신청 건(${id})을 찾을 수 없습니다.</h2></body></html>`);
      }

      target.status = "approved";
      target.approvedAt = new Date().toISOString();
      await saveLedger(ledger);
      await sendParentApprovalSms(target);

      if (req.method === "GET") {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        return res.status(200).send(`<!DOCTYPE html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>알라딘 맘콕 수동승인 완료</title></head><body style="font-family:sans-serif;background:#f8fafc;padding:36px 18px;text-align:center;"><div style="max-width:420px;margin:0 auto;background:#fff;border-radius:16px;padding:28px 22px;box-shadow:0 10px 25px rgba(0,0,0,0.08);border:2px solid #22c55e;"><div style="font-size:46px;margin-bottom:10px;">✅</div><h2 style="color:#15803d;margin:0 0 10px;">승인 및 문자발송 완료!</h2><p style="color:#334155;font-size:14px;line-height:1.6;"><strong>${target.name}</strong> 학부모님(${target.phone})께<br><strong>${target.tierLabel}</strong> 알림번호(<strong>${target.code}</strong>)와<br>리포트 직통 링크 문자가 발송되었습니다.</p></div></body></html>`);
      }

      return res.status(200).json({ ok: true, status: "approved", order: target });
    }

    // ---------------------------------------------------------
    // 5. 안드로이드 문자 자동전달 앱 웹훅 수신 (기본 동작)
    // ---------------------------------------------------------
    const rawSms = String(
      body.text ||
      body.message ||
      body.sms ||
      body.content ||
      body.msg ||
      body.body ||
      query.text ||
      query.message ||
      query.sms ||
      query.msg ||
      ""
    ).trim();

    const explicitDepositor = String(body.depositor || body.name || query.depositor || query.name || "").trim();
    const explicitAmount = parseInt(String(body.amount || query.amount || "0").replace(/\D/g, ""), 10) || 0;

    if (!rawSms && !explicitDepositor && !explicitAmount) {
      return res.status(200).json({
        ok: true,
        info: "알라딘 맘콕 KB국민은행 자동입금확인 웹훅 서버가 정상 가동 중입니다.",
        webhookUrl: "https://www.momkok.co.kr/api/bank-webhook",
        mismatchAlertPhone: "010-5110-5770"
      });
    }

    const parsed = parseBankSms(rawSms);
    const parsedDepositor = explicitDepositor || parsed.depositor;
    const parsedAmount = explicitAmount || parsed.amount;

    const ledger = await loadLedger();
    const nowIso = new Date().toISOString();
    const pendingOrders = ledger.orders.filter(o => o.status === "pending");

    const normSms = normalizeName(rawSms);
    const normDepositor = normalizeName(parsedDepositor);

    // 매칭 후보 찾기:
    // 1순위: 입금자명이 일치(또는 문자 원문에 신청자 성함이 포함)하고 금액도 정확히 일치하는 대기 건
    const exactMatches = pendingOrders.filter(o => {
      const oName = normalizeName(o.name);
      if (!oName) return false;
      const nameMatched =
        (normDepositor && (normDepositor === oName || normDepositor.includes(oName) || oName.includes(normDepositor))) ||
        (normSms && normSms.includes(oName));
      const amountMatched = Number(o.amount) === Number(parsedAmount);
      return nameMatched && amountMatched;
    });

    if (exactMatches.length === 1) {
      const matchedOrder = exactMatches[0];
      matchedOrder.status = "approved";
      matchedOrder.approvedAt = nowIso;
      matchedOrder.matchedSms = rawSms || `${parsedDepositor} ${parsedAmount}`;

      ledger.logs.unshift({
        time: nowIso,
        type: "AUTO_APPROVED",
        orderId: matchedOrder.id,
        name: matchedOrder.name,
        phone: matchedOrder.phone,
        amount: matchedOrder.amount,
        code: matchedOrder.code,
        rawSms
      });

      await saveLedger(ledger);
      const smsRes = await sendParentApprovalSms(matchedOrder);

      return res.status(200).json({
        ok: true,
        matched: true,
        status: "approved",
        order: matchedOrder,
        smsSent: smsRes.ok
      });
    }

    // ---------------------------------------------------------
    // 불일치 발생! (서로 맞지 않을 때 -> 010-5110-5770 문자 발송)
    // ---------------------------------------------------------
    let mismatchReason = "대기중인 신청 내역과 입금자명/금액 불일치";

    const nameOnlyMatches = pendingOrders.filter(o => {
      const oName = normalizeName(o.name);
      return oName && ((normDepositor && normDepositor === oName) || (normSms && normSms.includes(oName)));
    });
    const amountOnlyMatches = pendingOrders.filter(o => Number(o.amount) === Number(parsedAmount));

    if (exactMatches.length > 1) {
      mismatchReason = `동명이인·동일금액 중복 신청(${exactMatches.length}건)으로 수동 확인 필요`;
    } else if (nameOnlyMatches.length > 0) {
      const expectedAmt = Number(nameOnlyMatches[0].amount).toLocaleString();
      mismatchReason = `입금자명(${nameOnlyMatches[0].name})은 일치하나 입금금액 불일치 (신청:${expectedAmt}원 vs 입금:${Number(parsedAmount).toLocaleString()}원)`;
    } else if (amountOnlyMatches.length > 0) {
      const waitingNames = amountOnlyMatches.map(o => o.name).join(", ");
      mismatchReason = `입금금액(${Number(parsedAmount).toLocaleString()}원)은 일치하나 입금자명 불일치 (입금:${parsedDepositor || "미상"} vs 신청대기:${waitingNames})`;
    } else if (pendingOrders.length === 0) {
      mismatchReason = `입금(${parsedDepositor || "미상"} / ${Number(parsedAmount).toLocaleString()}원)이 감지되었으나 현재 대기중인 신청건 없음`;
    }

    const unmatchedItem = {
      id: "UNM-" + Date.now().toString().slice(-6),
      depositor: parsedDepositor,
      amount: parsedAmount,
      raw: rawSms,
      reason: mismatchReason,
      createdAt: nowIso,
      used: false
    };

    ledger.unmatched.unshift(unmatchedItem);
    ledger.logs.unshift({
      time: nowIso,
      type: "MISMATCH_ALERT_01051105770",
      reason: mismatchReason,
      depositor: parsedDepositor,
      amount: parsedAmount,
      rawSms
    });

    await saveLedger(ledger);

    // 010-5110-5770으로 불일치 알림 문자 즉시 발송
    const alertRes = await sendMismatchAlertSms({
      reason: mismatchReason,
      parsedDepositor,
      parsedAmount,
      rawSms,
      pendingOrders,
      unmatchedId: unmatchedItem.id
    });

    return res.status(200).json({
      ok: true,
      matched: false,
      reason: mismatchReason,
      alertSentTo: "010-5110-5770",
      alertOk: alertRes.ok,
      parsed: { depositor: parsedDepositor, amount: parsedAmount }
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "웹훅 처리 중 오류: " + err.message
    });
  }
};
