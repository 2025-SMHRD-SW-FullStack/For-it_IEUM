const testItemArray = [
  {
    hs_code: "0901.21-0000",
    product_name: "커피 원두",
    baseTariff: 0.08,
    lowestTariff: 0,
    lowestCountry: "베트남",
    availableCountries: [
      { country: "콜롬비아", tariff: 0 },
      { country: "페루", tariff: 2 },
      { country: "베트남", tariff: 5 },
      { country: "태국", tariff: 8 }
    ]
  },
  {
    product_name: "태양광 패널",
    hs_code: "8541.10-0000",
    baseTariff: 8,
    lowestTariff: 0,
    lowestCountry: "페루",
    availableCountries: [
      { country: "페루", tariff: 0 },
      { country: "베트남", tariff: 2 },
      { country: "인도", tariff: 5 },
      { country: "태국", tariff: 8 }
    ]
  },
  {
    product_name: "스마트폰",
    hs_code: "8517.12-0000",
    baseTariff: 12,
    lowestTariff: 0,
    lowestCountry: "말레이시아",
    availableCountries: [
      { country: "말레이시아", tariff: 0 },
      { country: "베트남", tariff: 3 },
      { country: "태국", tariff: 4 },
      { country: "인도네시아", tariff: 6 }
    ]
  },
  {
    product_name: "노트북 컴퓨터",
    hs_code: "8471.30-0000",
    baseTariff: 10,
    lowestTariff: 0,
    lowestCountry: "베트남",
    availableCountries: [
      { country: "인도네시아", tariff: 0 },
      { country: "미얀마", tariff: 1 },
      { country: "말레이시아", tariff: 2 },
      { country: "브라질", tariff: 4 }
    ],
  },
  {
    product_name: "전기 자동차",
    hs_code: "8703.80-0000",
    baseTariff: 10,
    lowestTariff: 2,
    lowestCountry: "태국",
    availableCountries: [
      { country: "중국", tariff: 0 },
      { country: "베트남", tariff: 2 },
      { country: "독일", tariff: 5 },
      { country: "체코", tariff: 6 }
    ]
  },
  {
    product_name: "LED 조명",
    hs_code: "9405.10-0000",
    baseTariff: 8,
    lowestTariff: 0,
    lowestCountry: "인도네시아",
    availableCountries: [
      { country: "일본", tariff: 0 },
      { country: "중국", tariff: 3 },
      { country: "태국", tariff: 5 },
      { country: "인도네시아", tariff: 7 }
    ]
  },
  {
    product_name: "의료용 마스크",
    hs_code: "6307.90-4000",
    baseTariff: 6,
    lowestTariff: 0,
    lowestCountry: "베트남",
    availableCountries: [
      { country: "방글라데시", tariff: 0 },
      { country: "베트남", tariff: 1 },
      { country: "미국", tariff: 3 },
      { country: "중국", tariff: 5 },
    ]
  },
  {
    product_name: "냉장고",
    hs_code: "8418.10-0000",
    baseTariff: 13,
    lowestTariff: 4,
    lowestCountry: "말레이시아",
    availableCountries: [
      { country: "대만", tariff: 0 },
      { country: "일본", tariff: 2 },
      { country: "미국", tariff: 3 },
      { country: "독일", tariff: 4 }
    ]
  },
  {
    product_name: "에어컨",
    hs_code: "8415.10-0000",
    baseTariff: 13,
    lowestTariff: 5,
    lowestCountry: "인도",
    availableCountries: [
      { country: "말레이시아", tariff: 0 },
      { country: "태국", tariff: 1 },
      { country: "중국", tariff: 4 },
      { country: "베트남", tariff: 5 }
    ]
  },
  {
    product_name: "전동 공구",
    hs_code: "8467.21-0000",
    baseTariff: 9,
    lowestTariff: 1,
    lowestCountry: "중국",
    availableCountries: [
      { country: "중국", tariff: 0 },
      { country: "독일", tariff: 2 },
      { country: "미국", tariff: 5 },
      { country: "폴란드", tariff: 3 }
    ]

  },
];

export default testItemArray
