// pages/api/heatmap.ts

import { NextRequest, NextResponse } from 'next/server';

interface HeatMap {
  id: number;
  x: number;
  y: number;
  value: number;
  domain: string;
  ip: string;
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const response = await fetch('https://heat-map-analytics-api.vercel.app/api/v1/heatmaps');
    const data: HeatMap[] = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
