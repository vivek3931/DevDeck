import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, method = 'GET', headers = {}, payload } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const fetchOptions: RequestInit = {
      method,
      headers: new Headers(headers),
    };

    if (method !== 'GET' && method !== 'HEAD' && payload) {
      fetchOptions.body = typeof payload === 'string' ? payload : JSON.stringify(payload);
    }

    const startTime = Date.now();
    const response = await fetch(url, fetchOptions);
    const endTime = Date.now();
    
    const timeTaken = endTime - startTime;

    // Read response body as text to handle both JSON and plain text gracefully
    const responseText = await response.text();
    let responseData = responseText;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      // Keep as text if it's not JSON
    }

    // Extract headers safely
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      data: responseData,
      time: timeTaken,
    });
  } catch (error: any) {
    console.error('Proxy error:', error);
    return NextResponse.json({
      error: error.message || 'Failed to fetch the URL',
      status: 500,
    }, { status: 500 });
  }
}
