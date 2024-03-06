"use client"
import React, { useEffect, useRef } from 'react';
import h337 from 'heatmap.js';

const Heatmap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heatmapRef = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Cria uma instância de heatmap
      heatmapRef.current = h337.create({
        container: containerRef.current,
        maxOpacity: .6,
        radius: 50,
        blur: .90,
        backgroundColor: 'transparent', // Define o fundo como transparente
        gradient: {
          // The gradient will transition from blue to green to red
          .3: 'blue',
          .65: 'lime',
          1: 'red'
        }
      });

      // Adiciona um ouvinte de evento para rastrear a posição do mouse
      containerRef.current.addEventListener('mousemove', handleMouseMove);
      containerRef.current.addEventListener('click', handleClick);
    }

    return () => {
      if (containerRef.current) {
        // Remove o ouvinte de evento quando o componente é desmontado
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('click', handleClick);
      }
    };
  }, []);

  const handleMouseMove = (event: MouseEvent) => {
    // Adiciona o ponto de dados da posição atual do mouse ao heatmap
    heatmapRef.current.addData({
      x: event.clientX,
      y: event.clientY,
      value: 1,
    });
  };

  const handleClick = (event: MouseEvent) => {
    // Adiciona um ponto de dados de valor alto na posição do clique
    heatmapRef.current.addData({
      x: event.clientX,
      y: event.clientY,
      value: 100, // Este valor será renderizado como vermelho
    });
  };

  return <div ref={containerRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default Heatmap;
