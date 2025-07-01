from typing import List, Optional
from pydantic import BaseModel
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import pandas as pd
import json


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 origin 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProductDTO(BaseModel):
    hs_code: str
    product_name: str

class TariffListItem(BaseModel):
    name: str
    rate: float

class TariffInfoDTO(BaseModel):
    product_name: str
    hs_code: str
    base_tariff: Optional[float]
    top10_data: List[TariffListItem]

# 엑셀 파일 로드 및 전처리
file_path = "../data/HS별 관세율표.xlsx"
df = pd.read_excel(file_path)
df.columns = [col.replace("한ㆍ", "") for col in df.columns]
df['세번'] = df['세번'].astype(str).str.zfill(4)
df['세번길이'] = df['세번'].str.len()
df['코드4자리'] = df['세번'].str[:4]

# 기본세율 파싱 함수
def parse_base_tariff(val):
    try:
        return float(val)
    except:
        if isinstance(val, str) and "무세" in val:
            return 0.0
        return None

# 1. 대분류 필터 함수
@app.get("/api/main-categories",response_model=List[ProductDTO])
def get_main_categories(input_code: str = Query(...)):
    main_df = df[df['세번길이'] <= 4]
    filtered = main_df[main_df['세번'].str.startswith(input_code)]
    result = filtered[['세번', '한글품명']].drop_duplicates().sort_values('세번').reset_index(drop=True)
    return result.rename(columns={"세번": "hs_code", "한글품명": "product_name"}).to_dict(orient="records")
	
# 2. 대분류 코드로 소분류 출력
@app.get("/api/subcategories",response_model=List[ProductDTO])
def get_subcategories(main_code: str = Query(...)):
    sub_df = df[df['세번'].str.startswith(main_code)]
    result = sub_df[['세번', '한글품명']].drop_duplicates().sort_values('세번').reset_index(drop=True)
    return result.rename(columns={"세번": "hs_code", "한글품명": "product_name"}).to_dict(orient="records")
	#return 

# 3. 소분류 코드로 관세 정보 출력
@app.get("/api/tariff-info",response_model=TariffInfoDTO)
def get_tariff_info(hs_code: str = Query(...)):
    row_df = df[df['세번'] == hs_code]
    if row_df.empty:
        return {"error": f"No matching HS code: {hs_code}"}

    row = row_df.iloc[0]
    tariff_cols = [col for col in df.columns if '세율' in col or '관세' in col]
    tariffs = row[tariff_cols].apply(pd.to_numeric, errors='coerce').dropna()
    top10_data = tariffs.sort_values().head(10)
    top10_data = [{"name": k, "rate": float(v)} for k, v in top10_data.items()]

    return {
        "product_name": row["한글품명"],
        "hs_code": row["세번"],
        "base_tariff": parse_base_tariff(row.get("기본세율 - A")),
        "top10_data": top10_data
    }

# 4. 한글품명 키워드 검색 함수
@app.get("/api/search-by-name",response_model=List[ProductDTO])
def search_by_product_name(keyword: str = Query(...)):
    filtered = df[df['한글품명'].str.contains(keyword, case=False, na=False)]
    result = filtered[['세번', '한글품명']].drop_duplicates().sort_values('세번').reset_index(drop=True)
    return result.rename(columns={"세번": "hs_code", "한글품명": "product_name"}).to_dict(orient="records")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

