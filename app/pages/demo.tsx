'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle, PauseCircle, Zap, Shield, Coins, Users, Volume2, VolumeX } from 'lucide-react';
import Newsletter from '@/components/ui/layout/newsletter';
import { Slider } from '@/components/ui/slider';

export default function DemoPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const updateTime = () => setCurrentTime(video.currentTime);
      video.addEventListener('timeupdate', updateTime);
      return () => video.removeEventListener('timeupdate', updateTime);
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0];
    setVolume(volumeValue);
    if (videoRef.current) {
      videoRef.current.volume = volumeValue;
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (newTime: number[]) => {
    const seekTime = newTime[0];
    setCurrentTime(seekTime);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const features = [
    {
      title: "Lightning Fast",
      description: "Experience near-instantaneous transactions on the Solana blockchain.",
      icon: Zap,
    },
    {
      title: "Secure",
      description: "Advanced security measures protect your assets and transactions.",
      icon: Shield,
    },
    {
      title: "Cost-Effective",
      description: "Minimal fees for all transactions, saving you money.",
      icon: Coins,
    },
    {
      title: "User-Friendly",
      description: "Intuitive interface for both developers and end-users.",
      icon: Users,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8 font-syne">
        Experience BARK BLINK in Action
      </h1>
      <p className="text-xl text-gray-600 text-center mb-12 font-syne">
        Watch our demo video to see how BARK BLINK revolutionizes blockchain interactions.
      </p>
      <div className="relative mb-16 bg-gray-100 rounded-lg overflow-hidden shadow-xl">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster="/placeholder.svg?height=720&width=1280"
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        >
          <source src="/demo-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <Button
            onClick={togglePlay}
            variant="ghost"
            size="icon"
            className="w-20 h-20 text-white bg-gray-900 bg-opacity-50 hover:bg-opacity-75 transition-all duration-300 rounded-full"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <PauseCircle className="w-12 h-12" />
            ) : (
              <PlayCircle className="w-12 h-12" />
            )}
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 text-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
            <div className="flex items-center space-x-4">
              <Button
                onClick={toggleMute}
                variant="ghost"
                size="icon"
                className="text-white hover:text-gray-300"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
              </Button>
              <div className="w-24">
                <Slider
                  value={[volume]}
                  min={0}
                  max={1}
                  step={0.1}
                  onValueChange={handleVolumeChange}
                  aria-label="Adjust volume"
                />
              </div>
            </div>
          </div>
          <Slider
            value={[currentTime]}
            min={0}
            max={duration}
            step={1}
            onValueChange={handleSeek}
            aria-label="Seek video"
          />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 font-syne">
        Key Features Demonstrated
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {features.map((feature, index) => (
          <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <feature.icon className="w-12 h-12 text-[#D0BFB4] mb-4" />
              <CardTitle className="text-xl font-bold text-gray-900 font-syne">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 font-syne">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-8 mb-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 font-syne">What You'll See in the Demo</h3>
        <ul className="space-y-4 text-gray-700 font-syne">
          <li className="flex items-start">
            <svg className="w-6 h-6 text-[#D0BFB4] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Seamless creation and execution of blockchain transactions</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-[#D0BFB4] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Real-time transaction monitoring and confirmation</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-[#D0BFB4] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Integration with popular Solana wallets</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-[#D0BFB4] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Advanced features like multi-signature transactions and programmable payments</span>
          </li>
        </ul>
      </div>

      <div className="text-center mb-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 font-syne">Ready to Transform Your Blockchain Experience?</h3>
        <p className="text-gray-600 mb-8 font-syne">
          Join BARK BLINK today and start leveraging the power of seamless blockchain interactions for your projects and applications.
        </p>
        <Button asChild className="bg-[#D0BFB4] hover:bg-[#C0AFA4] text-gray-800 font-syne px-8 py-3 rounded-full text-lg">
          <a href="/sign-up">Get Started with BARK BLINK</a>
        </Button>
      </div>

      <Newsletter />

      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 font-syne">Have Questions?</h3>
          <p className="text-gray-600 mb-4 font-syne">
            Our team is here to help you get started with BARK BLINK. Feel free to reach out for more information or personalized demonstrations.
          </p>
          <Button asChild variant="outline" className="font-syne">
            <a href="/contact">Contact Us</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}