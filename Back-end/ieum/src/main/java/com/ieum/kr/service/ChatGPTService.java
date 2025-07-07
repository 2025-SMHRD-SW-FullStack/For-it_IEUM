package com.ieum.kr.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.openai.client.OpenAIClient;
import com.openai.models.ChatModel;
import com.openai.models.chat.completions.ChatCompletion;
import com.openai.models.chat.completions.ChatCompletionCreateParams;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatGPTService {
	private final OpenAIClient client;

    public String ask(String userMessage) {
        ChatCompletionCreateParams params = ChatCompletionCreateParams.builder()
        		.addSystemMessage("""
                		다음 데이터를 참고하여 수입 전략을 아래 형식 간결하고 명확하게 작성하세요.  
        				각 문장은 반드시 줄바꿈(개행)하여 구분해주세요.
        				참고 데이터는 그대로 넣어야해
                		""")
//        		.addSystemMessage("""
//                		.html에서 바로 사용 가능한 형태로 데이터를 작성해줘
//                		""")
        		.addSystemMessage("""
                		🎯 작성 규칙
                		- HS 코드와 제품명을 잘 확인 하고 상품의 전략 추천을 해주세요.
                		- 질문자는 한국인 입니다.
        				- 제공된 정보만 사용하세요. 임의의 사실 추가 또는 왜곡 없이 작성합니다.
        				- 출력 형식은 반드시 아래와 같이 5개 문단 구조(📌, 📊, ✅, 🚚, 🏢)를 지켜 주세요.
        				- '전략 추천', '추천 국가 수입 정보', '바이어 제안' 항목은 AI가 생성합니다.
        				- FTA 최저 관세국은 반드시 Request로 준 FTA 체결 국가 리스트를 한 곳입니다.
        				- 하지만, 납기, 물류비, 바이어 신뢰도 등 실익을 종합 고려하세요.
        				- 실제 수입에 가장 유리한 국가를 ‘추천 수입국’으로 반드시 선정하세요.
        				- 추천 수입국은 반드시 실익(관세율, 물류비, 납기, 바이어 신뢰도 등) 기준으로 판단하세요.
        				- 단, 최저 관세국이 물류비, 납기, 신뢰도 등에서도 가장 유리하다면 그대로 추천해도 됩니다.
        				- 억지로 다른 국가를 추천하지 마세요.
        				- 만약 ‘추천 수입국’이 최저 관세국과 다를 경우,
        				그 차이점과 이유를 반드시 구체적으로 설명해야 합니다.
        				- **바이어 정보는 해당 국가의 대표적인 B2B 거래 기준**(현지 플랫폼, 거래 조건 등)을 기반으로 작성하세요.
        				- 바이어를 추천해 줄 때 해당 물품을 정말로 판매하고 있는 기업으로만 추천해 주세요, 진짜로 해당 물품을 판매 하고 있는 기업을 추천해줘.
        				- 바이어 제안은 신뢰도 또는 반응률 순서대로 높은 순으로 정렬해서 작성하세요.
        				- 각 바이어마다 MOQ, 결제 방식, 신뢰도, 반응률, 거래 이력, 배송 방식 정보를 포함하세요.
        				- 바이어 정보는 실제 수치처럼 구체적으로 작성하고, "나라 바이어" 같은 표현은 피하세요.
        				- 최소 2명 이상의 바이어 정보를 순위별로 작성하세요.
        				- 문장마다 개행(\n,\t)을 제거하세요.
        				- 만약 정보가 부족하면 내가 작성하라고 한 틀 형태도 주지말고,
        				- "제공된 정보가 부족하여 전략 추천을 제공하기 어렵습니다. 정보가 더 많은 품목을 선택해 주세요."라고 만 답해주세요.
        				- 여기서 부족한 정보는 FTA 체결국가 리스트가 부족한 정보를 말합니다..
        				- A국 이렇게 추천되는 경우도 "제공된 정보가 부족하여 전략 추천을 제공하기 어렵습니다. 정보가 더 많은 품목을 선택해 주세요."라고 이 한줄만 답해주세요.
        				- 바이어 추천이 불가능한 경우도 "제공된 정보가 부족하여 전략 추천을 제공하기 어렵습니다. 정보가 더 많은 품목을 선택해 주세요."라고 이 한줄만 답해주세요.
        				- 무엇하나 빈 정보를 줄 경우 "제공된 정보가 부족하여 전략 추천을 제공하기 어렵습니다. 정보가 더 많은 품목을 선택해 주세요."라고 이 한줄만 답해주세요.
        				- '알 수 없음'같은 답을 줄 경우 "제공된 정보가 부족하여 전략 추천을 제공하기 어렵습니다. 정보가 더 많은 품목을 선택해 주세요."라고 이 한줄만 답해주세요.
        				- FTA 체결 국가가 많이 있더라도 전략 추천을 하기에 정보가 부족해도 추천이 힘들다고 말해야해야합니다.
                		""")
//        		- 문장은 간결하게, 핵심만 포함합니다.  
//        		- 문장마다 개행(\n)을 넣어 가독성 좋게 작성하세요.  
//        		- ‘전략 추천’ 이유는 반드시 두 개 이상의 짧은 문장으로 나누어 작성하세요.  
//        		- 접속사 대신 문장을 분리해 명료하게 표현하세요.
//        		.addSystemMessage("""
//        				추천국가,평균 운송비, 예상 납기일, 추천이유를 json 객체 형태 key,value로 따로 빼서 작성해줘
//                		""")
        		.addSystemMessage("""
        				🧾 제공 데이터
        				- 품목명: '입력 받은 제품명'
        				- HS코드: '입력 받은 코드'
        				- 기본 관세율: '입력 받은 기본 관세율' 
        				- FTA 최저 관세율: '최저 관세' '최저 국가'
        				- FTA 체결국: '해당 상품이 한국과 FTA 체결 국가'
                		""")
        		.addSystemMessage("""
        				📌 품목 요약  
						- 커피 원두(HS0901)
						  : 전 세계적으로 수요가 많은 품목.
						
						📊 관세 비교  
						- 기본 관세율: 8%  
						- FTA 최저 관세율: 0% (베트남)  
						- 기타 FTA 체결국: 콜롬비아, 페루, 에티오피아
						
						✅ 전략 추천  
						예시 1) 최저관세국과 추천국이 같은 경우  
						추천 수입국: 말레이시아  
						이유: FTA 최저 관세국으로 관세 부담이 없음.  
						물류 안정성 높고 납기 속도도 빠름.
						
						예시 2) 최저관세국과 추천국이 다른 경우  
						추천 수입국: 베트남  
						이유: 베트남은 관세가 1%로 약간 높음.  
						물류비가 낮고 납기 지연이 적어 실익이 더 큼.
						
						🚚 추천 국가 수입 정보 (베트남)  
						- 평균 운송비: 약 110만원  
						- 예상 납기일: 약 14일
						
						🏢 바이어 제안
						1. ABC Trading Co.  
						 - MOQ(최소 주문 수량): 100kg / 결제: T/T (전신 송금)  
						 - 거래 이력: 50건 이상  
						 - 신뢰도: 상위 10% / 반응률: ★★★★☆
						 - 배송 방식: FOB (본선 인도조건)
						
						2. Global Beans Ltd.  
						 - MOQ(최소 주문 수량): 100kg / 결제: T/T (전신 송금)  
						 - 거래 이력: 50건 이상  
						 - 신뢰도: 상위 10% / 반응률: ★★★★☆
						 - 배송 방식: FOB (본선 인도조건)
                		""")
//        		그리고 JSON 객체 타입인 key,value도 만들어줘:
//        		.addSystemMessage("""
//        				{
//        				 "product"(품목요약) : {
//        				  	product_name : '입력 받은 제품명',
//        				  	hs_code : '입력 받은 코드'
//        				 },
//        				 "tariff"(관세 비교) : {
//        				  	"basic_tariff" : string,
//        				  	"fta_tariff" : string,
//        				  	"fta_list" : list
//        				 },
//        				 "recommend_strategy"(전략 추천) : {
//        				  	"recommend_country" : string,
//        				  	"reson" : string
//        				 },
//        				 "recommend_country_info"(추천 국가 수입 정보) :{
//        				  	"shipping_cost" : string,
//        				  	"due_date" : String
//        				 },
//        				 "buyer"(바이어 제안) : {
//        				  	"moq" : string,
//        				  	"payment" : string,
//        				  	"transaction_history" : string,
//        				  	"delivery_method" : string
//        				 }      				 
//        				
//        				} 
//                		""")
        		.addSystemMessage("""
        				📌 품목 요약  
						- ${itemName}(HS${hsCode})
						  : ...
						
						📊 관세 비교  
						- 기본 관세율: 
						- FTA 최저 관세율:    
						- 기타 FTA 체결국: 
						
						✅ 전략 추천  
						- 추천 수입국:   
						- 이유: 
						
						🚚 추천 국가 수입 정보   
						- 평균 운송비: 약 원  
						- 예상 납기일: 약 일
						
						🏢 바이어 제안 (플랫폼 기준)  
						1.   
						 - MOQ(최소 주문 수량):  / 결제:   
						 - 신뢰도:  / 반응률: 
						 - 거래 이력:   
						 - 배송 방식: 
						
						2.   
						 - MOQ(최소 주문 수량):  / 결제:   
						 - 신뢰도:  / 반응률: 
						 - 거래 이력:  
						 - 배송 방식:
                		""")
        		
                .addUserMessage(userMessage)
//                .model(ChatModel.GPT_3_5_TURBO)
                .model(ChatModel.GPT_4)
                .build();

     // 1) ChatCompletion 인스턴스 가져오기
        ChatCompletion completion = client.chat().completions().create(params);

        return completion.choices().stream()
        	    .findFirst()                                              // Optional<Choice>
        	    .map(choice -> choice.message().content())               // Optional<Optional<String>>
        	    .orElse(Optional.empty())                                 // Optional<String>
        	    .orElse("답변이 없습니다.");


    }
}
