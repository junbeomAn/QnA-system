# 개발자를 위한 Q&A 페이지
![시연1](./qna1.gif)

## 프론트 엔드 스택

- React.js 
- GraphQL Apollo 
- Solidity(Smart Contract)
- Passport.js

## 백엔드 스택

- Express.js
- GraphQL Server
- MongoDB(MongoDB Compass)

## 기능

### 연동 로그인 기능
![시연2](./qna2_login.gif)

  - Github 로그인 기능(only)
  - 세션 유지. 로그아웃 하지 않는 한 로그인 상태 지속가능

### 질문작성 기능
![시연3](./qna3_question_create.gif)
![시연4](./qna5_ether.gif)

  - 질문 작성시에 스마트 컨트랙트를 적용하여 질문 답변에 대한 보상으로 줄 이더리움 제시 가능.
  - 크롬 브라우저 익스텐션 MetaMask(전자지갑) 사용
  - 작성 시에 마크다운 기능 사용 가능 
  - 질문 작성시에 실시간 이더리움 환율 확인 가능(코인 거래소 API활용)

### 질문조회 기능
![시연5](./qna1_select.gif)
![시연6](./qna6_search.gif)

  - 질문 목록에서 조회가능
  - 질문 조회 후 해당 질문에 대해 답변 가능(로그인 했을 시만)

### 질문삭제 및 수정 기능
  - 글쓴이일 경우 해당 질문 삭제 가능
  - 글쓴이일 경우 해당 질문 수정 가능
  - 수정 시엔 따로 페이지에 들어가지 않고 해당 컴포넌트에서 바로 수정 후 적용.

### 질문에대한 답변 기능
![시연7](./qna4_answer_create.gif)

  - 질문을 조회하는 사람은 답변 작성가능
  - 답변 또한 수정 및 삭제가능
