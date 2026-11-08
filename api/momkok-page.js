"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const SITE_ORIGIN = "https://www.momkok.co.kr";

let cachedUnivs = null;
let cachedJobs = null;

const CORE_MAJORS = [
  { name: "의예과", cat: "의약학", subjects: "미적분, 기하, 화학Ⅱ, 생명과학Ⅱ", seteuk: "유전자 가위(CRISPR) 기술의 임상 적용과 생명윤리, 감염병 수리모델링 분석", career: "대학병원 전문의, 의과학 연구원, 바이오 신약개발 총괄" },
  { name: "치의예과", cat: "의약학", subjects: "미적분, 화학Ⅱ, 생명과학Ⅱ, 물리학Ⅰ", seteuk: "생체적합성 치과 신소재(지르코니아·티타늄)의 표면공학적 특성 탐구", career: "치과의사, 구강악안면외과 전문의, 의료기기 R&D" },
  { name: "약학과", cat: "의약학", subjects: "미적분, 화학Ⅰ·Ⅱ, 생명과학Ⅰ·Ⅱ", seteuk: "표적항암제의 약물전달시스템(DDS) 메커니즘과 약동학적 반감기 시뮬레이션", career: "약사, 글로벌 제약사 신약개발 연구원, 식약처 약무직" },
  { name: "한의예과", cat: "의약학", subjects: "미적분, 화학Ⅱ, 생명과학Ⅱ, 한문Ⅰ", seteuk: "천연물 유래 유효성분의 항염증 기전과 현대 약리학적 데이터 검증", career: "한의사, 한방병원 전문의, 천연물 신약 연구원" },
  { name: "수의예과", cat: "의약학", subjects: "미적분, 생명과학Ⅰ·Ⅱ, 화학Ⅰ·Ⅱ", seteuk: "인수공통감염병(Zoonosis) 변이 바이러스 역학 분석 및 백신 플랫폼 연구", career: "수의사, 농림축산검역본부 연구관, 바이오 제약 연구원" },
  { name: "간호학과", cat: "보건의료", subjects: "생명과학Ⅰ·Ⅱ, 화학Ⅰ, 확률과 통계, 보건", seteuk: "고령화 사회 만성질환자의 중환자 간호 프로토콜 및 디지털 헬스케어 모니터링", career: "상급종합병원 간호사, 보건교사, 제약사 임상연구(CRA)" },
  { name: "물리치료학과", cat: "보건의료", subjects: "생명과학Ⅰ·Ⅱ, 물리학Ⅰ, 확률과 통계", seteuk: "근골격계 재활을 위한 생체역학(Biomechanics) 관절 모멘트 분석 및 로봇재활", career: "대학병원 물리치료사, 스포츠구단 재활트레이너, 헬스케어 기업" },
  { name: "치위생학과", cat: "보건의료", subjects: "생명과학Ⅰ, 화학Ⅰ, 확률과 통계", seteuk: "구강 미생물 바이오필름 억제 기전과 예방치과학적 공중구강보건 정책 분석", career: "치과위생사, 대학병원 구강보건센터, 의료기기 임상전문가" },
  { name: "방사선학과", cat: "보건의료", subjects: "물리학Ⅰ·Ⅱ, 생명과학Ⅰ, 미적분", seteuk: "MRI·CT 의료영상 재구성 알고리즘과 인공지능(AI) 병변 자동 판독 기술 탐구", career: "대학병원 방사선사, 원자력안전기술원, 글로벌 의료장비 기업" },
  { name: "임상병리학과", cat: "보건의료", subjects: "생명과학Ⅰ·Ⅱ, 화학Ⅰ·Ⅱ", seteuk: "PCR 분자진단 기술의 증폭 효율 최적화 및 차세대 염기서열 분석(NGS) 연구", career: "대학병원 임상병리사, 진단키트 바이오기업 연구원, 국립과학수사연구원" },
  { name: "컴퓨터공학과", cat: "첨단IT", subjects: "미적분, 기하, 인공지능 수학, 물리학Ⅰ, 정보", seteuk: "대규모 언어모델(LLM) 트랜스포머 어텐션 연산 복잡도 최적화 및 알고리즘 설계", career: "삼성전자·네이버·카카오 SW엔지니어, AI 아키텍트, 클라우드 엔지니어" },
  { name: "소프트웨어학과", cat: "첨단IT", subjects: "미적분, 인공지능 수학, 확률과 통계, 정보", seteuk: "분산 클라우드 환경에서의 마이크로서비스(MSA) 트래픽 부하분산 알고리즘 구현", career: "빅테크 백엔드·프론트엔드 개발자, 보안 아키텍트, 핀테크 연구원" },
  { name: "인공지능학과", cat: "첨단IT", subjects: "미적분, 기하, 인공지능 수학, 확률과 통계", seteuk: "컴퓨터 비전(CNN) 기반 자율주행 객체 인식 모델의 경량화 및 엣지 컴퓨팅 적용", career: "AI 딥러닝 연구원, 자율주행 엔지니어, 로봇 비전 개발자" },
  { name: "데이터사이언스학과", cat: "첨단IT", subjects: "미적분, 확률과 통계, 인공지능 수학", seteuk: "베이지안 추론과 시계열 빅데이터 분석을 활용한 금융 리스크 예측 모델링", career: "빅데이터 사이언티스트, 금융권 퀀트 애널리스트, AI 전략기획" },
  { name: "정보보안학과", cat: "첨단IT", subjects: "미적분, 확률과 통계, 인공지능 수학, 정보", seteuk: "양자컴퓨팅 시대의 RSA 암호 체계 취약점 분석과 격자 기반 양자내성암호(PQC) 탐구", career: "화이트해커, 금융보안원·국정원 사이버보안관, 대기업 정보보호팀" },
  { name: "반도체공학과", cat: "첨단공학", subjects: "미적분, 기하, 물리학Ⅰ·Ⅱ, 화학Ⅰ·Ⅱ", seteuk: "3나노 이하 GAA(Gate-All-Around) 트랜지스터 공정에서 양자 터널링 억제 메커니즘", career: "삼성전자·SK하이닉스 반도체 설계·공정 엔지니어, ASML·어플라이드" },
  { name: "전자전기공학부", cat: "첨단공학", subjects: "미적분, 기하, 물리학Ⅰ·Ⅱ", seteuk: "차세대 전력반도체(SiC·GaN) 인버터 효율 분석 및 전기차 초급속 충전 회로 설계", career: "삼성전자·LG전자·현대차 전장/회로 엔지니어, 한국전력공사" },
  { name: "기계공학과", cat: "공학계열", subjects: "미적분, 기하, 물리학Ⅰ·Ⅱ", seteuk: "열역학 사이클 효율 극대화를 위한 수소연료전지 열관리 시스템 및 유동해석(CFD)", career: "현대자동차·두산에너빌리티·한화에어로스페이스 R&D 엔지니어" },
  { name: "화학공학과", cat: "공학계열", subjects: "미적분, 화학Ⅰ·Ⅱ, 물리학Ⅰ", seteuk: "이차전지 전고체 배터리의 황화물계 고체전해질 이온전도도 향상 공정 설계", career: "LG에너지솔루션·SK이노베이션·롯데케미칼 공정/배터리 연구원" },
  { name: "신소재공학과", cat: "공학계열", subjects: "미적분, 화학Ⅰ·Ⅱ, 물리학Ⅰ·Ⅱ", seteuk: "페로브스카이트 태양전지의 수분 안정성 개선을 위한 나노 박막 코팅 소재 연구", career: "포스코·삼성SDI·LG화학 첨단소재 및 배터리 양극재 연구원" },
  { name: "생명공학과", cat: "바이오", subjects: "미적분, 생명과학Ⅰ·Ⅱ, 화학Ⅰ·Ⅱ", seteuk: "mRNA 백신 지질나노입자(LNP) 전달체의 세포 내 유입 효율과 면역원성 분석", career: "삼성바이오로직스·셀트리온·SK바이오사이언스 바이오 공정 연구원" },
  { name: "항공우주공학과", cat: "공학계열", subjects: "미적분, 기하, 물리학Ⅰ·Ⅱ", seteuk: "초음속 비행체 날개 단면(Airfoil)의 충격파 감소 설계 및 재사용 발사체 자세 제어", career: "한국항공우주산업(KAI), 한화에어로스페이스, 항공우주연구원" },
  { name: "건축학과", cat: "공학계열", subjects: "미적분, 기하, 물리학Ⅰ, 미술/제도", seteuk: "제로에너지 빌딩(ZEB) 구현을 위한 패시브 건축 외피 단열 설계와 구조역학 내진 해석", career: "현대건설·삼성물산 건축설계, 대형 건축사사무소, 도시계획 전문가" },
  { name: "경영학과", cat: "상경계열", subjects: "미적분, 확률과 통계, 경제, 사회·문화", seteuk: "ESG 경영 지표가 기업의 자기자본비용(COE) 및 장기 기업가치에 미치는 계량경제 분석", career: "대기업 전략기획·마케팅·재무, 글로벌 컨설팅펌, 공인회계사(CPA)" },
  { name: "경제학과", cat: "상경계열", subjects: "미적분, 확률과 통계, 경제", seteuk: "기준금리 변동과 환율 전가 효과가 국내 반도체·자동차 수출 채산성에 미치는 실증 분석", career: "한국은행·금융감독원·국책연구원, 증권사 애널리스트, 금융공기업" },
  { name: "미디어커뮤니케이션학과", cat: "인문사회", subjects: "확률과 통계, 사회·문화, 생활과 윤리", seteuk: "숏폼 알고리즘 추천 필터버블 현상이 MZ세대 여론 형성과 소비 행동에 미치는 영향", career: "방송국 PD·기자, 빅테크 콘텐츠 기획자, 글로벌 광고대행사 AE" },
  { name: "심리학과", cat: "인문사회", subjects: "확률과 통계, 생명과학Ⅰ, 생활과 윤리, 사회·문화", seteuk: "인지행동치료(CBT) 기반 디지털 치료제(DTx)의 우울·불안 감소 효과에 관한 실험 설계", career: "임상심리전문가, 빅테크 UX 리서처, 대기업 인사조직(HR) 전문가" },
  { name: "행정학과", cat: "인문사회", subjects: "확률과 통계, 정치와 법, 경제, 사회·문화", seteuk: "지방소멸 위기 대응을 위한 스마트시티 공공데이터 거버넌스 및 예산 배분 효율성 분석", career: "5급 행정고시(사무관), 한국토지주택공사(LH)·한전 등 메이저 공기업" },
  { name: "경찰행정학과", cat: "인문사회", subjects: "확률과 통계, 정치와 법, 사회·문화, 생활과 윤리", seteuk: "인공지능 범죄예측 시스템(CPT) 도입에 따른 치안 효율성과 개인정보 자기결정권의 조화", career: "경찰간부후보생, 경찰청 수사관, 검찰수사관, 국가정보원" },
  { name: "국어교육과", cat: "사범계열", subjects: "화법과 작문, 언어와 매체, 문학, 윤리와 사상", seteuk: "디지털 리터러시 함양을 위한 비문학 비판적 읽기 교수·학습 모형 및 평가 루브릭 개발", career: "중·고등학교 국어교사, 교육과정평가원 연구원, 에듀테크 기획자" },
  { name: "수학교육과", cat: "사범계열", subjects: "미적분, 기하, 확률과 통계, 인공지능 수학", seteuk: "공학적 도구(GeoGebra)를 활용한 미적분 극한 개념의 시각적 표상 전환 수업 설계", career: "중·고등학교 수학교사, AI 수학 에듀테크 연구원, 금융권 계리사" },
  { name: "초등교육과", cat: "사범계열", subjects: "전 과목 균형 이수, 확률과 통계, 생활과 윤리", seteuk: "초등 융합교육(STEAM) 기반 AI·생태전환 프로젝트 수업 설계 및 학습격차 해소 방안", career: "국공립 초등학교 교사, 교육부 교육전문직(장학사)" },
  { name: "유아교육과", cat: "사범계열", subjects: "생활과 윤리, 사회·문화, 생명과학Ⅰ", seteuk: "놀이 중심 누리과정에서 유아의 자기조절력 및 사회성 발달을 촉진하는 상호작용 분석", career: "국공립 유치원 교사, 유아교육진흥원 연구원, 아동발달센터" },
  { name: "사회복지학과", cat: "인문사회", subjects: "확률과 통계, 사회·문화, 생활과 윤리, 정치와 법", seteuk: "초고령사회 독거노인 돌봄 공백 해소를 위한 AI IoT 케어 시스템과 지역사회 통합돌봄", career: "국민건강보험공단·국민연금공단, 의료사회복지사, 사회복지전담공무원" },
  { name: "시각디자인학과", cat: "예체능", subjects: "미술 창작, 사회·문화, 정보", seteuk: "생성형 AI 인터페이스 환경에서 사용자 인지 부하를 줄이는 UI/UX 타이포그래피 시스템", career: "빅테크 프로덕트 디자이너(UI/UX), 브랜드 디렉터, 모션그래픽 아트디렉터" }
];

const HIGHSCHOOL_REGIONS = [
  { sido: "서울", schools: ["휘문고등학교","하나고등학교","중동고등학교","숙명여자고등학교","경기고등학교","단국대학교사범대학부속고등학교","서울과학고등학교","세종과학고등학교","대원외국어고등학교","한영외국어고등학교","명덕외국어고등학교","선덕고등학교","배재고등학교","보성고등학교","현대고등학교","세화고등학교","세화여자고등학교","양정고등학교","목동고등학교","강서고등학교","진명여자고등학교","창덕여자고등학교","상문고등학교","서초고등학교","반포고등학교","잠실고등학교","보인고등학교","한성과학고등학교","이화여자고등학교","중앙고등학교"] },
  { sido: "경기", schools: ["용인한국외국어대학교부설고등학교","경기과학고등학교","동탄국제고등학교","고양국제고등학교","수원외국어고등학교","성남외국어고등학교","경기북과학고등학교","안산동산고등학교","낙생고등학교","서현고등학교","분당중앙고등학교","분당대진고등학교","수내고등학교","보평고등학교","늘푸른고등학교","수성고등학교","유신고등학교","창현고등학교","광교고등학교","화성고등학교","세마고등학교","동화고등학교","운정고등학교","고양외국어고등학교","김포외국어고등학교","과천외국어고등학교","안양외국어고등학교","평촌고등학교","신성고등학교","백영고등학교"] },
  { sido: "인천", schools: ["인천포스코고등학교","인천하늘고등학교","인천과학고등학교","인천진산과학고등학교","인천국제고등학교","인천외국어고등학교","미추홀외국어고등학교","송도고등학교","연수고등학교","연수여자고등학교","인천고등학교","제물포고등학교","부평고등학교","인천여자고등학교","신명여자고등학교","인제고등학교","세일고등학교","부광고등학교","계양고등학교","인천원당고등학교"] },
  { sido: "광주", schools: ["광주과학고등학교","광주숭일고등학교","고려고등학교","국제고등학교","살레시오고등학교","광주제일고등학교","광주진흥고등학교","광주동신고등학교","광주서석고등학교","광주대동고등학교","금호고등학교","전남여자고등학교","광주수피아여자고등학교","광주경신여자고등학교","송원고등학교","보문고등학교","문성고등학교","정광고등학교","빛고을고등학교","장덕고등학교"] },
  { sido: "전남", schools: ["광양제철고등학교","전남과학고등학교","전남외국어고등학교","목포마리아회고등학교","목포홍일고등학교","목포혜인여자고등학교","순천매산고등학교","순천매산여자고등학교","순천효천고등학교","여수고등학교","여수충무고등학교","나주고등학교","능주고등학교","창평고등학교","장성고등학교","해룡고등학교","광양고등학교","순천고등학교","목포고등학교","목포여자고등학교"] },
  { sido: "전북", schools: ["상산고등학교","전북과학고등학교","전북외국어고등학교","전주고등학교","전주한일고등학교","전주신흥고등학교","전주여자고등학교","전주근영여자고등학교","전주성심여자고등학교","전주영생고등학교","전주해성고등학교","익산고등학교","원광고등학교","이리고등학교","군산고등학교","군산동고등학교","군산중앙고등학교","남성고등학교","정읍고등학교","호남고등학교"] },
  { sido: "대전", schools: ["대전과학고등학교","대전대성고등학교","대전둔산여자고등학교","대전외국어고등학교","대덕고등학교","대전고등학교","충남고등학교","보문고등학교","대전중앙고등학교","대전동산고등학교","대전전민고등학교","유성고등학교","대전만년고등학교","대전노은고등학교","대전반석고등학교","서대전고등학교","대전성모여자고등학교","대전한빛고등학교","대전이문고등학교","호수돈여자고등학교"] },
  { sido: "세종", schools: ["세종과학예술영재학교","세종국제고등학교","아름고등학교","한솔고등학교","도담고등학교","양지고등학교","고운고등학교","종촌고등학교","새롬고등학교","보람고등학교","소담고등학교","다정고등학교","반곡고등학교","해밀고등학교"] },
  { sido: "충남", schools: ["북일고등학교","충남삼성고등학교","충남과학고등학교","충남외국어고등학교","공주사대부설고등학교","한일고등학교","천안중앙고등학교","천안고등학교","천안북일여자고등학교","천안두정고등학교","천안불당고등학교","아산고등학교","배방고등학교","서산고등학교","서령고등학교","당진고등학교","합덕고등학교","논산대건고등학교","부여고등학교","홍성고등학교"] },
  { sido: "충북", schools: ["충북과학고등학교","청주외국어고등학교","세광고등학교","청주고등학교","충북고등학교","운호고등학교","신흥고등학교","청석고등학교","청주여자고등학교","일신여자고등학교","충북여자고등학교","산남고등학교","주성고등학교","오송고등학교","충주고등학교","충주중산고등학교","충주여자고등학교","제천고등학교","제천여자고등학교","한국교원대부설고등학교"] },
  { sido: "부산", schools: ["한국과학영재학교","부산과학고등학교","부산일과학고등학교","부산국제고등학교","부산외국어고등학교","부일외국어고등학교","해운대고등학교","동래고등학교","부산고등학교","경남고등학교","부산장안고등학교","사직고등학교","동인고등학교","브니엘고등학교","센텀고등학교","해강고등학교","부산중앙여자고등학교","동래여자고등학교","예문여자고등학교","남산고등학교"] },
  { sido: "울산", schools: ["현대청운고등학교","울산과학고등학교","울산외국어고등학교","학성고등학교","신정고등학교","울산중앙고등학교","울산제일고등학교","무거고등학교","우신고등학교","성신고등학교","현대고등학교","방어진고등학교","삼산고등학교","옥동고등학교","문수고등학교"] },
  { sido: "경남", schools: ["경남과학고등학교","창원과학고등학교","김해외국어고등학교","경남외국어고등학교","창원남고등학교","창원경일고등학교","창원문성고등학교","창원중앙고등학교","마산고등학교","마산중앙고등학교","마산제일고등학교","진주고등학교","진주동명고등학교","대아고등학교","명신고등학교","김해고등학교","김해분성고등학교","거창고등학교","거창대성고등학교","거제고등학교"] },
  { sido: "대구", schools: ["대구과학고등학교","대구일과학고등학교","대구외국어고등학교","대구국제고등학교","경신고등학교","대륜고등학교","정화여자고등학교","경북고등학교","능인고등학교","오성고등학교","영남고등학교","덕원고등학교","시지고등학교","대구여자고등학교","경북여자고등학교","혜화여자고등학교","송현여자고등학교","계성고등학교","성광고등학교","달성고등학교"] },
  { sido: "경북", schools: ["포항제철고등학교","김천고등학교","경북과학고등학교","경산과학고등학교","경북외국어고등학교","포항고등학교","포항이동고등학교","포항여자고등학교","경주고등학교","문화고등학교","안동고등학교","경안고등학교","구미고등학교","구미여자고등학교","현일고등학교","영주영광고등학교","대영고등학교","순심고등학교","점촌고등학교","영천고등학교"] },
  { sido: "강원", schools: ["민족사관고등학교","강원과학고등학교","강원외국어고등학교","춘천고등학교","춘천여자고등학교","강원고등학교","유봉여자고등학교","원주고등학교","원주여자고등학교","대성고등학교","진광고등학교","북원여자고등학교","강릉고등학교","강릉명륜고등학교","강릉제일고등학교","강릉여자고등학교","속초고등학교","동해광희고등학교","삼척고등학교","홍천고등학교"] },
  { sido: "제주", schools: ["제주과학고등학교","제주외국어고등학교","오현고등학교","제주제일고등학교","대기고등학교","남주고등학교","제주중앙여자고등학교","신성여자고등학교","제주여자고등학교","서귀포고등학교","남원고등학교","삼성여자고등학교"] }
];

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

function xmlEsc(v) {
  return String(v || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function enc(v) {
  return encodeURIComponent(String(v || "").trim());
}

const AI_TRUST_BANNER_HTML = `
  <div style="background:linear-gradient(135deg,#0f172a 0%,#1e293b 55%,#1e3a8a 100%);color:#fff;border-radius:16px;padding:18px 20px;margin-bottom:14px;border:1.5px solid rgba(96,165,250,0.45);box-shadow:0 8px 20px rgba(15,23,42,0.18);">
    <div style="display:inline-block;background:rgba(59,130,246,0.25);border:1px solid rgba(147,197,253,0.45);color:#93c5fd;font-size:11.5px;font-weight:800;padding:4px 11px;border-radius:999px;margin-bottom:8px;">
      🔬 수석 AI 엔지니어링 &amp; 대입 빅데이터 분석 알고리즘 공식 검증 시스템
    </div>
    <div style="font-size:16.5px;font-weight:900;line-height:1.42;color:#fff;margin-bottom:6px;word-break:keep-all;">
      &ldquo;대치동 100만 원 컨설팅의 직관을 넘어, <span style="color:#fbbf24;">AI 엔지니어의 빅데이터 정밀 알고리즘</span>으로 입시를 설계합니다.&rdquo;
    </div>
    <div style="font-size:12.5px;line-height:1.6;color:#cbd5e1;word-break:keep-all;">
      전문 AI 엔지니어가 설계한 다차원 성향·역량 분석 알고리즘과 교육부·대교협(어디가) 전국 6,082개 중·고·대학교 입결 및 1,000대 기업 채용 빅데이터를 실시간 교차 연산하여 1:1 합격 로드맵을 도출합니다.
    </div>
  </div>
`;

const CROSS_PLATFORM_FOOTER_HTML = `
  <section class="card" style="background:linear-gradient(135deg,#f8fafc 0%,#eff6ff 100%);border:1.5px solid #bfdbfe;">
    <h2 style="font-size:16.5px;color:#1e3a8a;margin-bottom:8px;">🏘️ 학부모님 필수 안심 제휴 플랫폼 (학군지 이사 &amp; 상가 안심딜)</h2>
    <p style="font-size:13px;color:#475569;margin-bottom:12px;">자녀 진학·학군지 아파트 매매·전세 및 학원·교습소·상가 임차 시 중개수수료(복비)를 50% 반값으로 아껴드립니다.</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px;">
      <a href="https://www.wooriapt.app" target="_blank" rel="noopener" style="display:block;padding:13px 14px;border-radius:12px;background:#1d4ed8;color:#fff;text-decoration:none;font-weight:800;font-size:13.5px;text-align:center;">
        🏠 전국 학군지 아파트 복비 50% 반값 · 우리아파트 안심거래 ›
      </a>
      <a href="https://www.ansimdeal.com" target="_blank" rel="noopener" style="display:block;padding:13px 14px;border-radius:12px;background:#0f766e;color:#fff;text-decoration:none;font-weight:800;font-size:13.5px;text-align:center;">
        🏪 전국 학원·상가·점포 복비 50% 반값 · 안심딜 바로가기 ›
      </a>
    </div>
  </section>
`;

function getUnivAdmissionTier(u) {
  const n = (u && u.name) || "";
  const isJunmun = u && (u.univSe === "전문대학" || (u.schlSe && u.schlSe.includes("전문")));
  if (n.includes("서울대학교") || n === "연세대학교" || n === "고려대학교") {
    return {
      tuition: (u && u.tuition) || (n.includes("서울대") ? "연 601만 원" : "연 785만 ~ 912만 원"),
      susiCut: "교과 1.00 ~ 1.35등급 / 학종 1.15 ~ 1.75등급",
      jungsiCut: "백분위 96.5% ~ 99.8%",
      minReq: "3개 영역 등급합 6~7 이내 (의약학 4합 5)"
    };
  }
  if (/서강대|성균관대|한양대|이화여대|중앙대|경희대|한국외국어대|서울시립대/.test(n)) {
    return {
      tuition: (u && u.tuition) || (n.includes("서울시립대") ? "연 239만 원 (반값등록금)" : "연 760만 ~ 880만 원"),
      susiCut: "교과 1.35 ~ 1.85등급 / 학종 1.7 ~ 2.5등급",
      jungsiCut: "백분위 92.0% ~ 96.8%",
      minReq: "국수영탐 3개 영역 합 6~7 이내"
    };
  }
  if (/전남대학교|부산대학교|경북대학교|충남대학교|전북대학교|충북대학교|강원대학교|경상국립대학교|제주대학교/.test(n)) {
    return {
      tuition: (u && u.tuition) || "연 410만 ~ 455만 원 (거점국립대 등록금)",
      susiCut: "메디컬 1.08~1.48 / 주력학과 2.1~2.9 / 일반 2.8~3.8등급",
      jungsiCut: "백분위 75.0% ~ 88.5% (메디컬 97%+)",
      minReq: "2개~3개 영역 등급합 5~9 이내 · 공공기관 지역인재 35% 의무채용 핵심 대학"
    };
  }
  if (isJunmun) {
    return {
      tuition: (u && u.tuition) || "연 520만 ~ 640만 원",
      susiCut: "간호·물리치료·치위생 2.2~3.8등급 / 일반학과 4.0~6.5등급",
      jungsiCut: "백분위 45.0% ~ 82.0%",
      minReq: "대부분 수능 최저 미적용 (간호·보건 일부 적용)"
    };
  }
  return {
    tuition: (u && u.tuition) || (u && u.fnd === "국공립" ? "연 390만 ~ 460만 원" : "연 710만 ~ 830만 원"),
    susiCut: "교과 2.2 ~ 4.1등급 / 학종 2.5 ~ 4.4등급",
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
  const depts = Array.isArray(u.depts) && u.depts.length > 0 ? u.depts : [
    { name: "컴퓨터공학 / AI학부", cat: "첨단IT", susi: tier.susiCut, jungsi: tier.jungsiCut, target: "수학·과탐 우수 및 코딩·알고리즘 세특" },
    { name: "간호학과 / 보건의료계열", cat: "보건의료", susi: tier.susiCut, jungsi: tier.jungsiCut, target: "생명과학·화학 교차이수 및 보건 세특" },
    { name: "경영학부 / 경제 / 행정학", cat: "상경계열", susi: tier.susiCut, jungsi: tier.jungsiCut, target: "확률과통계·경제 이수 및 데이터 분석 세특" },
    { name: "전자전기 / 반도체공학과", cat: "첨단공학", susi: tier.susiCut, jungsi: tier.jungsiCut, target: "미적분·물리학Ⅱ 이수 및 반도체 공정 탐구" }
  ];

  const title = `${u.name} 수시 등급컷 · 정시 백분위 · 학과별 입결 · 등록금 빅데이터 총람 | 알라딘 맘콕`;
  const desc = `🔬 [AI 엔지니어 입시 빅데이터 분석] ${u.name}(${u.sido} ${u.sigun || ""}) 대교협 어디가 70%컷 기준 작년도 학과별 수시 등급컷(${tier.susiCut}), 정시 백분위(${tier.jungsiCut}), 등록금(${tier.tuition}) 및 고교학점제 유망 전공 합격 전략을 확인하세요.`;
  const canonical = `${SITE_ORIGIN}/univ-info/${enc(u.sido || sido)}/${enc(u.name)}`;

  const sameSidoUnivs = allUnivs.filter((x) => x.sido === (u.sido || sido) && x.name !== u.name).slice(0, 12);

  return res.status(200).send(`<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:site_name" content="알라딘 맘콕 - AI 엔지니어 빅데이터 대입·진로 플랫폼">
<style>
body{margin:0;background:#f1f5f9;color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,"Noto Sans KR",sans-serif;}
.wrap{max-width:860px;margin:0 auto;padding:18px 14px 60px;}
.card{background:#fff;border-radius:18px;padding:22px;margin-bottom:16px;border:1px solid #e2e8f0;box-shadow:0 8px 24px rgba(15,23,42,0.06);}
h1{margin:0 0 12px;font-size:23px;line-height:1.38;color:#1e3a8a;}
h2{margin:0 0 12px;font-size:18.5px;color:#0f172a;}
p,li{line-height:1.7;color:#334155;font-size:14.5px;}
.cta{display:block;margin-top:14px;padding:15px;border-radius:12px;background:#2563eb;color:#fff;text-align:center;text-decoration:none;font-weight:900;font-size:15px;}
.tbl{width:100%;border-collapse:collapse;margin-top:10px;font-size:13.5px;}
.tbl th{background:#eff6ff;padding:10px 12px;border:1px solid #bfdbfe;text-align:left;color:#1e3a8a;font-weight:800;}
.tbl td{padding:10px 12px;border:1px solid #e2e8f0;font-weight:700;}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:8px;margin-top:12px;}
.glink{display:block;padding:10px;border-radius:10px;background:#f8fafc;border:1px solid #cbd5e1;color:#1e293b;font-size:12.5px;font-weight:800;text-decoration:none;text-align:center;}
.glink:hover{background:#eff6ff;border-color:#93c5fd;color:#1d4ed8;}
</style>
</head>
<body>
<main class="wrap">
  <div style="font-size:12.5px;color:#64748b;margin-bottom:10px;">
    <a href="${SITE_ORIGIN}" style="color:#2563eb;font-weight:800;text-decoration:none;">🪔 알라딘 맘콕 홈</a> &gt;
    <a href="${SITE_ORIGIN}/momkok-search.html" style="color:#2563eb;font-weight:700;text-decoration:none;">전국 442개 대학교·전공 빅데이터</a> &gt;
    <strong>${esc(u.name)}</strong>
  </div>

  ${AI_TRUST_BANNER_HTML}

  <section class="card">
    <h1>🏛️ ${esc(u.name)} 수시 등급컷 · 정시 백분위 · 학과별 입결 빅데이터 총람</h1>
    <p>${esc(desc)}</p>
    <table class="tbl">
      <tr><th style="width:135px;">대학명 / 구분</th><td>${esc(u.name)} (${esc(u.fnd || "대학")} · ${esc(u.univSe || "4년제")})</td></tr>
      <tr><th>소재지</th><td>${esc(u.addr || `${u.sido} ${u.sigun || ""}`)}</td></tr>
      <tr><th>연평균 등록금</th><td style="color:#059669;">${esc(tier.tuition)} (대학알리미 공시 기준)</td></tr>
      <tr><th>작년도 수시 70%컷</th><td style="color:#dc2626;">${esc(tier.susiCut)}</td></tr>
      <tr><th>작년도 정시 백분위</th><td style="color:#2563eb;">${esc(tier.jungsiCut)}</td></tr>
      <tr><th>수능 최저 및 강점</th><td>${esc(u.trait || tier.minReq)}</td></tr>
    </table>

    <h2 style="margin-top:20px;">📊 ${esc(u.name)} 주요 모집단위(학과·전공)별 수시·정시 합격컷 비교</h2>
    <table class="tbl">
      <thead>
        <tr>
          <th>모집단위 (전공·계열)</th>
          <th>수시 70% 등급컷</th>
          <th>정시 백분위 컷</th>
          <th>핵심 합격 전략</th>
        </tr>
      </thead>
      <tbody>
        ${depts.map((d) => `
        <tr>
          <td><a href="/univ-major/${enc(u.sido || sido)}/${enc(u.name)}/${enc(d.name.split("/")[0].trim())}" style="color:#1d4ed8;text-decoration:none;font-weight:900;">${esc(d.name)} ›</a></td>
          <td style="color:#dc2626;">${esc(d.susi || tier.susiCut)}</td>
          <td style="color:#2563eb;">${esc(d.jungsi || tier.jungsiCut)}</td>
          <td style="font-size:12.5px;color:#475569;">${esc(d.target || "교과·세특 정밀 설계")}</td>
        </tr>`).join("")}
      </tbody>
    </table>

    <a class="cta" href="${SITE_ORIGIN}/?univ=${enc(u.name)}">
      🔬 AI 엔지니어 빅데이터 알고리즘으로 [${esc(u.name)}] 합격 가능성 1:1 진단하기 ›
    </a>
  </section>

  <section class="card">
    <h2>🎓 ${esc(u.name)} 세부 전공·학과별 수시 등급컷 · 고교학점제 세특 바로가기</h2>
    <div class="grid">
      ${CORE_MAJORS.slice(0, 24).map((m) => `
        <a class="glink" href="/univ-major/${enc(u.sido || sido)}/${enc(u.name)}/${enc(m.name)}">📘 ${esc(u.name)} ${esc(m.name)}</a>
      `).join("")}
    </div>
  </section>

  <section class="card">
    <h2>🏛️ ${esc(u.sido || sido)} 지역 주요 대학교 입결 바로가기</h2>
    <div class="grid">
      ${sameSidoUnivs.map((item) => `<a class="glink" href="/univ-info/${enc(item.sido)}/${enc(item.name)}">🏛️ ${esc(item.name)}</a>`).join("")}
    </div>
  </section>

  ${CROSS_PLATFORM_FOOTER_HTML}
</main>
</body>
</html>`);
}

function handleUnivMajorPage(req, res) {
  const sido = String(req.query.sido || "서울").trim();
  const univName = String(req.query.univ || "고려대학교").trim();
  const majorName = String(req.query.major || "컴퓨터공학과").trim();

  const allUnivs = loadUnivs();
  const allJobs = loadJobs();
  const u =
    allUnivs.find((x) => x.name === univName) ||
    allUnivs.find((x) => x.name && x.name.includes(univName)) || {
      name: univName,
      sido: sido,
      sigun: "",
      fnd: "사립",
      univSe: "4년제 대학교",
      addr: `${sido} 소재`,
      depts: []
    };

  const tier = getUnivAdmissionTier(u);
  const mInfo = CORE_MAJORS.find((m) => m.name === majorName || majorName.includes(m.name) || m.name.includes(majorName)) || {
    name: majorName,
    cat: "유망전공",
    subjects: "미적분, 확률과 통계, 영어Ⅱ, 진로선택 심화과목",
    seteuk: `${majorName} 핵심 이론을 활용한 실생활 데이터 모델링 및 심화 탐구 보고서`,
    career: "대기업·공공기관 전공 직무, 전문 연구직, 글로벌 기업"
  };

  const matchedDept = (Array.isArray(u.depts) ? u.depts : []).find((d) => d.name && (d.name.includes(majorName) || d.cat === mInfo.cat)) || {};
  const susiCut = matchedDept.susi || tier.susiCut;
  const jungsiCut = matchedDept.jungsi || tier.jungsiCut;

  const title = `${u.name} ${majorName} 수시 등급컷 · 정시 백분위 · 고교학점제 선택과목 · 세특 빅데이터 | 알라딘 맘콕`;
  const desc = `🔬 [AI 엔지니어 입시 빅데이터 분석] ${u.name} ${majorName} 작년도 수시 70% 등급컷(${susiCut}), 정시 백분위(${jungsiCut}), 고교학점제 필수 선택과목(${mInfo.subjects}), 생기부 세특 탐구 주제 및 졸업 후 대기업 초봉 정보를 확인하세요.`;
  const canonical = `${SITE_ORIGIN}/univ-major/${enc(u.sido || sido)}/${enc(u.name)}/${enc(majorName)}`;

  return res.status(200).send(`<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:site_name" content="알라딘 맘콕 - AI 엔지니어 빅데이터 대입·진로 플랫폼">
<style>
body{margin:0;background:#f1f5f9;color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,"Noto Sans KR",sans-serif;}
.wrap{max-width:860px;margin:0 auto;padding:18px 14px 60px;}
.card{background:#fff;border-radius:18px;padding:22px;margin-bottom:16px;border:1px solid #e2e8f0;box-shadow:0 8px 24px rgba(15,23,42,0.06);}
h1{margin:0 0 12px;font-size:23px;line-height:1.38;color:#1e3a8a;}
h2{margin:0 0 12px;font-size:18.5px;color:#0f172a;}
p,li{line-height:1.7;color:#334155;font-size:14.5px;}
.cta{display:block;margin-top:14px;padding:15px;border-radius:12px;background:#2563eb;color:#fff;text-align:center;text-decoration:none;font-weight:900;font-size:15px;}
.tbl{width:100%;border-collapse:collapse;margin-top:10px;font-size:13.5px;}
.tbl th{width:155px;background:#eff6ff;padding:10px 12px;border:1px solid #bfdbfe;text-align:left;color:#1e3a8a;font-weight:800;}
.tbl td{padding:10px 12px;border:1px solid #e2e8f0;font-weight:700;}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:8px;margin-top:12px;}
.glink{display:block;padding:10px;border-radius:10px;background:#f8fafc;border:1px solid #cbd5e1;color:#1e293b;font-size:12.5px;font-weight:800;text-decoration:none;text-align:center;}
</style>
</head>
<body>
<main class="wrap">
  <div style="font-size:12.5px;color:#64748b;margin-bottom:10px;">
    <a href="${SITE_ORIGIN}" style="color:#2563eb;font-weight:800;text-decoration:none;">🪔 알라딘 맘콕 홈</a> &gt;
    <a href="/univ-info/${enc(u.sido || sido)}/${enc(u.name)}" style="color:#2563eb;font-weight:700;text-decoration:none;">${esc(u.name)}</a> &gt;
    <strong>${esc(majorName)} 입결·세특 빅데이터</strong>
  </div>

  ${AI_TRUST_BANNER_HTML}

  <section class="card">
    <h1>📘 ${esc(u.name)} [${esc(majorName)}] 수시 등급컷 · 정시 백분위 · 고교학점제 세특 빅데이터</h1>
    <p>${esc(desc)}</p>
    <table class="tbl">
      <tr><th>대학 / 전공명</th><td>${esc(u.name)} ${esc(majorName)} (${esc(mInfo.cat)})</td></tr>
      <tr><th>작년도 수시 70% 컷</th><td style="color:#dc2626;">${esc(susiCut)} (학생부교과·학종 기준)</td></tr>
      <tr><th>작년도 정시 백분위</th><td style="color:#2563eb;">${esc(jungsiCut)} (국·수·탐 평균 백분위)</td></tr>
      <tr><th>수능 최저학력기준</th><td>${esc(tier.minReq)}</td></tr>
      <tr><th>고교학점제 필수·권장 과목</th><td style="color:#059669;">${esc(mInfo.subjects)}</td></tr>
      <tr><th>학종 생기부 세특 핵심 주제</th><td>${esc(mInfo.seteuk)}</td></tr>
      <tr><th>졸업 후 주요 진출 분야</th><td>${esc(mInfo.career)}</td></tr>
    </table>

    <a class="cta" href="${SITE_ORIGIN}/?univ=${enc(u.name)}&major=${enc(majorName)}">
      🔬 AI 엔지니어 빅데이터 알고리즘으로 [${esc(u.name)} ${esc(majorName)}] 합격률 진단하기 ›
    </a>
  </section>

  <section class="card">
    <h2>🏛️ [${esc(majorName)}] 전국 주요 대학교 입결 비교 바로가기</h2>
    <div class="grid">
      ${allUnivs.slice(0, 16).map((other) => `
        <a class="glink" href="/univ-major/${enc(other.sido)}/${enc(other.name)}/${enc(majorName)}">${esc(other.name)} ${esc(majorName)}</a>
      `).join("")}
    </div>
  </section>

  <section class="card">
    <h2>💼 [${esc(majorName)}] 졸업생 선호 대기업 · 공공기관 초봉 빅데이터</h2>
    <div class="grid">
      ${allJobs.slice(0, 12).map((j) => `
        <a class="glink" href="/job-info/${enc(j.category)}/${enc(j.name)}">💼 ${esc(j.name)} (${esc(j.startPay)})</a>
      `).join("")}
    </div>
  </section>

  ${CROSS_PLATFORM_FOOTER_HTML}
</main>
</body>
</html>`);
}

function handleHighschoolPage(req, res) {
  const sido = String(req.query.sido || "서울").trim();
  const school = String(req.query.school || "휘문고등학교").trim();
  const isSpecial = /과학|외국어|국제|영재|하나고|상산고|민족사관|포항제철|광양제철|인천하늘|인천포스코|용인한국외|현대청운|북일고|충남삼성|김천고/.test(school);
  const schoolType = isSpecial ? "특목고·자사고·명문 선발고" : "일반계 고등학교 (고교학점제 중점)";

  const title = `${school} (${sido}) 대입 수시·정시 진학 설계 · 내신 등급별 목표대학 · 고교학점제 선택과목 빅데이터 | 알라딘 맘콕`;
  const desc = `🔬 [AI 엔지니어 입시 빅데이터 분석] ${sido} ${school}(${schoolType}) 재학생·예비고1 학부모를 위한 내신 등급대별 지원 가능 대학교 라인, 2028 고교학점제 필수 선택과목 설계, 학생부종합전형 세특 전략을 확인하세요.`;
  const canonical = `${SITE_ORIGIN}/highschool-info/${enc(sido)}/${enc(school)}`;

  const regObj = HIGHSCHOOL_REGIONS.find((r) => r.sido === sido) || HIGHSCHOOL_REGIONS[0];
  const siblingSchools = regObj.schools.filter((s) => s !== school).slice(0, 16);
  const allUnivs = loadUnivs();

  return res.status(200).send(`<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:site_name" content="알라딘 맘콕 - AI 엔지니어 빅데이터 대입·진로 플랫폼">
<style>
body{margin:0;background:#f1f5f9;color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,"Noto Sans KR",sans-serif;}
.wrap{max-width:860px;margin:0 auto;padding:18px 14px 60px;}
.card{background:#fff;border-radius:18px;padding:22px;margin-bottom:16px;border:1px solid #e2e8f0;box-shadow:0 8px 24px rgba(15,23,42,0.06);}
h1{margin:0 0 12px;font-size:23px;line-height:1.38;color:#1e3a8a;}
h2{margin:0 0 12px;font-size:18.5px;color:#0f172a;}
p,li{line-height:1.7;color:#334155;font-size:14.5px;}
.cta{display:block;margin-top:14px;padding:15px;border-radius:12px;background:#2563eb;color:#fff;text-align:center;text-decoration:none;font-weight:900;font-size:15px;}
.tbl{width:100%;border-collapse:collapse;margin-top:10px;font-size:13.5px;}
.tbl th{background:#eff6ff;padding:10px 12px;border:1px solid #bfdbfe;text-align:left;color:#1e3a8a;font-weight:800;}
.tbl td{padding:10px 12px;border:1px solid #e2e8f0;font-weight:700;}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:8px;margin-top:12px;}
.glink{display:block;padding:10px;border-radius:10px;background:#f8fafc;border:1px solid #cbd5e1;color:#1e293b;font-size:12.5px;font-weight:800;text-decoration:none;text-align:center;}
</style>
</head>
<body>
<main class="wrap">
  <div style="font-size:12.5px;color:#64748b;margin-bottom:10px;">
    <a href="${SITE_ORIGIN}" style="color:#2563eb;font-weight:800;text-decoration:none;">🪔 알라딘 맘콕 홈</a> &gt;
    <strong>${esc(sido)} ${esc(school)} 대입·고교학점제 빅데이터</strong>
  </div>

  ${AI_TRUST_BANNER_HTML}

  <section class="card">
    <h1>🏫 ${esc(school)} (${esc(sido)}) 내신 등급별 목표 대학 &amp; 고교학점제 진학 설계 빅데이터</h1>
    <p>${esc(desc)}</p>
    <table class="tbl">
      <tr><th style="width:150px;">학교명 / 지역</th><td>${esc(school)} (${esc(sido)} 지역 · ${esc(schoolType)})</td></tr>
      <tr><th>권장 대입 핵심 전형</th><td style="color:#dc2626;">${isSpecial ? "학생부종합전형(심화 세특) + 수능 정시 병행 전략" : "학생부교과(지역균형/학교장추천) + 학생부종합 + 지역인재전형"}</td></tr>
      <tr><th>1등급대 (상위 4~10%)</th><td style="color:#2563eb;">의·치·한·약·수 메디컬 / 서울대·연세대·고려대·KAIST·성균관대·서강대·한양대</td></tr>
      <tr><th>2등급대 (상위 11~23%)</th><td>중앙대·경희대·한국외대·서울시립대·건국대·동국대·홍익대 / 거점국립대 상위학과·간호학과</td></tr>
      <tr><th>3~4등급대 (중상위권)</th><td>수도권 주요 4년제 / 9대 거점국립대(전남대·부산대·경북대·충남대 등) / 보건의료(물리치료·치위생·방사선)</td></tr>
      <tr><th>고교학점제 핵심 전략</th><td style="color:#059669;">목표 전공별 핵심 권장과목(미적분·기하·물리학Ⅱ·화학Ⅱ·생명과학Ⅱ·경제 등) 이수 여부로 학종 합격률 결정</td></tr>
    </table>

    <a class="cta" href="${SITE_ORIGIN}/?school=${enc(school)}">
      🔬 AI 엔지니어 빅데이터 알고리즘으로 [${esc(school)}] 내 성적 맞춤 대학·전공 진단하기 ›
    </a>
  </section>

  <section class="card">
    <h2>📘 ${esc(school)} 학생 선호 유망 전공 · 학과별 합격컷 바로가기</h2>
    <div class="grid">
      ${CORE_MAJORS.slice(0, 18).map((m) => `
        <a class="glink" href="/major-info/${enc(m.name)}">🎯 ${esc(m.name)} 입결·세특</a>
      `).join("")}
    </div>
  </section>

  <section class="card">
    <h2>🏫 ${esc(sido)} 지역 주요 고등학교 대입·내신 설계 바로가기</h2>
    <div class="grid">
      ${siblingSchools.map((s) => `
        <a class="glink" href="/highschool-info/${enc(regObj.sido)}/${enc(s)}">🏫 ${esc(s)}</a>
      `).join("")}
    </div>
  </section>

  <section class="card">
    <h2>🏛️ 전국 주요 명문대 · 거점국립대 입결 바로가기</h2>
    <div class="grid">
      ${allUnivs.slice(0, 12).map((u) => `
        <a class="glink" href="/univ-info/${enc(u.sido)}/${enc(u.name)}">🏛️ ${esc(u.name)}</a>
      `).join("")}
    </div>
  </section>

  ${CROSS_PLATFORM_FOOTER_HTML}
</main>
</body>
</html>`);
}

function handleMajorPage(req, res) {
  const majorName = String(req.query.major || "컴퓨터공학과").trim();
  const mInfo = CORE_MAJORS.find((m) => m.name === majorName || majorName.includes(m.name)) || CORE_MAJORS[10];
  const allUnivs = loadUnivs();

  const title = `${mInfo.name} 대학 순위 · 수시 등급컷 · 고교학점제 선택과목 · 세특 · 취업 연봉 빅데이터 | 알라딘 맘콕`;
  const desc = `🔬 [AI 엔지니어 입시 빅데이터 분석] 전국 대학교 ${mInfo.name} 수시 70% 등급컷·정시 백분위 비교, 고교학점제 필수 권장과목(${mInfo.subjects}), 학종 생기부 세특 주제 및 졸업 후 대기업 초봉 빅데이터 총람.`;
  const canonical = `${SITE_ORIGIN}/major-info/${enc(mInfo.name)}`;

  return res.status(200).send(`<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:site_name" content="알라딘 맘콕 - AI 엔지니어 빅데이터 대입·진로 플랫폼">
<style>
body{margin:0;background:#f1f5f9;color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,"Noto Sans KR",sans-serif;}
.wrap{max-width:860px;margin:0 auto;padding:18px 14px 60px;}
.card{background:#fff;border-radius:18px;padding:22px;margin-bottom:16px;border:1px solid #e2e8f0;box-shadow:0 8px 24px rgba(15,23,42,0.06);}
h1{margin:0 0 12px;font-size:23px;line-height:1.38;color:#1e3a8a;}
h2{margin:0 0 12px;font-size:18.5px;color:#0f172a;}
p,li{line-height:1.7;color:#334155;font-size:14.5px;}
.cta{display:block;margin-top:14px;padding:15px;border-radius:12px;background:#2563eb;color:#fff;text-align:center;text-decoration:none;font-weight:900;font-size:15px;}
.tbl{width:100%;border-collapse:collapse;margin-top:10px;font-size:13.5px;}
.tbl th{width:155px;background:#eff6ff;padding:10px 12px;border:1px solid #bfdbfe;text-align:left;color:#1e3a8a;font-weight:800;}
.tbl td{padding:10px 12px;border:1px solid #e2e8f0;font-weight:700;}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:8px;margin-top:12px;}
.glink{display:block;padding:10px;border-radius:10px;background:#f8fafc;border:1px solid #cbd5e1;color:#1e293b;font-size:12.5px;font-weight:800;text-decoration:none;text-align:center;}
</style>
</head>
<body>
<main class="wrap">
  <div style="font-size:12.5px;color:#64748b;margin-bottom:10px;">
    <a href="${SITE_ORIGIN}" style="color:#2563eb;font-weight:800;text-decoration:none;">🪔 알라딘 맘콕 홈</a> &gt;
    <strong>${esc(mInfo.name)} 전국 대학 입결·세특 빅데이터</strong>
  </div>

  ${AI_TRUST_BANNER_HTML}

  <section class="card">
    <h1>🎯 [${esc(mInfo.name)}] 전국 대학 등급컷 · 고교학점제 권장과목 · 세특 빅데이터</h1>
    <p>${esc(desc)}</p>
    <table class="tbl">
      <tr><th>전공명 / 계열</th><td>${esc(mInfo.name)} (${esc(mInfo.cat)})</td></tr>
      <tr><th>고교학점제 핵심 선택과목</th><td style="color:#059669;">${esc(mInfo.subjects)}</td></tr>
      <tr><th>학생부 세특 추천 탐구주제</th><td style="color:#1e3a8a;">${esc(mInfo.seteuk)}</td></tr>
      <tr><th>졸업 후 진로 및 취업처</th><td style="color:#dc2626;">${esc(mInfo.career)}</td></tr>
    </table>
    <a class="cta" href="${SITE_ORIGIN}/?major=${enc(mInfo.name)}">
      🔬 AI 엔지니어 빅데이터 알고리즘으로 [${esc(mInfo.name)}] 적성 적합도 &amp; 합격 대학 찾기 ›
    </a>
  </section>

  <section class="card">
    <h2>🏛️ 전국 대학교별 [${esc(mInfo.name)}] 수시·정시 등급컷 바로가기</h2>
    <div class="grid">
      ${allUnivs.slice(0, 36).map((u) => `
        <a class="glink" href="/univ-major/${enc(u.sido)}/${enc(u.name)}/${enc(mInfo.name)}">${esc(u.name)} ${esc(mInfo.name)}</a>
      `).join("")}
    </div>
  </section>

  <section class="card">
    <h2>📘 다른 유망 전공 · 학과 빅데이터 바로가기</h2>
    <div class="grid">
      ${CORE_MAJORS.map((m) => `
        <a class="glink" href="/major-info/${enc(m.name)}">📘 ${esc(m.name)}</a>
      `).join("")}
    </div>
  </section>

  ${CROSS_PLATFORM_FOOTER_HTML}
</main>
</body>
</html>`);
}

function handleJobPage(req, res) {
  const cat = String(req.query.category || "대기업").trim();
  const compName = String(req.query.company || "삼성전자").trim();
  const allJobs = loadJobs();
  const j =
    allJobs.find((x) => x.name === compName) ||
    allJobs.find((x) => x.name && x.name.includes(compName)) || {
      name: compName,
      category: cat,
      subCategory: "주요 기업",
      location: "전국 주요 거점",
      type: cat,
      employees: "공시 기준",
      startPay: "4,500만 ~ 5,500만 원",
      avgPay: "8,500만 ~ 1억 1,000만 원",
      jobs: ["연구개발(R&D)", "SW/IT 개발", "생산/품질", "경영지원", "영업마케팅"],
      spec: "학점 3.5+ · 어학 오픽 IM2+ · 직무 인턴/자격증 우대",
      traitMatch: "직무 전문성 및 협업 역량 우수 인재",
      recruitUrl: "https://www.work.go.kr"
    };

  const title = `${j.name} 초봉 · 평균연봉 · 채용 직무 · 합격 스펙 · 유망 대학학과 빅데이터 | 알라딘 맘콕`;
  const desc = `🔬 [AI 엔지니어 채용 빅데이터 분석] ${j.name}(${j.category} · ${j.subCategory || ""}) 대졸 신입 초봉(${j.startPay}), 평균 연봉(${j.avgPay}), 핵심 채용 직무(${(j.jobs || []).join(", ")}), 합격 스펙 커트라인 정보를 확인하세요.`;
  const canonical = `${SITE_ORIGIN}/job-info/${enc(j.category || cat)}/${enc(j.name)}`;
  const sameCatJobs = allJobs.filter((x) => x.category === (j.category || cat) && x.name !== j.name).slice(0, 12);

  return res.status(200).send(`<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:site_name" content="알라딘 맘콕 - AI 엔지니어 빅데이터 대입·진로 플랫폼">
<style>
body{margin:0;background:#f1f5f9;color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,"Noto Sans KR",sans-serif;}
.wrap{max-width:860px;margin:0 auto;padding:18px 14px 60px;}
.card{background:#fff;border-radius:18px;padding:22px;margin-bottom:16px;border:1px solid #e2e8f0;box-shadow:0 8px 24px rgba(15,23,42,0.06);}
h1{margin:0 0 12px;font-size:23px;line-height:1.38;color:#065f46;}
h2{margin:0 0 12px;font-size:18.5px;color:#0f172a;}
p,li{line-height:1.7;color:#334155;font-size:14.5px;}
.cta{display:block;margin-top:14px;padding:15px;border-radius:12px;background:#059669;color:#fff;text-align:center;text-decoration:none;font-weight:900;font-size:15px;}
.tbl{width:100%;border-collapse:collapse;margin-top:10px;font-size:13.5px;}
.tbl th{width:140px;background:#ecfdf5;padding:10px 12px;border:1px solid #a7f3d0;text-align:left;color:#065f46;font-weight:800;}
.tbl td{padding:10px 12px;border:1px solid #e2e8f0;font-weight:700;}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:8px;margin-top:12px;}
.glink{display:block;padding:10px;border-radius:10px;background:#f8fafc;border:1px solid #cbd5e1;color:#1e293b;font-size:12.5px;font-weight:800;text-decoration:none;text-align:center;}
</style>
</head>
<body>
<main class="wrap">
  <div style="font-size:12.5px;color:#64748b;margin-bottom:10px;">
    <a href="${SITE_ORIGIN}" style="color:#059669;font-weight:800;text-decoration:none;">🪔 알라딘 맘콕 홈</a> &gt;
    <a href="${SITE_ORIGIN}/momkok-job-search.html" style="color:#059669;font-weight:700;text-decoration:none;">1,000대 기업 연봉 총람</a> &gt;
    <strong>${esc(j.name)}</strong>
  </div>

  ${AI_TRUST_BANNER_HTML}

  <section class="card">
    <h1>💼 ${esc(j.name)} 대졸 신입 초봉 · 평균연봉 · 합격 스펙 빅데이터</h1>
    <p>${esc(desc)}</p>
    <table class="tbl">
      <tr><th>기업명 / 분류</th><td>${esc(j.name)} (${esc(j.category)} · ${esc(j.subCategory || "")})</td></tr>
      <tr><th>대졸 신입 초봉</th><td style="color:#dc2626;">${esc(j.startPay)}</td></tr>
      <tr><th>임직원 평균연봉</th><td style="color:#2563eb;">${esc(j.avgPay)}</td></tr>
      <tr><th>주요 채용 직무</th><td>${esc((j.jobs || []).join(" · "))}</td></tr>
      <tr><th>합격 스펙 기준</th><td style="color:#059669;">${esc(j.spec)}</td></tr>
      <tr><th>인재상 및 유리한 전공</th><td>${esc(j.traitMatch)}</td></tr>
    </table>
    <a class="cta" href="${SITE_ORIGIN}">
      🔬 AI 엔지니어 빅데이터 알고리즘으로 [${esc(j.name)}] 입사 유리한 대학·전공 매칭하기 ›
    </a>
  </section>

  <section class="card">
    <h2>🏢 ${esc(j.category || cat)} 주요 기업 연봉 비교 바로가기</h2>
    <div class="grid">
      ${sameCatJobs.map((item) => `<a class="glink" href="/job-info/${enc(item.category)}/${enc(item.name)}">💼 ${esc(item.name)}</a>`).join("")}
    </div>
  </section>

  ${CROSS_PLATFORM_FOOTER_HTML}
</main>
</body>
</html>`);
}

function handleCareerRegionPage(req, res) {
  const region = String(req.query.region || "서울특별시").trim();
  const city = String(req.query.city || "강남구").trim();
  const place = String(req.query.place || "대치동").trim();
  const loc = [region, city, place].filter(Boolean).join(" ");
  const shortSido = region.slice(0, 2);
  const regSchools = (HIGHSCHOOL_REGIONS.find((r) => r.sido.includes(shortSido)) || HIGHSCHOOL_REGIONS[0]).schools;
  const allUnivs = loadUnivs();

  const title = `${loc} 고등학교 내신·고교학점제 설계 & 전국 442개 대학교·전공 입결 빅데이터 | 알라딘 맘콕`;
  const desc = `🔬 [AI 엔지니어 입시 빅데이터 분석] ${loc} 학부모·학생을 위한 고등학교 진학 설계, 전국 442개 대학교 학과별 수시 등급컷·정시 백분위, 고교학점제 선택과목 및 AI 적성 진로진단 포털.`;
  const canonical = `${SITE_ORIGIN}/career-search/${[region, city, place].map(enc).join("/")}`;

  return res.status(200).send(`<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${esc(canonical)}">
<style>
body{margin:0;background:#f1f5f9;color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,"Noto Sans KR",sans-serif;}
.wrap{max-width:860px;margin:0 auto;padding:18px 14px 60px;}
.card{background:#fff;border-radius:18px;padding:22px;margin-bottom:16px;border:1px solid #e2e8f0;box-shadow:0 8px 24px rgba(15,23,42,0.06);}
h1{margin:0 0 12px;font-size:23px;line-height:1.38;color:#0f172a;}
h2{margin:0 0 12px;font-size:18.5px;color:#0f172a;}
p{line-height:1.7;color:#334155;font-size:14.5px;}
.cta{display:block;margin-top:14px;padding:15px;border-radius:12px;background:#2563eb;color:#fff;text-align:center;text-decoration:none;font-weight:900;font-size:15px;}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:8px;margin-top:12px;}
.glink{display:block;padding:10px;border-radius:10px;background:#f8fafc;border:1px solid #cbd5e1;color:#1e293b;font-size:12.5px;font-weight:800;text-decoration:none;text-align:center;}
</style>
</head>
<body>
<main class="wrap">
  ${AI_TRUST_BANNER_HTML}
  <section class="card">
    <h1>🎓 ${esc(loc)} 고등학교 진학 · 대학교 전공별 입결 빅데이터</h1>
    <p>${esc(desc)}</p>
    <a class="cta" href="${SITE_ORIGIN}">🔬 AI 엔지니어 빅데이터 알고리즘 1:1 입시·진로 정밀진단 시작하기 ›</a>
  </section>
  <section class="card">
    <h2>🏫 주요 고등학교 대입·내신 설계 바로가기</h2>
    <div class="grid">
      ${regSchools.slice(0, 16).map((s) => `<a class="glink" href="/highschool-info/${enc(shortSido)}/${enc(s)}">🏫 ${esc(s)}</a>`).join("")}
    </div>
  </section>
  <section class="card">
    <h2>🏛️ 전국 주요 대학교 학과별 입결 바로가기</h2>
    <div class="grid">
      ${allUnivs.slice(0, 16).map((u) => `<a class="glink" href="/univ-info/${enc(u.sido)}/${enc(u.name)}">🏛️ ${esc(u.name)}</a>`).join("")}
    </div>
  </section>
  ${CROSS_PLATFORM_FOOTER_HTML}
</main>
</body>
</html>`);
}

function handleDynamicSitemap(req, res) {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400");
  const lastmod = new Date().toISOString().split("T")[0];
  const sub = String(req.query.sub || "index").trim();
  const allUnivs = loadUnivs();
  const allJobs = loadJobs();

  if (sub === "index") {
    const sitemaps = [
      `${SITE_ORIGIN}/sitemaps/core-univ-highschool.xml`,
      `${SITE_ORIGIN}/sitemaps/univ-majors-1.xml`,
      `${SITE_ORIGIN}/sitemaps/univ-majors-2.xml`,
      `${SITE_ORIGIN}/sitemaps/univ-majors-3.xml`,
      `${SITE_ORIGIN}/sitemaps/univ-majors-4.xml`,
      `${SITE_ORIGIN}/sitemaps/univ-majors-5.xml`
    ];
    return res.status(200).send(
      `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      sitemaps.map((loc) => `  <sitemap><loc>${xmlEsc(loc)}</loc><lastmod>${lastmod}</lastmod></sitemap>`).join("\n") +
      `\n</sitemapindex>`
    );
  }

  if (sub === "core") {
    const urls = [
      `${SITE_ORIGIN}/`,
      `${SITE_ORIGIN}/momkok-landing.html`,
      `${SITE_ORIGIN}/momkok-search.html`,
      `${SITE_ORIGIN}/momkok-job-search.html`
    ];
    for (const m of CORE_MAJORS) {
      urls.push(`${SITE_ORIGIN}/major-info/${enc(m.name)}`);
    }
    for (const reg of HIGHSCHOOL_REGIONS) {
      for (const s of reg.schools) {
        urls.push(`${SITE_ORIGIN}/highschool-info/${enc(reg.sido)}/${enc(s)}`);
      }
    }
    for (const u of allUnivs) {
      urls.push(`${SITE_ORIGIN}/univ-info/${enc(u.sido)}/${enc(u.name)}`);
    }
    for (const j of allJobs) {
      urls.push(`${SITE_ORIGIN}/job-info/${enc(j.category)}/${enc(j.name)}`);
    }
    return res.status(200).send(
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      urls.map((u) => `  <url><loc>${xmlEsc(u)}</loc><lastmod>${lastmod}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>`).join("\n") +
      `\n</urlset>`
    );
  }

  // Univ x Major pages (split into 5 chunks of ~90 univs x 35 majors = ~3,150 URLs each -> 15,470 total)
  const page = Math.max(1, Math.min(5, parseInt(req.query.page || "1", 10)));
  const chunkSize = Math.ceil(allUnivs.length / 5);
  const sliceUnivs = allUnivs.slice((page - 1) * chunkSize, page * chunkSize);
  const urls = [];
  for (const u of sliceUnivs) {
    for (const m of CORE_MAJORS) {
      urls.push(`${SITE_ORIGIN}/univ-major/${enc(u.sido)}/${enc(u.name)}/${enc(m.name)}`);
    }
  }
  return res.status(200).send(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${xmlEsc(u)}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.95</priority></url>`).join("\n") +
    `\n</urlset>`
  );
}

module.exports = async function handler(req, res) {
  const mode = String((req.query && req.query.mode) || "univ").trim();
  if (mode === "sitemap") {
    return handleDynamicSitemap(req, res);
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800");

  if (mode === "univ-major") {
    return handleUnivMajorPage(req, res);
  }
  if (mode === "highschool") {
    return handleHighschoolPage(req, res);
  }
  if (mode === "major") {
    return handleMajorPage(req, res);
  }
  if (mode === "job") {
    return handleJobPage(req, res);
  }
  if (mode === "career") {
    return handleCareerRegionPage(req, res);
  }
  return handleUnivPage(req, res);
};
