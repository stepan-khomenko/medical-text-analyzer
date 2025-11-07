import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input. Please provide text.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.HUGGINGFACE_API_KEY;
    const modelUrl = process.env.HUGGINGFACE_MODEL_URL;

    if (!apiKey || !modelUrl) {
      return NextResponse.json(
        { error: 'API key or model URL not configured' },
        { status: 500 }
      );
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(modelUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: text,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error('Hugging Face API error:', await response.json());

      // Model might be loading (cold start)
      if (response.status === 503) {
        return NextResponse.json(
          { error: 'Model is loading. Please try again in a few seconds.' },
          { status: 503 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to analyze text' },
        { status: response.status }
      );
    }

    const result = await response.json();

    // Hugging Face returns array of arrays for batch inputs
    // We need to unwrap it since we're sending single text
    const analysis = Array.isArray(result[0]) ? result[0] : result;

    return NextResponse.json({
      success: true,
      analysis,
      inputText: text,
    });

  } catch (error) {
    console.error('Error in analyze API:', error);

    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { success: false, error: 'Request timeout. The model is taking too long to respond. Please try again.' },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
