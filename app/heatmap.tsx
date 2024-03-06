"use client"
import React, { useEffect, useRef } from 'react';
import h337 from 'heatmap.js';

const Heatmap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heatmapRef = useRef<any>(null);

  const handleMouseMove = (event: MouseEvent) => {
    heatmapRef.current.addData({
      x: event.clientX,
      y: event.clientY,
      value: 1,
    });
  };

  const handleClick = (event: MouseEvent) => {
    heatmapRef.current.addData({
      x: event.clientX,
      y: event.clientY,
      value: 100,
    });
  };

  const handleTouchStart = (event: TouchEvent) => {
    heatmapRef.current.addData({
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
      value: 1,
    });
  };

  const handleTouchMove = (event: TouchEvent) => {
    heatmapRef.current.addData({
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
      value: 1,
    });
  };

  const handleTouchEnd = (event: TouchEvent) => {
    heatmapRef.current.addData({
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY,
      value: 100,
    });
  };

  useEffect(() => {
    if (containerRef.current) {
      heatmapRef.current = h337.create({
        container: containerRef.current,
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

      containerRef.current.addEventListener('mousemove', handleMouseMove);
      containerRef.current.addEventListener('click', handleClick);
      containerRef.current.addEventListener('touchstart', handleTouchStart);
      containerRef.current.addEventListener('touchmove', handleTouchMove);
      containerRef.current.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('click', handleClick);
        containerRef.current.removeEventListener('touchstart', handleTouchStart);
        containerRef.current.removeEventListener('touchmove', handleTouchMove);
        containerRef.current.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default Heatmap;
