"use client"
import { useEffect, useRef, useState } from 'react';
import h337 from 'heatmap.js';

export default function Heatmap() {
  const heatmapRef = useRef(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/heatmap')
      .then(response => response.json())
      .then(data => {
        setData(data); // Store the data in state

        if (heatmapRef.current) {
          const heatmap = h337.create({
            container: heatmapRef.current,
            maxOpacity: .6,
            radius: 50,
            blur: .90,
            backgroundColor: 'transparent',
            gradient: {
              .3: 'blue',
              .65: 'lime',
              1: 'red'
            }
          });

          heatmap.setData({
            max: data.reduce((max: number, point: { value: number; }) => Math.max(max, point.value), 0),
            data: data.map((point: { x: any; y: any; value: any; }) => ({ x: point.x, y: point.y, value: point.value })),
            min: 0
          });
        }
      });
  }, []);

  return (
    <main>
      <div ref={heatmapRef} style={{ width: '100vw', height: '100vh' }}></div>
      {/* Render the data as JSON */}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </main>
  );
}

