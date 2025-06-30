import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Heart, Download, Maximize2 } from 'lucide-react';

// Mock data for media files
const mediaFiles = [
  {
    id: 1,
    type: 'image',
    url: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    title: 'Cyberpunk Cityscape',
    category: 'Photography'
  },
  {
    id: 2,
    type: 'video',
    url: 'https://images.pexels.com/photos/2832432/pexels-photo-2832432.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    title: 'Neon Lights Motion',
    category: 'Video'
  },
  {
    id: 3,
    type: 'image',
    url: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    title: 'Digital Art Vibes',
    category: 'Digital Art'
  },
  {
    id: 4,
    type: 'video',
    url: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    title: 'Abstract Animations',
    category: 'Animation'
  },
  {
    id: 5,
    type: 'image',
    url: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    title: 'Futuristic Interface',
    category: 'UI Design'
  },
  {
    id: 6,
    type: 'video',
    url: 'https://images.pexels.com/photos/2832432/pexels-photo-2832432.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    title: 'Holographic Elements',
    category: 'VFX'
  }
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const currentFile = mediaFiles[currentIndex];

  const nextFile = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaFiles.length);
  };

  const prevFile = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaFiles.length) % mediaFiles.length);
  };

  const goToFile = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextFile();
      if (e.key === 'ArrowLeft') prevFile();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Subtle Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/10 via-black to-cyan-900/10"></div>

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-light bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Gallery
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Carousel Thumbnails */}
          <div className="flex justify-center">
            <div className="flex space-x-3 p-4 bg-gray-900/50 rounded-2xl border border-gray-800 backdrop-blur-sm">
              {mediaFiles.map((file, index) => (
                <button
                  key={file.id}
                  onClick={() => goToFile(index)}
                  className={`relative group transition-all duration-300 ${
                    index === currentIndex 
                      ? 'ring-2 ring-cyan-400 shadow-lg shadow-cyan-400/25 scale-110' 
                      : 'hover:scale-105 opacity-60 hover:opacity-100'
                  } rounded-lg overflow-hidden`}
                >
                  <img
                    src={file.url}
                    alt={file.title}
                    className="w-16 h-12 object-cover"
                  />
                  {file.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-3 h-3 text-white opacity-80" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Main Media Display */}
          <div className="flex justify-center">
            <div className="relative max-w-4xl w-full">
              
              {/* Navigation Buttons */}
              <button
                onClick={prevFile}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 border border-gray-700 hover:border-cyan-400/50 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/25 backdrop-blur-sm"
              >
                <ChevronLeft className="w-6 h-6 text-cyan-400" />
              </button>
              
              <button
                onClick={nextFile}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 border border-gray-700 hover:border-cyan-400/50 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/25 backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6 text-cyan-400" />
              </button>

              {/* Media Container */}
              <div className="relative bg-gray-900/30 rounded-2xl overflow-hidden border border-gray-800 backdrop-blur-sm">
                
                {/* Media Content */}
                <div className="relative aspect-video">
                  <img
                    src={currentFile.url}
                    alt={currentFile.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Video Play Button */}
                  {currentFile.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-4 rounded-full bg-black/60 border border-gray-600 hover:border-cyan-400/50 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/25 backdrop-blur-sm"
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8 text-cyan-400" />
                        ) : (
                          <Play className="w-8 h-8 text-cyan-400 ml-1" />
                        )}
                      </button>
                    </div>
                  )}
                  
                  {/* Bottom Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <h2 className="text-2xl font-light text-white mb-1">
                          {currentFile.title}
                        </h2>
                        <p className="text-gray-400 text-sm">{currentFile.category}</p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setIsLiked(!isLiked)}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            isLiked 
                              ? 'bg-pink-500/20 border border-pink-400/50 text-pink-400 shadow-lg shadow-pink-400/25' 
                              : 'bg-black/30 border border-gray-600 text-gray-400 hover:text-white hover:border-gray-500'
                          } backdrop-blur-sm`}
                        >
                          <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
                        </button>
                        
                        <button className="p-2 rounded-lg bg-black/30 border border-gray-600 text-gray-400 hover:text-white hover:border-gray-500 transition-all duration-200 backdrop-blur-sm">
                          <Download className="w-5 h-5" />
                        </button>
                        
                        <button className="p-2 rounded-lg bg-black/30 border border-gray-600 text-gray-400 hover:text-white hover:border-gray-500 transition-all duration-200 backdrop-blur-sm">
                          <Maximize2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{currentIndex + 1}</span>
              <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / mediaFiles.length) * 100}%` }}
                ></div>
              </div>
              <span>{mediaFiles.length}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;