import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
}

export const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeAlt = 'Before',
  afterAlt = 'After',
}: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  return (
    <Card className="relative w-full overflow-hidden select-none cursor-col-resize group">
      <div
        className="relative aspect-[16/9]"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0">
          <img
            src={afterImage}
            alt={afterAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
            After
          </div>
        </div>

        {/* Before Image (Overlay with clip) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt={beforeAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm font-semibold">
            Before
          </div>
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-col-resize"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Slider Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <div className="flex gap-1">
              <div className="w-0.5 h-6 bg-gray-400"></div>
              <div className="w-0.5 h-6 bg-gray-400"></div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
