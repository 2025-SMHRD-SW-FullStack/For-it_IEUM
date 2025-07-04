from typing import List, Optional
from pydantic import BaseModel
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import pandas as pd
import math

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 origin 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models ---
class TariffListItem(BaseModel):
    name: str
    rate: float

class TariffInfoDTO(BaseModel):
    product_name: str
    hs_code: str
    base_tariff: Optional[float]
    top10_data: List[TariffListItem]

# --- 엑셀 파일 로드 및 전처리 ---
file_path = "../data/HS별 관세율표.xlsx"
df = pd.read_excel(file_path)
# 컬럼명 정리
df.columns = [col.replace("한ㆍ", "") for col in df.columns]
# 기본적으로 4자리로 맞춤 (zfill)
df['세번'] = df['세번'].astype(str)

def pad_hscode(code: str) -> str:
    s = code.strip()
    if len(s) in (3, 5, 9):
        return s.zfill(len(s) + 1)
    return s.zfill(4)

df['hs_code'] = df['세번'].apply(pad_hscode)
df['hs_len'] = df['hs_code'].str.len()
# 관세 컬럼 식별
tariff_cols = [c for c in df.columns if '세율' in c or '관세' in c]

# --- 기본세율 파싱 함수 ---
def parse_base_tariff(val) -> Optional[float]:
    # 결측(NaN) 처리
    if pd.isna(val):
        return None
    try:
        num = float(val)
    except:
        if isinstance(val, str) and "무세" in val:
            return 0.0
        return None
    # 수치로 변환했을 때 NaN인지 확인
    if math.isnan(num):
        return None
    return num

def format_hscode(code: str) -> str:
    s = code
    if len(s) == 10:
        return f"{s[:4]}.{s[4:6]}-{s[6:]}"
    if len(s) == 6:
        return f"{s[:4]}.{s[4:]}"
    return s

# --- 엔드포인트: HS 코드로 검색 ---
@app.get("/api/search-by-code", response_model=List[TariffInfoDTO])
def search_by_code(
    code: str = Query(..., description="HS 코드 접두사 입력, 03 등")
):
    filtered = df[
        df['hs_code'].str.startswith(code)
        & df['기본세율 - A'].apply(lambda x: parse_base_tariff(x) is not None)
    ]
    results: List[TariffInfoDTO] = []
    unique_codes = sorted(
        filtered['hs_code'].drop_duplicates().tolist(),
        key=lambda x: (len(x), x)
    )
    for hs in unique_codes:
        row = filtered[filtered['hs_code'] == hs].iloc[0]
        base_val = parse_base_tariff(row.get('기본세율 - A'))
        # 관세값 파싱 및 NaN 제거
        rates = (
            row[tariff_cols]
            .apply(pd.to_numeric, errors='coerce')
            .dropna()
        )
        rates = rates[~rates.apply(lambda v: math.isnan(v))]
        top10 = rates.sort_values().head(10)
        items = [TariffListItem(name=k, rate=float(v)) for k, v in top10.items()]
        # base_val이 NaN이었으면 None으로
        if base_val is not None and math.isnan(base_val):
            base_val = None
        formatted_hs = format_hscode(hs)
        results.append(TariffInfoDTO(
            product_name=row['한글품명'],
            hs_code=formatted_hs,
            base_tariff=base_val,
            top10_data=items
        ))
    return results

# --- 엔드포인트: 품명 키워드로 검색 ---
@app.get("/api/search-by-name", response_model=List[TariffInfoDTO])
def search_by_name(
    keyword: str = Query(..., description="상품명 키워드 검색")
):
    filtered = df[
        df['한글품명'].str.contains(keyword, case=False, na=False)
        & df['기본세율 - A'].apply(lambda x: parse_base_tariff(x) is not None)
    ]
    results: List[TariffInfoDTO] = []
    unique_codes = sorted(
        filtered['hs_code'].drop_duplicates().tolist(),
        key=lambda x: (len(x), x)
    )
    for hs in unique_codes:
        row = filtered[filtered['hs_code'] == hs].iloc[0]
        base_val = parse_base_tariff(row.get('기본세율 - A'))
        rates = (
            row[tariff_cols]
            .apply(pd.to_numeric, errors='coerce')
            .dropna()
        )
        rates = rates[~rates.apply(lambda v: math.isnan(v))]
        top10 = rates.sort_values().head(10)
        items = [TariffListItem(name=k, rate=float(v)) for k, v in top10.items()]
        if base_val is not None and math.isnan(base_val):
            base_val = None
        formatted_hs = format_hscode(hs)
        results.append(TariffInfoDTO(
            product_name=row['한글품명'],
            hs_code=formatted_hs,
            base_tariff=base_val,
            top10_data=items
        ))
    return results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
