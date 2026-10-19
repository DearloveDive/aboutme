# VINCERE : the eclipse — DIVE × NULL

고딕 블랙레터 콘셉트의 페어 전시 사이트입니다.
빌드 도구 없이 파일만으로 돌아가서, 고치고 저장한 뒤 GitHub에 올리면 바로 반영돼요.

---

## 폴더 구조

```
vincere/
├─ index.html        ← 건드릴 필요 없음
├─ content.js        ← ✏️ 글자·링크·이미지 경로는 전부 여기서 수정
├─ images/           ← 🖼 그림 파일을 여기에 넣기
├─ assets/
│  ├─ style.css      ← 색을 바꾸고 싶을 때 맨 위 :root 부분만
│  ├─ app.js         ← 건드릴 필요 없음
│  └─ fonts/         ← 글꼴 (Angel Wish 블랙레터 포함)
└─ .nojekyll         ← GitHub Pages용 (지우지 마세요)
```

## 미리보기

`index.html` 을 더블클릭하면 브라우저에서 바로 열려요.
수정 → 저장 → 브라우저 새로고침(F5) 하면 바로 확인됩니다.



## 사이트 구성

**시작 연출 (약 8초)**: 검은 화면에 개기일식 중인 달의 붉은 코로나 → 점이 하나 둘 반짝이며 3D 망점 달 → 붉은 연결선 → 로고가 우주 신호 잡히듯 나타남 → 둘레 글자 도도독 타이핑.

**오른쪽 아래 대화창**: 누르면 다이브 · 널의 대화가 실시간처럼 한 줄씩 올라와요(`chat.logs` 중 무작위). ↻ 버튼 = 다른 대화, − = 최소화.

**첫 화면**
- 떠 있는 항목 `Main` · `Etc` (`intro.items`). Main → 작은 우주 통신창(`about`, 주의사항 · NG · OK 는 접혀 있고 눌러서 펼침). Etc → 심장 페이지.
- 가운데 3D 망점 달. 마우스로 끌거나 손가락으로 밀면 3D로 돌아가요.
- 로고는 몇 초마다 가늘게 신호 노이즈처럼 흔들려요.
- D+ 는 오른쪽 아래에 작게, 밀리초까지 실시간. 시작 날짜는 `content.js` 의 `intro.since`.
- 누를 수 있는 것이 없는 빈 곳을 누르면 지지직 노이즈 (심장 페이지 글자들도 함께 흔들려요). 6초 안에 5번 잘못 누르면 ERROR 가 화면을 채웠다 사라져요.

**붉은 화면**: 스크롤(또는 SCROLL 누르기, 위로 밀기)하면 아래에서 올라와요. 첫 화면과 같은 배치로 둘레 문구가 있고, 가운데 작은 검은 망점 심장이 두근거리며 제목 "Two Lights Devouring Each Other in Perfect Darkness" 가 겹쳐 있어요. 심장 부위에서 다섯 항목으로 화살표가 이어지고, 항목이나 심장의 번호를 누르면 상세창이 떠요. 위로 스크롤하거나 오른쪽 아래 `Eclipse` 를 누르면 돌아가요.

| 항목 | 상세창 | `content.js` 에서 고칠 곳 |
|---|---|---|
| Vincere | 다이브 · 널 소개 (사진, 영문 제목, 문구, 등급 · 신장 · 소속 · 가이딩/능력, 설명) + 아래 프롬프트 바로가기 | `profiles` |
| Prompt | Dive / Null / Null ♀ / Yunjae 탭(칸은 `parts` 로 자유롭게), 가로 확인용 이미지(누르면 펼침), 외형 · 의상 칸마다 복사 버튼 + 전체 복사 | `promptSheets` |
| List | 배려 리스트 (작품 · 영문 · 캐릭터, 숫자 자동) | `care` |
| Banner | 다른 분들 배너, 누르면 그 링크로 이동 | `banners` |
| Link | 가로 배너 이미지 위에 링크 이름, 누르면 이동 | `links` (이미지는 `images/links/`) |

- 제목 · 맨 위 줄 · 태그 · 말풍선 · Timeline · Credits: `heart`. 항목 이름 · 순서 · 이어지는 심장 부위: `items`.
- 사진 `images/dive.jpg`, `images/null.jpg` 를 넣으면 Vincere 창에 나와요. 배너 이미지는 `images/banners/` 에 넣고 `banners` 에 경로를 적어요 (정사각형).

## 이미지 — `images/`

| 파일 | 쓰는 곳 |
|---|---|
| `sign-dive.svg`, `sign-null.svg` | 다이브 · 널 싸인 — 심장 페이지 양쪽, Vincere 창 |
| `fp-dive.webp`, `fp-null.webp` | 다이브 · 널 지문 — 심장 페이지 양쪽 배경 |
| `logo.webp` | 로고 (배경 투명) — 첫 화면. PNG 로 바꾸고 싶으면 `content.js` 의 경로도 같이 바꿔요 |
| `dive.jpg`, `null.jpg` | (넣어주세요) 상세창 프로필 사진, 세로 4:5 |

같은 이름으로 바꿔 넣으면 그대로 교체돼요. 로고·달은 배경이 투명한 PNG여야 해요.

## 글꼴

| 자리 | 글꼴 |
|---|---|
| 큰 대문자 (VINCITUR, 메뉴, 이름) | Belligoes |
| 필기체 (Qui vincit, Enter the eclipse) | Beauty Angelique |
| 작은 영문 라벨 | Archivo (무료, SIL OFL) |
| 가는 세리프 (THE OBSESSION) | Bodoni Moda (무료, SIL OFL) |
| 한글 | Noto Serif KR, Pretendard |

`assets/style.css` 맨 위 `--f-caps`, `--f-script`, `--f-label` 에서 바꿀 수 있어요. Belligoes·Beauty Angelique 는 개인 사용 전용 라이선스예요.

## 글 수정하기 — `content.js`

메모장, VS Code 등 아무 편집기로 열어서 따옴표 `" "` 안의 글자만 바꾸면 됩니다.

| 쓰는 법 | 결과 |
|---|---|
| `**강조**` | 붉은색 강조 |
| `[[숨길 말]]` | 검은 줄 검열. 방문자가 누르면 보임 |
| `\n` | 줄바꿈 |

- 따옴표나 끝의 쉼표 `,` 를 실수로 지우면 화면이 비어 보여요. 그럴 땐 방금 고친 곳을 확인하세요.

## 색 바꾸기 — `assets/style.css`

파일 맨 위 `:root { ... }` 안의 `--black`, `--red`, `--white` 같은 값만 바꾸면 사이트 전체에 적용돼요.

---

## GitHub에 올리기 (처음 한 번)

1. GitHub에서 **New repository** → 이름 입력(예: `vincere`) → **Public** → Create.
2. 만들어진 저장소 화면에서 **uploading an existing file** 클릭.
3. `vincere` 폴더 **안의 내용물 전부**(index.html, content.js, assets, images, .nojekyll)를 끌어다 놓고 **Commit changes**.
   - `.nojekyll` 은 숨김 파일이라 안 보일 수 있어요. 없어도 대부분 동작하지만, 보이면 같이 올려주세요.
4. 저장소의 **Settings → Pages** → Source: **Deploy from a branch** → Branch: **main**, 폴더 **/ (root)** → Save.
5. 1~2분 뒤 `https://내아이디.github.io/vincere/` 에서 사이트가 열려요.

## 수정한 뒤 다시 올리기

- **웹에서**: 저장소에서 고칠 파일(예: `content.js`) 클릭 → 연필 아이콘 → 수정 → Commit changes. 이게 제일 간단해요.
- **파일째 교체**: Add file → Upload files 로 같은 이름 파일을 다시 올리면 덮어써져요. 그림 추가도 `images` 폴더에 들어가서 Upload files.
- **GitHub Desktop 사용 시**: 폴더에서 저장 → GitHub Desktop에서 Commit → Push origin.

반영까지 보통 1분 정도 걸리고, 안 바뀌어 보이면 강력 새로고침(Ctrl+Shift+R / Cmd+Shift+R) 하세요.


## 창 옮기기
상세창 · Main 통신창 · 대화창은 맨 위 줄을 마우스(손가락)로 잡고 끌면 옮겨져요.

## 양쪽 배경 장식
심장 페이지 양쪽의 밑줄 정보 글 · 세로 경고문 · 바코드 탑승권은 `content.js` 의 `heart.sides` 에서 바꿔요. (바코드 무늬는 탑승권 글자로 자동 생성)

## 가볍게 만든 것
- 로고 · 지문은 WebP, 쓰지 않는 그림 · 글꼴은 삭제했어요.
- 3D 달 · 심장 점 데이터를 압축했고, 심장 데이터는 첫 화면이 다 뜬 뒤에 따로 불러와요.
- 붉은 화면이 열려 있을 땐 달을 멈추고, 닫히면 심장을 멈춰요. 모바일은 심장 점을 절반만 그려요.

## 파비콘
`images/favicon.svg` (빨간 초승달). 휴대폰 홈 화면용은 `favicon-180.png`.
