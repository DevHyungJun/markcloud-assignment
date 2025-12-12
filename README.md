# 다국가 상표 검색 서비스

## 프로젝트 개요

다국가 상표 검색 서비스는 여러 국가(한국, 미국 등)의 상표 데이터를 통합 검색하고 비교 분석할 수 있는 웹 애플리케이션입니다. 상표명, 출원번호, 출원일, 등록 상태 등 다양한 조건으로 검색할 수 있으며, 상세 정보 확인, 즐겨찾기 기능, 그리고 국가별 데이터의 시각적 통계 분석을 제공합니다.

<img width="1900" height="1900" alt="메인 페이지" src="https://github.com/user-attachments/assets/4a11caa9-3fac-4d6d-ae9d-b67c4c06bd98" />

<img width="1900" height="1900" alt="통계 페이지" src="https://github.com/user-attachments/assets/3b097be9-02dd-4f3f-8da0-6eee0bd62df2" />

<img width="1900" height="1900" alt="즐겨찾기 페이지" src="https://github.com/user-attachments/assets/c2291194-4bdc-4038-9242-aec4b7111ebb" />

<img width="1900" height="1900" alt="상세 모달" src="https://github.com/user-attachments/assets/26a0f1e6-9e31-481a-9f2e-c9af32d829a4" />

## 배포 링크

https://markcloud-assignment.vercel.app/

## 기술 스택

### Frontend

- **React 19.2.0** - UI 라이브러리
- **TypeScript 5.9.3** - 타입 안정성
- **Vite 7.2.4** - 빌드 도구 및 개발 서버

### 상태 관리 & 데이터 fetching

- **Zustand 5.0.9** - 클라이언트 상태 관리 (필터, 정렬, 즐겨찾기)
- **React Query (@tanstack/react-query) 5.90.12** - 서버 상태 관리 및 캐싱

### 스타일링

- **Tailwind CSS 4.1.17** - 유틸리티 기반 CSS 프레임워크
- **tailwind-merge** - Tailwind 클래스 병합 유틸리티

### 라우팅

- **React Router DOM 7.10.1** - 클라이언트 사이드 라우팅

### 폼 관리

- **React Hook Form 7.68.0** - 폼 상태 관리 및 검증

### 차트

- **Recharts 3.5.1** - 데이터 시각화

### 테스트

- **Jest 29.7.0** - 테스트 프레임워크
- **React Testing Library 16.3.0** - 컴포넌트 테스트 유틸리티

### 기타

- **React Intersection Observer 10.0.0** - 무한 스크롤 구현

## 주요 기능

### 1. 상표 검색 및 필터링

- **국가별 검색**: 한국(KR), 미국(US) 상표 데이터 검색
- **상표명 검색**: 한글 및 영문 상표명 검색 (대소문자 구분 없음)
- **출원번호 검색**: 정확한 출원번호로 검색
- **상태 필터**: 등록, 출원, 거절, 실효 등의 상태별 필터링
- **날짜 범위 필터**: 출원일 기준 날짜 범위 검색

### 2. 정렬 기능

- 출원일 기준 최신순/오래된순 정렬

### 3. 페이지네이션 및 무한 스크롤

- 페이지당 10개 아이템 표시
- 무한 스크롤을 통한 편리한 데이터 탐색

### 4. 상표 상세 정보

- 모달을 통한 상표 상세 정보 확인
- 국가별 차이를 고려한 데이터 표시

### 5. 즐겨찾기

- 상표 즐겨찾기 추가/삭제
- localStorage를 통한 즐겨찾기 영구 저장
- 별도 즐겨찾기 페이지에서 관리

### 6. 통계 및 분석

- **상태별 분포 차트**: 국가별 등록 상태 통계
- **연도별 트렌드**: 연도별 출원 및 등록 추이
- **상품 분류별 통계**: 상품 분류별 상표 수 (Top 10)
- **등록 소요 기간 분석**: 출원일부터 등록일까지의 소요 기간 분포

## 프로젝트 구조

```
src/
├── components/          # 컴포넌트
│   ├── common/         # 공통 컴포넌트 (Button, Modal, Input 등)
│   ├── domain/         # 도메인별 컴포넌트
│   │   ├── Favorite/   # 즐겨찾기 관련
│   │   ├── Statistics/ # 통계 차트 컴포넌트
│   │   └── Trademark/  # 상표 검색/목록 관련
│   └── layout/         # 레이아웃 컴포넌트
├── hooks/              # 커스텀 훅
│   ├── useFavorites/   # 즐겨찾기 훅
│   └── useTrademarks/  # 상표 목록 훅
├── pages/              # 페이지 컴포넌트
│   ├── HomePage/       # 메인 검색 페이지
│   ├── FavoritesPage/  # 즐겨찾기 페이지
│   └── StatisticsPage/ # 통계 페이지
├── stores/             # 상태 관리 (Zustand)
│   └── trademarkStore/ # 상표 관련 전역 상태
├── utils/              # 유틸리티 함수
│   ├── adapters/       # 데이터 변환 (국가별 데이터 정규화)
│   ├── api/            # API 함수
│   ├── filters/        # 필터링 로직
│   ├── sortTrademarks/ # 정렬 로직
│   └── statistics/     # 통계 집계 로직
├── types/              # TypeScript 타입 정의
├── constants/          # 상수 정의
└── config/             # 설정 파일
```

### 테스트 커버리지

핵심 비즈니스 로직에 대한 테스트 코드를 작성했습니다:

- ✅ **유틸리티 함수 테스트**

  - `trademarkFilter.test.ts` - 필터링 로직 (22개 테스트)
  - `sortTrademarks.test.ts` - 정렬 로직 (7개 테스트)
  - `trademarkAdapter.test.ts` - 데이터 변환 로직 (15개 테스트)
  - `aggregateStatistics.test.ts` - 통계 집계 로직 (17개 테스트)

- ✅ **상태 관리 테스트**

  - `trademarkStore.test.ts` - Zustand 스토어 테스트 (15개 테스트)

- ✅ **커스텀 훅 테스트**
  - `useTrademarks.test.tsx` - 상표 목록 훅 테스트 (9개 테스트)
  - `useFavorites.test.tsx` - 즐겨찾기 훅 테스트 (8개 테스트)

**총 103개의 테스트 케이스가 모두 통과합니다.**

## 기술적 의사결정

### 1. 상태 관리 라이브러리 선택 근거

프로젝트의 상태 관리는 **Zustand**와 **React Query**를 조합하여 사용했습니다. 각 라이브러리의 선택 근거는 다음과 같습니다:

#### Zustand 선택 이유

- **Context API 대비**:
  - Context API는 Provider 중첩 문제 및 모든 구독 컴포넌트 리렌더링으로 성능 이슈 발생 가능
  - Zustand는 선택적 구독으로 필요한 컴포넌트만 리렌더링되어 성능 우수
  - 여러 Context를 분리해도 Provider 중첩이 복잡해지는 반면, Zustand는 단일 스토어로 관리 간편
- **경량성**: Redux에 비해 보일러플레이트가 적고 학습 곡선이 낮음
- **TypeScript 친화적**: 타입 추론이 우수하여 타입 안정성 확보 용이
- **간단한 API**: 상태 업데이트 로직이 직관적이고 간결
- **Persist 미들웨어**: localStorage 통합이 간단하여 즐겨찾기 영구 저장 구현 용이
- **필요한 기능만**: 필터, 정렬, 즐겨찾기 같은 클라이언트 상태 관리에 최적화

#### React Query 선택 이유

- **서버 상태 관리 특화**: 서버 데이터의 캐싱, 동기화, 리프레시를 자동 처리
- **효율적인 데이터 페칭**: 중복 요청 방지 및 자동 재시도 기능
- **캐싱 전략**: `staleTime`을 통한 불필요한 API 호출 최소화
- **에러 처리**: 에러 상태 관리 및 리트라이 로직 내장
- **로딩 상태**: 로딩 상태를 자동으로 관리하여 컴포넌트 코드 간소화

#### 상태 분리 전략

각 상태의 생명주기와 목적에 따라 역할을 명확히 분리했습니다:

- **React Query**: 서버 데이터 (상표 목록, 통계 데이터) - 캐싱, 동기화, 리프레시 필요
- **Zustand**: 클라이언트 UI 상태 (검색 필터, 정렬 옵션, 즐겨찾기) - 영구 저장 및 빠른 접근 필요

이러한 분리는 각 상태의 특성에 맞는 최적의 관리 방식을 제공하며, 코드의 명확성과 유지보수성을 향상시킵니다.

### 2. 다국가 데이터 처리 설계

과제의 핵심 요구사항인 "한국과 미국의 데이터 스키마 차이 처리"를 위해 **Adapter 패턴**을 활용한 데이터 정규화 전략을 채택했습니다.

#### 문제 분석

- 한국과 미국의 상표 데이터는 필드명, 값 형식, 필드 존재 여부 등에서 차이가 있음
- 상표명: 한국은 한글/영문 분리, 미국은 영문만
- 공고번호: 한국은 있음, 미국은 없음
- 등록공고: 한국은 있음, 미국은 없음
- 상품 분류: 한국은 유사군 코드, 미국은 US 코드
- 상태 값: 한국은 "등록", "출원" vs 미국은 "LIVE", "DEAD"

#### 해결 방안

**1) 공통 인터페이스 정의 (`NormalizedTrademark`)**

```typescript
export interface NormalizedTrademark {
  // 공통 필드
  displayName: string; // 표시용 상표명 (한국: 한글 우선)
  englishName: string | null; // 영문 상표명
  applicationNumber: string;
  applicationDate: string;
  status: TrademarkStatus; // 통일된 상태 타입

  // 국가별 차이를 옵셔널로 처리
  publicationNumber: string | null; // 한국만 존재
  registrationPubNumber: string | null; // 한국만 존재

  // 상품 분류 - 통일된 구조
  productCodes: {
    mainCodes: string[];
    subCodes: string[] | null; // 한국: 유사군 코드
    usClassCodes: string[] | null; // 미국: US 코드
  };

  country: Country;
  raw: KrTrademarkRaw | UsTrademarkRaw; // 원본 데이터 보관
}
```

**2) 어댑터를 통한 데이터 변환**

- `adaptKrTrademark`: 한국 원본 데이터 → `NormalizedTrademark`
- `adaptUsTrademark`: 미국 원본 데이터 → `NormalizedTrademark`
- 상태 값 매핑: 한국("등록", "출원") ↔ 미국("LIVE", "DEAD") → 공통 타입으로 변환

**3) 확장 가능성 고려**

- 새로운 국가(일본, 중국, 유럽 등) 추가 시 `adaptJpTrademark` 같은 함수만 추가하면 됨
- 기존 코드 변경 없이 확장 가능한 구조
- 타입 레벨에서 국가별 차이를 명확히 구분

#### 장점

- **일관성**: 모든 국가 데이터를 동일한 인터페이스로 처리하여 코드 중복 방지
- **유지보수성**: 국가별 차이점이 어댑터에 집중되어 변경 영향도 최소화
- **타입 안정성**: TypeScript로 국가별 원본 타입과 정규화된 타입을 명확히 구분
- **확장성**: 새로운 국가 추가 시 기존 로직 수정 없이 어댑터만 추가

### 3. 공통 컴포넌트 설계

다국가 데이터를 효율적으로 처리하고 추후 확장 가능성을 고려하여 다음과 같이 설계했습니다:

#### 구조

```
components/
├── common/              # 재사용 가능한 공통 컴포넌트
│   ├── Button/
│   ├── Modal/
│   ├── Input/
│   └── ...
├── domain/              # 도메인별 컴포넌트
│   ├── Trademark/       # 상표 관련 (국가별 차이 처리)
│   │   ├── TrademarkDetailModal/  # 국가별 필드 조건부 렌더링
│   │   └── TrademarkListItem/     # 통일된 인터페이스로 표시
│   ├── Favorite/
│   └── Statistics/
└── layout/
```

#### 국가별 차이 처리 방식

**1) 상세 정보 모달 (`TrademarkDetailModal`)**

- `fieldConfig.ts`: 국가별로 표시할 필드를 설정으로 정의
- `shouldShowField()`: 국가 메타데이터를 기반으로 필드 표시 여부 결정
- 한국: `publicationNumber`, `registrationPubNumber` 등 표시
- 미국: 해당 필드 자동 숨김 처리

**2) 리스트 아이템 (`TrademarkListItem`)**

- `NormalizedTrademark` 인터페이스를 통해 일관된 데이터 접근
- 국가별 차이를 내부적으로 처리하여 외부 컴포넌트는 동일한 props 사용

**3) 통계 차트 (`StatisticsContent`)**

- 동적 국가 필드 생성으로 여러 국가 지원
- `aggregateStatistics.ts`에서 국가별 집계를 동일한 구조로 반환

#### 확장성 고려사항

- 새로운 국가 추가 시 `config/countryConfig.ts`에 메타데이터만 추가
- 컴포넌트는 국가 정보를 prop으로 받아 자동으로 적절한 UI 렌더링
- 어댑터 패턴으로 데이터 변환 로직만 추가하면 전체 시스템에 통합

### 4. 성능 최적화

- `useMemo`를 활용한 필터링/정렬 결과 메모이제이션으로 불필요한 재계산 방지
- React Query의 캐싱 기능으로 동일한 데이터에 대한 중복 API 호출 방지
- 무한 스크롤을 통한 점진적 데이터 로딩으로 초기 로딩 시간 단축

### 5. 스켈레톤 UI를 통한 로딩 상태 개선

- 데이터가 로드되는 동안 실제 콘텐츠와 유사한 구조의 스켈레톤 UI 표시
- Shimmer 애니메이션을 활용한 시각적 피드백 제공
- 로딩 상태와 데이터 표시 상태 간의 레이아웃 시프트(Layout Shift) 최소화
- 실제 UI와 동일한 구조를 가진 스켈레톤으로 사용자 경험의 일관성 유지

### 6. 반응형 디자인

- Tailwind CSS의 반응형 유틸리티 클래스(`sm:`, `md:`, `lg:`, `xl:`)를 활용하여 다양한 화면 크기 지원
- 모바일, 태블릿, 데스크톱에서 최적화된 레이아웃 및 사용자 경험 제공
- Grid와 Flexbox를 활용한 유연한 레이아웃 구성으로 모든 기기에서 정상 동작

### 7. 타입 안정성

- TypeScript를 활용한 엄격한 타입 정의로 런타임 에러 사전 방지
- 국가별 데이터 타입을 명확히 구분 (`KrTrademarkRaw`, `UsTrademarkRaw`)
- 공통 인터페이스와 원본 타입을 분리하여 타입 안정성과 유연성 동시 확보

### 8. 테스트 가능한 코드 구조

- 순수 함수로 작성된 비즈니스 로직 (필터링, 정렬, 집계)
- 의존성 주입을 통한 테스트 용이성 확보
- 핵심 비즈니스 로직에 대한 103개의 테스트 케이스 작성

## 문제 해결 과정

과제 진행 중 주요 문제와 해결 과정을 정리했습니다.

### 2. 복잡한 필터링 로직의 테스트

**문제**: 여러 조건을 조합한 필터링 로직의 테스트 케이스 작성이 복잡함

**해결**: 각 필터 조건을 독립적으로 테스트하고, 복합 조건 및 엣지 케이스를 별도 검증. 순수 함수로 설계하여 테스트 용이성 확보 (22개 테스트 케이스).

### 3. 통계 데이터 집계 로직의 복잡성

**문제**: 국가별 데이터를 동적으로 집계하는 로직이 복잡하고, 동적 키 생성 필요

**해결**: `Map` 자료구조를 활용한 효율적인 집계. 타입 안정성을 유지하면서도 동적 필드 생성 (`[country: string]: number` 인덱스 시그니처 사용). 각 집계 함수를 독립적으로 테스트하여 신뢰성 확보.

### 4. 즐겨찾기의 영구 저장

**문제**: Zustand의 Set 타입을 localStorage에 직렬화하기 어려움

**해결**: Zustand의 `persist` 미들웨어 활용. `partialize` 옵션으로 Set을 배열로 변환하여 저장하고, `onRehydrateStorage` 콜백에서 배열을 다시 Set으로 복원.

### 5. 무한 스크롤 구현

**문제**: 페이지네이션과 무한 스크롤을 동시에 지원하면서 필터링과 정렬도 고려해야 함

**해결**: 필터링/정렬된 전체 데이터를 `useMemo`로 메모이제이션. 현재 페이지에 따라 슬라이싱하여 표시할 데이터 결정. 페이지 변경 시 로딩 상태 시뮬레이션으로 UX 개선.

### 6. 타입 안정성과 유연성의 균형

**문제**: 동적 통계 데이터에서 국가별 필드를 타입으로 정의하기 어려움

**해결**: 인덱스 시그니처를 활용하여 타입 안정성 유지. 실제 사용 시 타입 가드나 옵셔널 체이닝으로 안전하게 접근. 테스트를 통한 런타임 동작 검증.

### 7. 로딩 상태의 사용자 경험 개선

**문제**: 단순한 로딩 스피너나 텍스트만 표시하면 레이아웃 시프트가 발생하고 사용자 경험이 저하됨

**해결**: 실제 콘텐츠와 유사한 구조의 스켈레톤 UI 도입 (`TrademarkSkeleton`, `StatisticsSkeleton`). Shimmer 애니메이션으로 로딩 중임을 시각화. 스켈레톤이 실제 콘텐츠와 동일한 높이와 구조를 가져 레이아웃 시프트 최소화.
