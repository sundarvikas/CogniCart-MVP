export default function Loader() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="glass-card border border-primary/30 p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-primary border-r-primary rounded-full animate-spin-slow"></div>
          </div>
          <p className="text-foreground font-medium">Processing...</p>
        </div>
      </div>
    </div>
  );
}
