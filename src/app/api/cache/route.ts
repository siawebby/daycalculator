import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';

// Redis клиент
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
const TTL_DAYS = 60;
const TTL_SECONDS = TTL_DAYS * 24 * 60 * 60;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (!key) {
    return NextResponse.json(
      { error: 'Key parameter is required' },
      { status: 400 }
    );
  }

  try {
    const data = await redis.get(key);
    
    if (!data) {
      return NextResponse.json(
        { error: 'Cache entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: JSON.parse(data) });
  } catch (error) {
    console.error('Redis GET error:', error);
    return NextResponse.json(
      { error: 'Cache service unavailable' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, data } = body;

    if (!key || !data) {
      return NextResponse.json(
        { error: 'Key and data are required' },
        { status: 400 }
      );
    }

    // Сохраняем в Redis с TTL
    await redis.setex(key, TTL_SECONDS, JSON.stringify(data));

    const expiresAt = new Date(Date.now() + TTL_SECONDS * 1000).toISOString();

    return NextResponse.json({ 
      success: true, 
      expiresAt 
    });
  } catch (error) {
    console.error('Redis POST error:', error);
    return NextResponse.json(
      { error: 'Cache service unavailable' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (!key) {
    return NextResponse.json(
      { error: 'Key parameter is required' },
      { status: 400 }
    );
  }

  try {
    const deleted = await redis.del(key);
    return NextResponse.json({ 
      success: deleted > 0,
      message: deleted > 0 ? 'Entry deleted' : 'Entry not found'
    });
  } catch (error) {
    console.error('Redis DELETE error:', error);
    return NextResponse.json(
      { error: 'Cache service unavailable' },
      { status: 500 }
    );
  }
}
