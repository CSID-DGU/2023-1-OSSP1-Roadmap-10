![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=Roadmap&fontSize=90&animation=fadeIn&fontAlignY=38&desc=OPPS1&descAlignY=51&descAlign=62)

# 2023-1-OPPS1-Roadmap-10
2023학년도 공개SW프로젝트_01 Roadmap 팀입니다.<br>
[웹페이지 이동](www.dguroadmap.site)

|박기범|박윤서|김민석|양승엽|김건호|
|:-:|:-:|:-:|:-:|:-:|
|<img src="https://avatars.githubusercontent.com/u/97174348?v=4" width="150px" />|<img src="https://avatars.githubusercontent.com/u/90263566?v=4" width="150px" />|<img src="https://avatars.githubusercontent.com/u/126749539?v=4" width="150px" />|<img src="https://avatars.githubusercontent.com/u/122291076?v=4" width="150px" />|<img src="https://avatars.githubusercontent.com/u/129247495?v=4" width="150px" />|
|[@Manhye](https://github.com/Manhye)|[@00pys](https://github.com/00pys)|[@4pple4ree](https://github.com/4pple4ree)|[@ovo100](https://github.com/ovo100)|[@GeonHo1225](https://github.com/GeonHo1225)|

##

##
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logo=Visual Studio Code&logoColor=white"/> <img src="https://img.shields.io/badge/Intellij-000000?style=flat-square&logo=intellijidea&logoColor=white"/> 

##
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/> <img src="https://img.shields.io/badge/Spring-6DB33F?style=flat-square&logo=Spring&logoColor=white"/>

## 프로젝트의 목적
기존 프로젝트인 You're Webcome(동국대 네비게이션)을 오픈소스를 이용하여 더 좋은 프로그램으로 개선하는 프로젝트다.
기존 프로젝트에서는, 길을 더 자세하게 표시하기 힘들고, 다익스트라 알고리즘에서의 가중치 설정이 제대로 되어있지 않고, 엘리베이터나 계단을 포함하지 않은 루트여서
생각했던 루트와 상이한 루트들이 많았고, 이 문제들을 이번 프로젝트를 통해 해결해보려 함.
동국대학교 2.5D 지도와 편의시설, 내가 있는 곳에서 가고 싶은 곳을 알려주는 동국대 네비게이션 프로그램 <You're Webcome>을 신입생들이나 동국대학교를 잘 모르는
사람들이 더 편하게 길을 찾을 수 있도록 보완하는 것을 목적으로 함.



## 프로젝트의 목표
1. 기존에 사용한 2.5D지도의 위성 지도화
2. 다익스트라 알고리즘에서 잘못 반영된 가중치의 개선
3. 표시된 길들을 더욱 알아보기 쉽도록 개선
4. 노드를 더욱 구체화해 정확한 루트를 표현   
4-1. 루트에 계단과 엘리베이터 추가  
4-2. 학교 내부에서 외부로 통하는 노드 추가  
4-3. 기준을 정해 노드들을 추가



## 기존 프로젝트 소개
기존 프로젝트는 [<You're Webcome>](https://github.com/CSID-DGU/2022-2-OSSProj-You_are_webcome-9.git) 이라는 웹페이지로, 2.5D 지도를 통해 친숙한 이미지로 학교에서의 루트나 편의시설의 위치 등을 소개하는 프로그램




## 기존 프로젝트에서의 개선점
1. 2.5D지도를 Kakao Map의 API를 이용한 위성지도로 변경
2. 다익스트라 알고리즘에서 잘못 반영된 가중치를 <운동선수에서 Treadmill의 속도 및 경사도에 따른 산소섭취량> 의 공식을 이용해 새로 반영
3. 표시된 길들을 위성지도에 맞게 새로운 노드를 추가해 알아보기 쉽게 개선
4. 계단, 엘리베이터, 학교 내부에서 외부로 통하는 노드를 추가해 길을 구체화함



## 프로젝트 소개
우선, 알고리즘은 기존 프로젝트의 핵심 알고리즘인 다익스트라 알고리즘을 그대로 사용함.
다익스트라 알고리즘은 주어진 출발점과 도착점 간의 최단 경로를 찾는 알고리즘으로 각각의 노드들은 간선으로 이어져 있고, 서로 다른 간선은 각자가 다른 가중치를 가짐.




## 알고리즘의 작동방식
우선 시작 노드를 현재 노드로 설정하고, 이 노드의 초기 거리를 0으로 설정함.
이 때, 나머지 노드의 초기 거리는 무한대로 설정됨.
그 이후 현재 노드에서 인접한 노드로의 거리를 계산하고, 이 거리가 노드의 현재 거리보다 작으면 노드의 거리를 업데이트한다.
이러한 과정을 모든 인접 노드에 대해 거리를 업데이트한 후, 현재 노드는 '방문 완료' 상태로 표시하고 다시 거리를 업데이트하지 않는다.
아직 '방문 완료' 상태가 되지 않은 노드 중에서 최소 거리를 가진 노드를 새로운 현재 노드로 선택한다.
출발점에서 도착점에 도달할 때 까지 위의 과정을 반복한다.

이때 알고리즘을 단순 배열로 구현한다면 노드 개수가 V, 간선 개수가 E일 때의 시간복잡도 O(V^2)로 노드 개수에 비례해 꽤 많은 시간이 소요됨..
하지만, 우선순위 큐를 사용하여 구현할 경우 시간복잡도가 O(E x logV) 로 소요시간을 단축할 수 있다. 
따라서 우선순위 큐를 사용하여 알고리즘을 구현함.




## 가중치 설정
다익스트라 알고리즘에서 알고리즘의 결과에 가장 큰 영향을 미치는 것은 간선의 가중치이다.
이전 프로젝트에서는 지점과 지점 사이의 거리와 경사를 생각해 가중치 공식을 
(가중치) = (경사도) x 거리 
의 방식으로 설정했다.
이 공식도 나쁘지 않은 결과를 냈지만 내리막길의 경우 경사도가 적용되지 않았고, 근거가 부족하다고 판단되어 구체적인 가중치를 설정하기로 판단함.
본 프로젝트에선 길찾기 알고리즘을 사용할 때 사용자가 길을 직접 걸을 때의 상황을 가정했기 때문에 거리와 경사에 따른 에너지 소모를 중점적으로 생각함.


이를 위해 찾아 본 자료 중 '운동선수에서 Treadmill의 속도 및 경사도에 따른 산소섭취량' 의 공식을 이용하는게 적절하다고 판단했고 이를 적용함.
위 논문에서는 트레드밀의 속도와 경사도를 다르게 하며 사람의 산소섭취량을 측정했는데, 이를 일반화하여 회귀식을 작성할 경우
(산소 섭취량) = 1.67 x (속도) + 0.15 x (경사도) x (속도) + 3.5 (ml/kg) 을 얻을 수 있었다.

이에 따라 결정한 최종 가중치 공식은 사람의 산소섭취량에 기반을 둔
가중치 = ( 0.15 x 경사도 + 3.5 ) x 거리
로 결정하게 되었음.

이에 더해, 엘리베이터와 같이 경사와 거리가 없고, 단순 고도차이만 있는 간선의 경우 고도 차이 값을 그대로 가져온 뒤 기존 가중치인
'( 가중치 ) = ( 1 + 경사도 ) x 거리' 에서 새로운 가중치인 '( 가중치 ) = 0.15 x 경사도 + 3.5 ) x 거리' 로 변환하는 과정에서 주변 값들에 비례하게 증가시킨 값을 가중치로 설정함.



### 건물 경로 페이지
상단의 드롭다운 메뉴를 통해 출발지와 목적지를 선택 후 경로 탐색을 누르면 경로를 생성함.
이 때, 경로 도중 계단, 엘리베이터, 에스컬레이터를 사용하거나 중간에 헤메기 쉬울 것 같은 길이 나타날 시 카메라 이미지를 활용해 클릭할 경우 그 경로에 관한 사진을 볼 수 있음.



### 편의 시설 페이지
상단의 드롭다운 메뉴를 통해 편의 시설을 선택하고, 편의시설에 해당하는 각 마커를 생성 후 마커를 클릭 시 편의 시설에 관한 정보를 알리는 인포 윈도우 창을 띄워 사용자가 편의 시설에 관한 정보를 알 수 있도록 함.



### 건물 정보 페이지
지도에서 대학교 건물 중심에 모두 마커를 생성한 뒤, 생성한 마커에 클릭 이벤트를 설정해 인포 윈도우 창을 띄워 사용자에게 해당 건물 정보를 전달할 수 있도록 함.
건물 정보로는 건물에 대한 설명, 학사 운영실, 편의 시설, 건물 사진과 같은 내용이 있다.



## 사용 OSS
1. React - 프론트엔드 개발을 수행함
-> React의 Virtual DOM을 통해 효율적인 렌더링을 구현하고, 컴포넌트 간의 데이터 흐름을 관리해 사용자 친화적 UI를 제공함.

2. Node.js - 서버 사이드 로직을 개발함
-> Node.js의 모듈 시스템과 패키지 매니저(NPM)를 이용해 간편한 코드 관리와 외부 라이브러리를 활용함.

3. Spring - Spring프레임워크를 사용해 백엔드 서버를 구축함
-> Spring의 경량 컨테이너, 의존성 주입(Dependency Injection), AOP(Aspect-Oriented Programming)등의 기능을 활용해 안정적이고 확장 가능한 서버를 개발함.

4. KakakoMap API - 지도 및 위치 기반 서비스 사용
-> KakaoMap API를 활용해 사용자에게 지도상에서 특정 위치를 표시하고, 관련 정보를 제공하는 기능을 구현함.



## 장점 및 차별점
1. 노드의 개수가 기존 프로젝트의 70여 개에서 196개로 늘어나 굉장히 섬세한 루트의 표현이 가능해짐.
2. 기존의 2.5D지도로는 위의 섬세한 루트의 표현이 불가능하다 판단, KakakoMap API를 이용해 사람들에게 익숙한 위성 지도로 교체함.
3. 엘리베이터를 이용한 루트, 학교 내부에서 외부로 통하는 통로 등을 구현함.
4. 헷갈릴 수 있는 루트에 사진을 추가해 길을 찾기 쉽도록 개선함.




## PC버전 사진

![image](https://github.com/CSID-DGU/2023-1-OPPS1-Roadmap-10/assets/129247495/0a38cc6b-2d69-42ca-a6f5-b49e70899d1d)
메인 페이지 사진


![image](https://github.com/CSID-DGU/2023-1-OPPS1-Roadmap-10/assets/129247495/0f362792-744d-40f5-8a7c-5ff91910e5f4)
건물정보 페이지 사진


![image](https://github.com/CSID-DGU/2023-1-OPPS1-Roadmap-10/assets/129247495/a36974d2-9e61-4aea-8e06-2065c819b646)
편의시설 페이지 사진


![image](https://github.com/CSID-DGU/2023-1-OPPS1-Roadmap-10/assets/129247495/a119a7ec-03c5-40ae-9873-ca0ebf3f7d31)
경로 탐색 페이지 사진






## Mobile버전 사진


<img src = "https://github.com/CSID-DGU/2023-1-OPPS1-Roadmap-10/assets/129247495/a66d4878-4102-4af9-a150-33c19718bac1" width = "30%" height = "30%">

<img src = "https://github.com/CSID-DGU/2023-1-OPPS1-Roadmap-10/assets/129247495/feb6c81b-8a4f-4c4d-972d-a93bceca2d2d" width = "30%" height = "30%">

<img src = "https://github.com/CSID-DGU/2023-1-OPPS1-Roadmap-10/assets/129247495/554f01ab-1c43-4461-b377-92c6c5d80f1e" width = "30%" height = "30%">


메인 페이지 사진　　　　　　　　　　　　
경로 탐색 페이지 사진　　　　　　　　　　
편의시설 페이지 

## 참고 서적
운동선수에서 Treadmill의 속도 및 경사도에 따른 산소섭취량, 한국체육과학회, 한국체육과학회지 학술저널, 한국체육과학회지 제4권 제1호, 1995.03 57-64

KakaoMap API - https://apis.map.kakao.com/
