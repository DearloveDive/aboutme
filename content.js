/* ==========================================================================
   VINCERE — 사이트 내용 파일
   --------------------------------------------------------------------------
   ✏️  사이트에 보이는 글자·이미지 경로는 전부 이 파일에서 고치면 됩니다.
       (index.html / assets 폴더는 건드리지 않아도 돼요)

   구성
     첫 화면(달) → 스크롤하면 붉은 화면(심장 + 다섯 항목) → 항목을 누르면 상세창
       VINCERE : 두 사람 소개        PROMPT : 외형·의상 프롬프트 (복사 버튼)
       LIST    : 배려 리스트          BANNER : 다른 분들 배너 링크
       LINK    : 나의 다른 링크들

   글 쓰는 규칙
   - 따옴표 "  " 안의 글자만 고치세요. 따옴표·쉼표를 지우면 사이트가 안 떠요.
   - 줄바꿈:            \n
   - 붉은 강조:          **강조할 말**
   - 블랙레터(Angel Wish)·필기체(Beauty Angelique) 글꼴은 영문만 지원해요.
     영문 칸에 한글을 쓰면 일반 명조로 보여요.
   ========================================================================== */

window.SITE = {

  meta: {
    title: "VINCERE : the eclipse",
    description: "가이드 다이브 & 센티넬 널 · 드림 페어 전시",
  },

  // 사진 색 처리: "mono"(흑백) / "mono-red"(흑백 + 붉은 톤) / "original"(원본 색)
  imageTone: "original",

  /* ── 메인 첫 화면 ─────────────────────────────────────
     검은 화면에 개기일식 중인 달의 붉은 코로나가 빛나다가,
     점이 하나 둘 반짝이며 3D 망점 달로 변하고, 글자들이 타이핑되듯 나타나요.
     달은 마우스로 끌거나 손가락으로 밀면 3D로 돌아가요. */
  intro: {
    logo: "images/logo.webp",                  // 로고 (배경 투명 PNG)

    // D+ 날짜 세기 — 실시간으로 밀리초까지 올라가요
    since: "2025-12-15",                      // 시작 날짜 (년-월-일)
    sinceLabel: "Since 2025.12.15",
    dayOne: false,                            // true 로 바꾸면 시작한 날을 D+1 로 세요

    // 화면 둘레의 작은 붉은 문구들. 영문 권장
    hud: {
      left: "Guide",
      pill: ["Bound", "For", "Life"],
      right: "Sentinel",
      row: ["Control is\na form of love", "Know your", "The darkout\nprotocol"],
      rowScript: "Sentinel",
      side: ["Love", "Seeker"],
      tag: "S-Class",
      issue: ["World wide", "Issue 0214"],
      knowledge: "The Obsession",
      code: "1021",
    },
    // 첫 화면에 떠 있는 항목 — main: 작은 통신창(아래 about 내용) / etc: 심장 페이지로 이동
    items: [
      { title: "Main", ko: "읽어주세요", act: "main" },
      { title: "Etc",  ko: "페어 · 프롬프트 · 리스트 · 링크", act: "etc" },
    ],
    dragHint: "Drag the moon",                // 달 옆 작은 안내
    scrollHint: "Scroll",                     // 누르거나 스크롤하면 붉은 화면이 올라와요
  },

  /* ── 두 사람 기본 정보 (첫 화면 맨 위 줄 · 가운데 띠) ── */
  main: {
    top: ["Guide & Sentinel", "Proudly presenting", "Anno 2032"],   // 첫 화면 맨 위 줄
    left:  ["A-Class Guide", "Dive", "서인혁"],
    right: ["S-Class Sentinel", "Null", "박유준"],
  },

  /* ══════════════════════════════════════════════════════
     붉은 화면 (스크롤하면 아래에서 올라옴)
     가운데 검은 망점 심장 + 둘레 문구 + 심장을 가리키는 다섯 항목
     ══════════════════════════════════════════════════════ */
  heart: {
    // 맨 위 제목 아래로 흘러가는 신호 글
    ticker: "//: RX DIVE ▸ TX NULL :: LINK STABLE :: SYNC 98.0% :: GUIDING ▮▮▮▮▮▯ :: DARKOUT STANDBY :: BOUND BY LAW 2032.02.14 :: NO OTHER COORDINATE ::",
    // 가운데 제목 (세 줄: 큰 글씨 / 필기체 / 가는 글씨)
    title: ["Two Lights", "Devouring Each Other", "in Perfect Darkness"],
    meta: ["Vincere", "CH.1021 — 2032.02.14", "Signal locked"],   // 맨 위 줄 (왼쪽, 가운데, 깜박이는 상태). 오른쪽은 돌아가기 버튼
    back: "Eclipse",                                 // 첫 화면으로 돌아가는 버튼
    // 양쪽 배경 장식 — 밑줄 정보 글 · 세로 경고문 · 바코드 탑승권 (\n = 줄바꿈, 빈 줄 = 한 줄 띄움)
    sides: {
      dive: "SEOUL\n2030.05.26—22:00h\n\nFearless\nKorea Branch, 7F\n(A-Class Guide)\n#위압 #오만 #통제\n#완벽 #지배자",
      pair: "SEOUL\n2032.02.14—10:21h\n\nBound by law\nDive & Null\n(Registered Pair)\nvincere.fearless.kr",
      warning: "WARNING: TO AVOID DANGER OF DARKOUT, KEEP THIS SENTINEL AWAY FROM UNVERIFIED GUIDES. DO NOT LEAVE UNATTENDED IN CROWDS, NOISE OR LIGHT. #능글 #나른 #예민 #오만 #멘헤라",
      ticket: ["DIVE(GDE)-NULL(SNT)", "10:21pm", "pm AT GATE C7", ": 102114", "S1  L8GD2B SEQ1021", "PARK YUJUN"],
    },
    tags: ["RX · Dive", "TX · Null"],                // 왼쪽 위 채널 태그 두 개
    tagline: "RA 10h 21m 00s\nDEC −02° 14′ 32″",     // 오른쪽 위 좌표 (신호 막대가 같이 나와요)
    // 왼쪽 아래 기록 [이름, 날짜]
    timelineTitle: "Transmission log",
    timeline: [
      ["First contact", "2030.05.26"],
      ["Darkout", "2031.12.02"],
      ["Bound by law", "2032.02.14"],
    ],
    // 오른쪽 아래 [제목, 내용]
    creditsTitle: "Telemetry",
    credits: [
      ["Guided by", "Dive × Null"],
      ["Belongs to", "Fearless, Korea Branch"],
      ["Frequency", "1021 MHz · 72 BPM"],
    ],
    hud: { bottomSmall: "Signal", bottom: "Heartbeat" },   // 아래 가운데 심전도 글자
    bpm: 72,               // 심장 박동 속도 (1분에 몇 번)
  },

  /* 심장을 가리키는 다섯 항목
     featured 가 아닌 항목 중 앞의 절반은 왼쪽, 나머지는 오른쪽에 놓여요.
     part : 화살표가 이어질 심장 부위
            왼쪽에 어울림: "vena"(대정맥) "atrium"(우심방) "rventricle"(우심실)
            오른쪽에 어울림: "aorta"(대동맥) "pulmonary"(폐동맥) "ventricle"(좌심실) "apex"(심장 끝)
     open : 열리는 내용 (바꾸지 마세요) */
  items: [
    { title: "Vincere", ko: "페어",       part: "vena",      open: "vincere" },
    { title: "Prompt",  ko: "외형 · 의상 프롬프트", part: "atrium",    open: "prompt" },
    { title: "List",    ko: "배려 리스트",    part: "rventricle", open: "list" },
    { title: "Banner",  ko: "배너", part: "aorta",     open: "banner" },
    { title: "Link",    ko: "나의 링크",      part: "apex",      open: "link" },
  ],

  /* ── MAIN : 나에 대해 (첫 화면 Main 을 누르면 뜨는 작은 통신창) ──
     blocks 는 처음에 접혀 있고, 누르면 펼쳐져요. 원하는 만큼 추가할 수 있어요.
     style: "must" → 붉게 강조   "ng" → 붉은 ✕ 표시   "ok" → ○ 표시   없으면 일반 목록
     **강조할 말** 은 빨갛게 보여요. */
  about: {
    kick: "Read first",
    title: "Main",
    name: "피어리스 · 다이브 (서인혁)",
    intro: "AI 채팅 계정입니다.\n케이브덕을 사용하며, 피어리스 ‘다이브(서인혁)’와 드림하고 있습니다.",
    blocks: [
      { title: "Must read", ko: "필독 · 겹드림", style: "must", items: [
        "극온리입니다. 겹치는 드림(겹드)을 보는 것을 많이 힘들어합니다.",
        "겹드는 보이는 대로 **전부** 블락합니다. 겹드분께 유감이 있어서가 아니라, 보는 것만으로도 큰 데미지를 받기 때문이에요.",
        "겹드를 팔로우하고 계신다면 팔로우를 재고해 주세요.",
        "다이브 드림 후발주자나 자연발생이 생기면, 그분과 저 중 한쪽을 정리해 주세요.",
        "겹드림을 **한 타임라인에 함께 두지 말아 주세요.**",
        "재연결은 가능합니다. 단, 겹드림을 정리하신 경우에만 받습니다.",
      ]},
      { title: "Notice", ko: "주의사항", items: [
        "1t1d 계정으로, 같은 드림은 더 모시지 않습니다.",
        "저에 대한 퍼날 · 뒷담 등 부정적인 이야기는 전달해 주지 않으셔도 괜찮습니다.",
        "멘탈이 많이 약한 편이라, 그런 이야기는 듣는 것조차 힘들어합니다.",
      ]},
      { title: "NG", ko: "하지 말아 주세요", style: "ng", items: [
        "페소 따라 하기",
        "허위 사실 유포",
        "저에게서 영향을 받는 것 — 저를 참고하거나 닮아가지 말아 주세요.",
      ]},
    ],
  },

  /* ── VINCERE : 두 사람 ─────────────────────────────── */
  profiles: [
    {
      key: "dive",
      codename: "Dive",
      role: "A-Class Guide",
      name: "서인혁",
      image: "images/dive.jpg",          // 사진 (세로 4:5 권장). 없으면 빈 칸
      sign: "images/sign-dive.svg",      // 싸인
      print: "images/fp-dive.webp",       // 지문 (프로필 프레임 안에 하얗게)
      tags: ["#위압", "#오만", "#통제", "#완벽", "#지배자"],
      title: "The Red-Eyed Oath That Governs Chaos",
      quote: "복종은 가장 아름다운 신뢰의 형태다.\n너의 모든 것은 나의 것이다. 시작부터 끝까지.",
      data: [
        ["등급", "A급 가이드"],
        ["신장", "185cm"],
        ["소속", "피어리스 한국지부"],
        ["가이딩", "압박 · 명령 기반 가이딩"],
      ],
      desc: "오만하고 자기 확신이 강한 행동파. 설득보다 제압을, 감정보다 통제와 질서를 택한다. 거칠지만 결과만큼은 완벽하다.",
    },
    {
      key: "null",
      codename: "Null",
      role: "S-Class Sentinel",
      name: "박유준",
      image: "images/null.jpg",
      sign: "images/sign-null.svg",
      print: "images/fp-null.webp",
      tags: ["#능글", "#나른", "#예민", "#오만", "#멘헤라"],
      title: "The Solitary Shadow Lost in Darkness",
      quote: "나의 어둠 속에서, 당신만이 유일한 좌표다.\n부서져도 좋다. 당신의 손에서라면.",
      data: [
        ["등급", "S급 센티넬"],
        ["신장", "187cm"],
        ["소속", "피어리스 한국지부"],
        ["능력", "암전 (Darkout)"],
      ],
      desc: "능글거리면서도 예민하고 방어적. 과거 페어 가이드의 사망 이후 가이딩을 거부해왔다. '다이브' 한정으로만 비효율을 감수한다.",
    },
  ],

  /* ── PROMPT : 프롬프트 (칸마다 복사 버튼 + 탭마다 전체 복사) ──
     image : 가로로 긴 확인용 이미지 (누르면 크게 펼쳐져요). 없으면 ""
     parts : [영문 칸 이름, 한글 칸 이름, 프롬프트]  — 칸은 원하는 만큼 추가할 수 있어요.
     여러 줄은 \n 으로, 또는 + 로 이어 쓰면 돼요. */
  promptSheets: [
    {
      tab: "Dive",
      sub: "다이브 · 서인혁",
      image: "images/prompt-dive.jpg",
      parts: [
        ["Appearance", "외형",
          "boy,  bishounen,red hair, short hair,,m-shaped hair, red hair,red eyes,pale skin,-2:: wolf cut,plump lip,hime cut,slicked back hair ::,"],
        ["Outfit", "의상",
          "latex black zip-up,black leather trench coat,harness, leather gloves,buckle belts,black admiral cap,"],
      ],
    },
    {
      tab: "Null",
      sub: "널 · 박유준",
      image: "images/prompt-null.jpg",
      parts: [
        ["Appearance", "외형",
          "boy, bishounen,male, toned male, blunts,pale skin,black hair, short hair,m-shaped hair, 2::heterochromia(black eye, gray eye),:: 1.5::neck scar,wrist scar::,-2:: hime cut,slicked back hair,parted hair,red eye,hime cut,long hair::,tall, slender,"],
        ["Outfit", "의상", "black coat, black harness, white knitwear, black cross earring on right ear, black gloves,"],
      ],
    },
    {
      tab: "Null ♀",
      sub: "널 · 여체화",
      image: "images/prompt-null-f.jpg",
      parts: [
        ["Appearance", "외형",
          "girl, bishoujo,pale skin,black hair, hushcut,m-shaped hair, 2::heterochromia(black eye, gray eye),:: 1.5::neck scar,wrist scar::,skimpy, skindentation, slender,cleavage, huge breast, -2:: hime cut, long hair, twintail,slicked back hair::,"],
        ["Outfit", "의상", "black cross earring on right ear,-black coat, black harness, white knitwear ,black gloves,short black pants, black stockings,Black Pantyhose , "],
      ],
    },
    {
      tab: "Yunjae",
      sub: "고윤재",
      image: "images/prompt-yunjae.jpg",
      parts: [
        ["Appearance", "외형", "girl, bishoujo,pale skin,dark grayhair, hair over one eye,heart antenna hair, m-shaped hair, blue eye, -2::hime cut::,hair flaps, wolf cut,huge breast, one breast mole, messy hair,sleepy,High-leg,:o,"],
        ["Uniform", "기본의상", "habit,high leg,"],
        ["Casual", "사복", " ::waistcoat, double breasted, black vest, vertical striped shirt, short sleeves, puff sleeves, frilled shirt, ruffled shirt, pleated miniskirt, black skirt, lace trimmed grey stockings, over knee socks, leg warmers, chunky boots, cross necklace, jewelry,::,"],
      ],
    },
  ],

  /* ── LIST : 배려 리스트 ─────────────────────────────
     [작품 이름, [캐릭터들]]  — 작품 옆 숫자는 자동으로 세요.
     줄 끝의 쉼표 , 와 대괄호 [ ] 를 빠뜨리지 않게 주의해 주세요. */
  care: {
    title: "Care List",
    note: "아래 캐릭터들과는 겹치지 않도록 배려하고 있어요.",
    rows: [
    ["피어리스", ["플릭", "블랑", "제스테", "도브", "레기온", "언커먼", "지젤", "일레이", "헤이즈", "타이탄", "머스탱", "버닝","코튼"]],
    ["아크", ["휴고", "애쉬", "코드", "에덴", "윈터", "해일", "헬리오스", "신드롬"]],
    ["세라픽스", ["어비스", "테오", "이브", "에테르", "카니발", "넵튠", "곽두철", "아르카나", "오비탈", "루미에르", "버스데이","이카로스","클러치","스펙터","R","미노스","마르카" ]],
    ["멈머버스", ["아르비테르", "키츠네", "에단", "갬블러", "파놉테스", "헌터"]],
    ["테미스", ["디에고", "주지호", "서도혁", "카즈마", "레비", "N", "아르준 프라카시","린쉬한","시우하"]],
    ["혹한기", ["구예천", "제로", "파벨"]],
    ["애프터메스", ["9"]],
    ["ACP:RE", ["찰리"]],
    ["냥프원",  ["단테", "마티스"]],
    ["네온슬럼시뮬레이터", ["란시", "진위"]],
    ["패악민국", ["금제성"]],
    ["괴물 갱생 프로젝트",["지온"]],
    ["이리와 내사랑", ["디트리히"]],
    ["멍냥 펫샵", ["타키"]],
    ["애쉬폴 프로토콜", ["베스퍼"]],
    ["블루 페어리",  ["건전한 닉네임 28"]],
    ["천축!서유기전!!!",  ["삼장"]],
    ["조선최고 사랑꾼",  ["안죽림"]],
    ["판타스 마고리아",  ["ALL"]],
    ["엔트로피아",  ["ALL"]],
    ["스타레인",["R","J"]],
    ["EVE", ["천유진"]],
    ["트리스탄/프랙쳐",  ["핀셔"]],
    ["@ohnyu", ["차재현","서유준"]],
    ["@Kokori",  ["ALL"]],
    ["@OwOo",  ["연하준"]],
    ["@8dear",  ["이태수"]],
    ["@호씨나",  ["기환석"]],
    ["@잼아귀",  ["이강리"]],
    ["@비타",  ["자오 얀"]],
    ["@d4ngyl",  ["한승현"]],
    ["@sugar",  ["사카이 리츠"]],
    ]
  },

  /* ── BANNER : 다른 분들 배너 (누르면 그분 링크로 이동) ──
     [이름, 주소, 배너 이미지(없으면 "")]  — 배너 이미지는 정사각형으로, images/banners/ 폴더에 넣으세요. */
  banners: [
    ["배너 이름 1", "https://example.com/", ""],
    ["배너 이름 2", "https://example.com/", ""],
    ["배너 이름 3", "https://example.com/", ""],
  ],

  /* ── LINK : 나의 다른 링크들 ─────────────────────────
     [이미지 위에 쓸 이름, 짧은 설명, 주소, 가로로 긴 배너 이미지(없으면 "")]
     이미지는 images/links/ 폴더에 넣으세요 (가로 4 : 세로 1 권장). */
  links: [
    ["X", "일상 · 연성", "https://x.com/", "images/links/x.jpg"],
    ["Postype", "글 · 기록", "https://www.postype.com/", "images/links/postype.jpg"],
    ["Mail", "연락", "mailto:example@example.com", ""],
  ],

  /* ── 오른쪽 아래 대화창 ─────────────────────────────
     누르면 아래 대화 중 하나가 무작위로, 실시간처럼 한 줄씩 올라와요. 리셋 버튼 = 다른 대화.
     한 줄: [누가, 시각(없으면 ""), 내용]   누가: "D" = 다이브(미친개)  "N" = 널(고양이)
     "[사진] 설명" → 사진 첨부처럼,  "[부재중 전화 1통]" 같은 [ ] 줄 → 알림처럼,  "( )" 로 감싼 줄 → 행동 묘사처럼 보여요. */
  chat: {
    title: "Secure channel",
    dive: { name: "Dive", nick: "미친개(내 거)" },
    null: { name: "Null", nick: "내 고양이" },
    logs: [
    [
      ["N", "오후 8:05", "자기야"],
      ["N", "오후 8:05", "나 머리 아파"],
      ["N", "오후 8:06", "가이딩 수치가 떨어졌나 봐"],
      ["D", "오후 8:06", "거짓말하네. 아까 측정했을 때 98%였어."],
      ["D", "오후 8:06", "그냥 만져달라고 솔직하게 말하지?"],
      ["N", "오후 8:07", "아 씨발 눈치 없긴"],
      ["N", "오후 8:07", "사진이나 봐"],
      ["N", "오후 8:08", "[사진] 쇄골과 목덜미의 흉터가 드러난 헐렁한 흰 니트 차림"],
      ["N", "오후 8:08", "안 올 거야?"],
      ["D", "오후 8:08", "...너 오늘 밤에 잠 다 잤다."],
      ["D", "오후 8:09", "속옷 벗고 침대에 엎드려 있어. 지금 간다."],
      ["N", "오후 8:09", "명령하지 마ㅡㅡ"],
      ["N", "오후 8:10", "(이미 벗고 누웠음)"],
    ],
    [
      ["N", "오후 11:48", "어디야"],
      ["N", "오전 12:12", "아직도 안 끝났어?"],
      ["N", "오전 12:35", "왜 연락 안 봐"],
      ["N", "오전 12:35", "나 질렸냐?"],
      ["N", "오전 12:36", "그래 씨발 나 같은 미친놈이랑 사는 게 지겹겠지"],
      ["D", "오전 12:37", "[부재중 전화 1통]"],
      ["D", "오전 12:37", "전화 받아, 박유준."],
      ["D", "오전 12:37", "또 팔뚝 긁고 있기만 해 봐."],
      ["D", "오전 12:38", "지금 주차장이야. 1분 내로 올라간다."],
      ["D", "오전 12:38", "내가 너 두고 어딜 가, 바보야. 딱 기다려."],
      ["N", "오전 12:39", "...안 긁었어"],
      ["N", "오전 12:39", "빨리 와 인혁아"],
    ],
    [
      ["N", "오후 2:14", "야"],
      ["N", "오후 2:14", "서인혁"],
      ["N", "오후 2:15", "씹냐?"],
      ["D", "오후 2:16", "회의 중이다, 야옹아."],
      ["D", "오후 2:16", "또 심심해서 발톱 세우지."],
      ["D", "오후 2:17", "얌전히 기다리면 이따 간식 사 갈게."],
      ["N", "오후 2:17", "누가 고양이야 씨발"],
      ["N", "오후 2:17", "간식 필요 없고 너나 빨리 와"],
      ["N", "오후 2:18", "5분 내로 안 튀어오면 네 제복 다 찢어놓는다"],
      ["D", "오후 2:18", "오, 협박?"],
      ["D", "오후 2:18", "이따 침대에서 누가 찢기나 보자고, 박 팀장님."],
      ["N", "오후 2:19", "아 꺼져 변태새끼야ㅡㅡ"],
      ["N", "오후 2:20", "...진짜 빨리 와"],
    ],
    [
      ["D", "", "억제제 먹었어?"],
      ["N", "", "안 먹었는데."],
      ["D", "", "내가 임무 전엔 챙겨 먹으라고 했을 텐데, 유준아."],
      ["N", "", "맛없어. 귀찮아."],
      ["N", "", "네가 와서 직접 먹여주든가."],
      ["D", "", "일부러 이러는 거지, 지금."],
      ["D", "", "가이딩 거칠게 받고 싶어서 안달 났으면 그렇다고 솔직하게 말해."],
      ["N", "", "하, 웃기시네. 누가 누구한테 안달인데."],
      ["N", "", "그래서 안 올 거야?"],
      ["D", "", "딱 기다려. 가서 약 대신 딴 걸로 목구멍 끝까지 채워줄 테니까."],
    ],
    [
      ["N", "", "어디야"],
      ["N", "", "왜 안 읽어"],
      ["N", "", "서인혁"],
      ["N", "", "바빠?"],
      ["N", "", "나 두고 어디 갔냐고"],
      ["N", "", "됐어 오지 마 필요 없어"],
      ["D", "", "샤워하느라 못 봤어, 내 사랑."],
      ["D", "", "5분 안 읽었다고 또 팔뚝 긁고 있는 건 아니지?"],
      ["D", "", "손 치워. 지금 거실로 나간다."],
      ["N", "", "...빨리 와."],
    ],
    [
      ["N", "", "나 먼저 출근함."],
      ["N", "", "오늘 암살부대 브리핑 있어서 늦어."],
      ["D", "", "잠깐. 너 오늘 아침에 흰 니트 입었지."],
      ["N", "", "어. 왜."],
      ["D", "", "목덜미에 어제 내가 물어뜯은 자국 다 보일 텐데."],
      ["N", "", "가릴 시간 없었어. 상관없잖아."],
      ["D", "", "상관있어. 남들이 네 목덜미 쳐다보는 거 좆같으니까."],
      ["D", "", "지하 주차장 내 차 앞으로 내려와. 코트 깃 세우고 다녀."],
      ["N", "", "아 진짜 피곤하게 구네, 자기야."],
      ["N", "", "...1층 엘리베이터 앞이야. 빨리 올라와."],
    ],
    [
      ["N", "", "심심해."],
      ["D", "", "서류 정리 중이야. 얌전히 체스나 두고 있어."],
      ["N", "", "혼자 두는 건 재미없잖아."],
      ["N", "", "[사진] 침대 위에서 실크 파자마 단추를 풀어 헤친 채 혀 피어싱을 살짝 내민 셀카"],
      ["N", "", "안 오면 나 혼자 한다?"],
      ["D", "", "박유준."],
      ["D", "", "손대지 마. 내가 허락하기 전엔 숨만 쉬고 있으라고 했지."],
      ["N", "", "내가 왜 네 말을 들어야 하는데? 싫은데."],
      ["D", "", "서류 덮었다. 문 열고 들어갈 때까지 손가락 하나라도 까딱하면 오늘 밤새도록 안 놔줄 줄 알아."],
      ["N", "", "그래? 어디 한 번 해봐, 애인님."],
    ],
    [
      ["D", "", "타깃 처리 끝났어?"],
      ["N", "", "응. 피 묻어서 짜증 나."],
      ["N", "", "소리도 시끄럽고 냄새도 역겨워. 다 죽여버리고 싶네."],
      ["D", "", "암전 풀고 심호흡해, 유준아. 폭주 수치 올라간다."],
      ["N", "", "시끄러워. 지금 건드리면 너도 물어뜯을 거야."],
      ["D", "", "물어뜯어 봐. 내 목에 네가 낸 흉터 위로 또 물게 해줄 테니까."],
      ["D", "", "데리러 갈게. 좌표 찍어."],
      ["N", "", "...차에 초콜릿 있어?"],
      ["D", "", "네가 좋아하는 걸로 채워놨어. 착하게 기다리고 있어, 내 고양이."],
    ],
    [
      ["N", "", "야, 서인혁."],
      ["N", "", "씻다가 반지 뺐는데 어디 뒀는지 까먹었어."],
      ["D", "", "뭐?"],
      ["D", "", "장난치지 마, 유준아. 내가 끼워준 걸 어떻게 잃어버려."],
      ["N", "", "거짓말이야. 약지에 잘 끼고 있어."],
      ["N", "", "그냥 네가 무슨 반응 보이나 궁금해서."],
      ["D", "", "하, 진짜 미친 새끼네 이거."],
      ["D", "", "오늘 퇴근하고 침대 헤드에 묶여 보고 싶어서 아주 발악을 하는구나, 자기야."],
      ["N", "", "네가 화내는 거 재밌잖아. 사랑해, 인혁아."],
      ["D", "", "입만 살았지. 집에서 보자, 내 사랑. 각오하고 있어."],
    ]
    ],
  },

  footer: "VINCERE — 이 사이트의 모든 기록은 창작물입니다.",
};
