import fetch from "node-fetch";

async function testKey() {
  const userKey = "AIzaSyBf8FHNvf1_kiFYAcBY2HydVovYpbWZo10";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${userKey}`;

  console.log("Testing Gemini API Key:", userKey);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: "Responde apenas 'OK' se receberes isto." }]
        }]
      })
    });

    const status = response.status;
    console.log("Response HTTP Status:", status);
    
    const data = await response.json();
    if (status !== 200) {
      console.error("API Call Failed. Error Details:", JSON.stringify(data, null, 2));
    } else {
      console.log("Success! Gemini response:", JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("Network or script error:", error);
  }
}

testKey();
