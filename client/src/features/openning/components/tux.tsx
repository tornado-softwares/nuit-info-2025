export function Tux() {
  return (
    <div className="sprite-container relative z-10 animate-float">
        <img
        src="/tux/tux-hello.gif"
        alt="Tuw"
        className="h-32 w-32 sm:h-48 sm:w-48 object-contain"
        />
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
