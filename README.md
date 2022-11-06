<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#환경셋팅">환경셋팅</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

# [프리온보딩] 띵스플로우 백엔드 API 개발 프로젝트

## About The Project

### 프로젝트 개요

#### 서비스 개요

    - 게시글 CRUD, 현재 날씨 R 기능을 포함한 백엔드 API를 개발하는 개인 프로젝트

- 개발 조건
  - database 는 RDB 사용
  - 규격에 맞게 개발
  - API 명세서 작성
  - 커서 페이지네이션 구현
  - 현재 날씨는 외부 API 사용

</br>

- 책임

| 김성식                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------- |
| 게시물 리스트 가져오기</br>특정 게시물 정보 가져오기</br>게시물 생성하기</br>특정 게시물 수정하기<br>특정 게시물 |

</br>

- 개발 우선순위
  1. 완성: 일정 준수 / API 정상 작동 / 코딩 컨벤션 / 코드패키지 구조
     1. 2022.11.4.금요일 23:59 까지 API 완성
     2. API 정상 작동 테스트: 토요일 17:00-24:00 까지
     3. 토요일 내로 README 작성
  2. 추가 구현: 자세한 내용은 아래에 있음
     1. 금요일 이후에 구현
- 추가 구현 목표
  - Unit test

</br>

### ERD

<img width="880" alt="ERD" src="https://user-images.githubusercontent.com/104759273/200097750-d6d99871-00be-4a5d-bc8e-119aab511c05.png">

</br>

### Built With

- JavaScript
- TypeScript
- NestJS
- TypeORM
- Jest
- Swagger

</br>

<!-- GETTING STARTED -->

## Getting Started

```
── app.module.ts
├── boards
│   ├── boards.controller.spec.ts
│   ├── boards.controller.ts
│   ├── boards.module.ts
│   ├── boards.service.spec.ts
│   ├── boards.service.ts
│   └── dto
│       └── createPost.request.dto.ts
├── entities
│   ├── Boards.ts
│   └── Users.ts
├── http-exception.filter.ts
├── main.ts
└── weather
    ├── weather.controller.spec.ts
    ├── weather.controller.ts
    ├── weather.module.ts
    ├── weather.service.spec.ts
    └── weather.service.ts
```

</br>

### 환경셋팅

- 프로젝트 셋업(Git repository & Server 초기세팅)
  - server 셋팅
    - TypORM 을 사용함
  - Git repo
    - 짧은 프로젝트 기간을 고려해 git flow 는 단순화했음: main-feature branch
    - git 컨벤션: [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/)

</br>

<!-- USAGE EXAMPLES -->

## Usage

[API 명세]

| METHOD | URL | 사용예시 | request | response |
| ------ | --- | -------- | ------- | -------- |

</br>

<!-- ROADMAP -->

## Roadmap

#### 구현 목표

- [x] 게시글 CRUD 기능 구현
- [x] 현재 날씨 가져오기 기능 구현
  - [x] unit test
