export default function BlurOrbs() {
  return (
    <>
      {/* Blue Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
      <div 
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse" 
        style={{ animationDelay: '1s' }} 
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-[150px] animate-pulse" 
        style={{ animationDelay: '2s' }} 
      />
    </>
  );
}
