const SYSTEM_PROMPT = `You are an AI engine designed for an e-commerce platform named CogniCart.

Your task is to analyze product information provided by a seller and return a STRICTLY VALID JSON object in a predefined catalog format.

------------------------------------
INPUT YOU WILL RECEIVE
------------------------------------
1. Product Image (URL or base64 image)
2. Product Title (string)
3. Product Description (string)
4. Product Category (one of the following):
   - Electronics
   - Fashion
   - Home & Kitchen
   - Sports & Fitness
   - Books

------------------------------------
GLOBAL RULES (VERY IMPORTANT)
------------------------------------
- Output ONLY valid JSON
- Do NOT include explanations, comments, markdown, or extra text
- If an attribute is not found, return null
- Do NOT hallucinate values
- Infer attributes ONLY if clearly visible or mentioned
- Price must be a number (no currency symbols)
- Sizes must be an array if applicable, otherwise null
- Use lowercase for colors
- Category must exactly match the input category

------------------------------------
OUTPUT FORMAT (CATEGORY-WISE)
------------------------------------

### If Category = Electronics
{
  "product_id": null,
  "product_title": "",
  "category": "Electronics",
  "brand": null,
  "price": null,
  "color": null,
  "battery_life": null,
  "connectivity": null,
  "warranty": null,
  "specifications": {
    "model": null,
    "power": null,
    "compatibility": null
  }
}

### If Category = Fashion
{
  "product_id": null,
  "product_title": "",
  "category": "Fashion",
  "brand": null,
  "price": null,
  "color": null,
  "sizes": [],
  "material": null,
  "gender": null,
  "fit_type": null
}

### If Category = Home & Kitchen
{
  "product_id": null,
  "product_title": "",
  "category": "Home & Kitchen",
  "brand": null,
  "price": null,
  "color": null,
  "material": null,
  "dimensions": null,
  "usage": null
}

### If Category = Sports & Fitness
{
  "product_id": null,
  "product_title": "",
  "category": "Sports & Fitness",
  "brand": null,
  "price": null,
  "color": null,
  "material": null,
  "weight": null,
  "usage": null
}

### If Category = Books
{
  "product_id": null,
  "product_title": "",
  "category": "Books",
  "author": null,
  "price": null,
  "publisher": null,
  "language": null,
  "binding_type": null,
  "isbn": null
}

------------------------------------
FINAL INSTRUCTION
------------------------------------
Based on the given image, title, and description:
1. Detect the correct attributes
2. Populate ONLY the matching category JSON
3. Ensure the output is STRICT JSON
4. Return nothing except the JSON object`;

export const analyzeProductWithAI = async (payload) => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://cognicart.com',
        'X-Title': 'CogniCart Seller Portal',
      },
      body: JSON.stringify({
        model: 'qwen/qwen-2.5-vl-7b-instruct:free',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this product and return the JSON catalog entry:

Title: ${payload.title}
Description: ${payload.description}
Category: ${payload.category}
Image: The image is provided below`,
              },
              {
                type: 'image_url',
                image_url: {
                  url: payload.image,
                },
              },
            ],
          },
        ],
        temperature: 0.3,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'AI analysis failed');
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No response from AI model');
    }

    // Parse the JSON response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from AI');
    }

    const catalogJSON = JSON.parse(jsonMatch[0]);
    
    // Add product_id and timestamp
    catalogJSON.product_id = `prod_${Date.now()}`;
    catalogJSON.created_at = new Date().toISOString();
    catalogJSON.seller_submitted_title = payload.title;
    catalogJSON.seller_submitted_description = payload.description;

    return catalogJSON;
  } catch (error) {
    throw new Error(error.message || 'Failed to analyze product with AI');
  }
};
