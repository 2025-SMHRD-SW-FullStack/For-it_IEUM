import { useState } from "react";

const useOpenAI = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  const fetchAI = async (prompt) => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          // model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "당신은 무역에 관해 누구나 쉽게 이해할 수 있게 도와주는 수입 전략 전문가입니다." },
            { role: "user", content: prompt },
          ],
          max_tokens: 600,
          temperature: 0.3,
        }),
      });

      const data = await res.json();

      if (data.choices && data.choices.length > 0) {
        setResponse(data.choices[0].message.content);
      } else {
        setResponse("응답이 없습니다.");
      }
    } catch (error) {
      setResponse("에러 발생: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, response, fetchAI };
};

export default useOpenAI;
