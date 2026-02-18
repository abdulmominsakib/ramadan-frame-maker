"use client";

import { useState, useRef, useEffect } from "react";
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  ImageUploadIcon as UploadIcon, 
  Download01Icon as DownloadIcon, 
  ZoomInAreaIcon as ZoomInIcon, 
  ZoomOutAreaIcon as ZoomOutIcon,
  RefreshIcon as ResetIcon
} from '@hugeicons/core-free-icons';

export default function FrameMaker() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const FRAMES = [
    { id: 1, src: `${basePath}/frame_1.png`, name: "Style 1" },
    { id: 2, src: `${basePath}/frame_2.png`, name: "Style 2" },
    { id: 3, src: `${basePath}/frame_3.png`, name: "Style 3" },
    { id: 4, src: `${basePath}/frame_4.png`, name: "Style 4" },
  ];
  const [selectedFrame, setSelectedFrame] = useState(FRAMES[0].src);

  const CANVAS_SIZE = 800; // Square canvas for high quality

  // Load frame initially
  const [frameImg, setFrameImg] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = selectedFrame;
    img.onload = () => {
      setFrameImg(img);
    };
  }, [selectedFrame]);

  const handleDraw = () => {
    const canvas = canvasRef.current;
    if (!canvas || !frameImg) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // 1. Draw User Image (Background)
    if (image) {
      ctx.save();
      // Center the image scaling
      const centerX = CANVAS_SIZE / 2;
      const centerY = CANVAS_SIZE / 2;
      
      ctx.translate(centerX + position.x, centerY + position.y);
      ctx.scale(scale, scale);
      ctx.translate(-(image.width / 2), -(image.height / 2));
      
      ctx.drawImage(image, 0, 0);
      ctx.restore();
    } else {
      // Placeholder background
      ctx.fillStyle = "#f3f4f6";
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      ctx.fillStyle = "#9ca3af";
      ctx.font = "bold 30px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Upload your photo", CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    }

    // 2. Draw Frame (Foreground)
    ctx.drawImage(frameImg, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
  };

  useEffect(() => {
    handleDraw();
  }, [image, scale, position, frameImg]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Reset state for new image
          setImage(img);
          setScale(Math.max(CANVAS_SIZE / img.width, CANVAS_SIZE / img.height));
          setPosition({ x: 0, y: 0 });
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement("a");
    link.download = "ramadan-frame.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // Mouse/Touch Handlers for Dragging
  const getClientPos = (e: React.MouseEvent | React.TouchEvent) => {
    if ("touches" in e) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: (e as React.MouseEvent).clientX, y: (e as React.MouseEvent).clientY };
  };

  const onMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (!image) return;
    setIsDragging(true);
    setDragStart(getClientPos(e));
  };

  const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !image) return;
    e.preventDefault(); // Prevent scrolling on touch
    const pos = getClientPos(e);
    const dx = pos.x - dragStart.x;
    const dy = pos.y - dragStart.y;
    
    setPosition(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    setDragStart(pos);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col items-center gap-10 p-4 md:p-6 max-w-4xl mx-auto w-full font-sans text-slate-800">
      
      {/* Canvas & Controls */}
      <div className="w-full max-w-xl flex flex-col gap-6">
        {/* Canvas Container */}
        <div 
          className="relative w-full aspect-square bg-slate-50 rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-4 ring-slate-200 cursor-move"
          onTouchStart={onMouseDown}
          onMouseDown={onMouseDown}
          onTouchMove={onMouseMove}
          onMouseMove={onMouseMove}
          onTouchEnd={onMouseUp}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <canvas 
            ref={canvasRef} 
            width={CANVAS_SIZE} 
            height={CANVAS_SIZE} 
            className="w-full h-full object-contain pointer-events-none" 
          />
          
          {!image && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-2xl shadow-[0_4px_0_#1e40af] active:shadow-none active:translate-y-[4px] transition-all flex items-center gap-2 pointer-events-auto transform hover:scale-105"
                >
                 <HugeiconsIcon icon={UploadIcon} size={24} />
                 Upload Photo
               </button>
            </div>
          )}
        </div>

        {/* Controls */}
        {image && (
          <div className="flex flex-col gap-4 w-full bg-white p-6 rounded-3xl shadow-xl border-2 border-gray-100">
            
            {/* Controls Row 1: Zoom */}
            <div className="flex items-center gap-4 text-slate-400">
              <HugeiconsIcon icon={ZoomOutIcon} />
              <input 
                type="range" 
                min="0.1" 
                max="3" 
                step="0.05" 
                value={scale} 
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full accent-blue-600 h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <HugeiconsIcon icon={ZoomInIcon} />
            </div>

            {/* Controls Row 2: Action Buttons */}
            <div className="flex gap-3 justify-center mt-2 flex-wrap">
              <button 
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                  setImage(null);
                }}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 px-5 rounded-2xl shadow-[0_4px_0_#94a3b8] active:shadow-none active:translate-y-[4px] transition-all flex items-center gap-2"
              >
                <HugeiconsIcon icon={ResetIcon} size={20} />
                Reset
              </button>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-5 rounded-2xl shadow-[0_4px_0_#0ea5e9] active:shadow-none active:translate-y-[4px] transition-all flex items-center gap-2"
              >
                <HugeiconsIcon icon={UploadIcon} size={20} />
                Change
              </button>
              <button 
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-2xl shadow-[0_4px_0_#1e40af] active:shadow-none active:translate-y-[4px] transition-all flex items-center gap-2"
              >
                <HugeiconsIcon icon={DownloadIcon} size={20} />
                Download
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Frame Selection */}
      <div className="w-full max-w-2xl flex flex-col gap-4">
         <h3 className="text-xl font-bold text-slate-700 text-center">Choose Frame Style</h3>
         
         <div className="flex justify-center flex-wrap gap-4 p-4">
             {FRAMES.map((frame) => (
               <button
                 key={frame.id}
                 onClick={() => setSelectedFrame(frame.src)}
                 className={`relative w-24 h-24 rounded-2xl border-4 transition-all duration-300 overflow-hidden flex-shrink-0 ${
                   selectedFrame === frame.src 
                     ? "border-blue-500 ring-4 ring-blue-100 scale-105 shadow-xl" 
                     : "border-slate-200 hover:border-blue-300 hover:scale-105"
                 }`}
               >
                 <img 
                  src={frame.src} 
                  alt={frame.name} 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                 />
                 {selectedFrame === frame.src && (
                   <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                     <div className="bg-blue-500 text-white p-1 rounded-full shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                       </svg>
                     </div>
                   </div>
                 )}
               </button>
             ))}
         </div>
      </div>


  



      {/* Hidden Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        accept="image/*" 
        className="hidden" 
      />
    </div>
  );
}
