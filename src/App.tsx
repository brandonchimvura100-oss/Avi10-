import { useState, useEffect } from "react";

const initialSignals = [
  { id: 3, multiplier: "8.69X", time: "16:45:51" },
  { id: 4, multiplier: "3.44X", time: "16:47:49" },
  { id: 5, multiplier: "1.60X", time: "16:49:47" },
];

export default function App() {
  const [time, setTime] = useState("");
  const [signals, setSignals] = useState(initialSignals);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString("en-US", {
          timeZone: "Africa/Harare",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleGenerate = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setTimeout(() => {
      const newSignals = [];
      const d = new Date();
      // Generate the requested 60 signals
      for (let i = 6; i < 66; i++) {
        // Create realistic random multipliers
        const isHigh = Math.random() > 0.6;
        const rawMultiplier = isHigh
          ? Math.random() * 8 + 2
          : Math.random() * 0.9 + 1.01;
        const multiplier = rawMultiplier.toFixed(2) + "X";

        // Space out the times evenly
        const sigTime = new Date(d.getTime() + i * 120000);
        const timeStr = sigTime.toLocaleTimeString("en-US", {
          timeZone: "Africa/Harare",
          hour12: false,
        });

        newSignals.push({
          id: i,
          multiplier,
          time: timeStr,
        });
      }
      setSignals(newSignals);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-black font-sans py-12 px-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-yellow-500 text-4xl">⚡</span>
        <h1 className="text-red-600 text-5xl font-black tracking-widest uppercase">
          SIGNAL TIME
        </h1>
        <span className="text-yellow-500 text-4xl">⚡</span>
      </div>

      {/* Time Display */}
      <div className="flex items-center gap-2 mb-8">
        <span className="text-3xl">🇿🇼</span>
        <span className="text-white text-2xl font-bold">Zimbabwe</span>
        <span className="text-red-600 text-2xl font-bold">Time:</span>
        <span className="text-white text-2xl font-bold tracking-wider">
          {time || "16:47:52"}
        </span>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="flex justify-center items-center gap-3 w-full max-w-sm bg-red-600 hover:bg-red-700 active:scale-95 transition-transform rounded-2xl py-4 mb-8 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-white w-7 h-7 ${isGenerating ? "animate-spin" : ""}`}
        >
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
          <path d="M16 16h5v5" />
        </svg>
        <span className="text-white font-black text-xl tracking-wide uppercase">
          Generate 60 Signals
        </span>
      </button>

      {/* Signals List */}
      <div className="w-full max-w-sm border-2 border-red-600 rounded-xl bg-black overflow-y-auto max-h-[55vh]">
        {signals.map((sig, idx) => (
          <div
            key={idx}
            className={`grid grid-cols-3 px-4 py-4 items-center ${
              idx !== signals.length - 1 ? "border-b-2 border-red-600" : ""
            }`}
          >
            <span className="text-red-500 font-extrabold text-2xl text-left">
              #{sig.id}
            </span>
            <span className="text-[#ff9999] font-extrabold text-2xl text-center">
              {sig.multiplier}
            </span>
            <span className="text-red-500 font-extrabold text-2xl text-right">
              {sig.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
