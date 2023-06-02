const LocList = () =>{
    const loc =[
        {
            "code": "R20",
            "id": "가든쿡",
            "Lat": 37.55789721,
            "Lng": 127.0033455,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "R49C",
            "id": "가온누리",
            "Lat": 37.558199,
            "Lng": 126.999369,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "MK",
            "id": "경영관",
            "Lat": 37.55704307485881,
            "Lng": 127.00292446195459,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "XA",
            "id": "계산관A",
            "Lat": 37.560443,
            "Lng": 126.999175,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "X",
            "id": "계산관B",
            "Lat": 37.560092080451604,
            "Lng": 126.99890894109868,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "W",
            "id": "과학관",
            "Lat": 37.557309806246856,
            "Lng": 126.99988682382434,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "R18C",
            "id": "그루터기",
            "Lat": 37.55698903,
            "Lng": 127.0023178,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "F",
            "id": "다향관",
            "Lat": 37.55870454949439,
            "Lng": 127.0003621705126,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "G2",
            "id": "대운동장",
            "Lat": 37.55650971868976,
            "Lng": 127.00066999579639,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "D7",
            "id": "동대입구역",
            "Lat": 37.55889546,
            "Lng": 127.0049844,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "D5",
            "id": "듀이카 출구",
            "Lat": 37.559890259237434,
            "Lng": 127.00083300537905,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "BM",
            "id": "만해관",
            "Lat": 37.55761614,
            "Lng": 127.0008737,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "A",
            "id": "명진관",
            "Lat": 37.55769182916527,
            "Lng": 126.99996831050905,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "K",
            "id": "문화관",
            "Lat": 37.55758006,
            "Lng": 127.0031101,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "BB",
            "id": "법학관",
            "Lat": 37.558066640598234,
            "Lng": 127.00090089146994,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "N",
            "id": "본관",
            "Lat":  37.55852434954834,
            "Lng": 126.99949748962393,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "R76C",
            "id": "블루팟",
            "Lat": 37.55893880876175,
            "Lng": 126.99964235549915,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "M",
            "id": "사회과학관",
            "Lat": 37.55757647341498,
            "Lng": 127.00257589893737,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "FF",
            "id": "상록원",
            "Lat": 37.556999862466405,
            "Lng": 126.99958351339863,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "I",
            "id": "신공학관",
            "Lat": 37.55807384209792,
            "Lng": 126.99846984248175,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "D1",
            "id": "신공학관 출구",
            "Lat": 37.558331,
            "Lng": 126.99766,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "E",
            "id": "원흥관",
            "Lat": 37.558906368112204,
            "Lng": 126.99888179552639,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "D8",
            "id": "장충공원 1",
            "Lat": 37.55834045511467,
            "Lng": 127.0046629226596,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "D9",
            "id": "장충공원 2",
            "Lat": 37.55738544,
            "Lng": 127.0034994,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "Y",
            "id": "정각원",
            "Lat": 37.5574611679436,
            "Lng": 127.00118156166387,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "D0",
            "id": "정문",
            "Lat": 37.55660338,
            "Lng": 127.0032232,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "D2",
            "id": "정보문화관 출구 1",
            "Lat": 37.559552,
            "Lng": 126.998305,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "D3",
            "id": "정보문화관 출구 2",
            "Lat": 37.559841,
            "Lng": 126.99805,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "P",
            "id": "정보문화관P",
            "Lat": 37.55962355851048,
            "Lng": 126.99857846327879,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "Q",
            "id": "정보문화관Q",
            "Lat": 37.55987223060984,
            "Lng": 126.9983430440475,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "S",
            "id": "조소실습장",
            "Lat": 37.55602677,
            "Lng": 127.0018244,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "C",
            "id": "중앙도서관",
            "Lat": 37.55797294,
            "Lng": 126.9990538,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "G",
            "id": "체육관",
            "Lat": 37.559828994079886,
            "Lng": 127.00026710476699,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "OO",
            "id": "팔정도",
            "Lat": 37.558257,
            "Lng": 127.000181,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "J",
            "id": "학림관",
            "Lat": 37.56027949267652,
            "Lng": 126.99979627479863,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "Z",
            "id": "학생회관",
            "Lat": 37.560110094245076,
            "Lng": 126.99837472929515,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "L",
            "id": "학술관",
            "Lat": 37.55804496593563,
            "Lng": 127.00357640228633,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "H",
            "id": "혜화관",
            "Lat": 37.55761974,
            "Lng": 127.0017837,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "R19C",
            "id": "혜화관 옆 카페",
            "Lat": 37.55723411,
            "Lng": 127.0016976,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "D6",
            "id": "혜화문(중문)",
            "Lat": 37.55876577,
            "Lng": 127.0034814,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "T",
            "id": "혜화별관",
            "Lat": 37.55743233202582,
            "Lng": 127.00153014440032,
            "facilities": "",
            "explain": ""
        },
        {
            "code": "D4",
            "id": "후문",
            "Lat": 37.560692,
            "Lng": 126.999335,
            "facilities": "",
            "explain": ""
        }
    ];



    return loc;
}

export default LocList;