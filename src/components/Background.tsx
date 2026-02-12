import backgroundPattern from '../assets/background-creme-cookie.png';

export function Background() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none opacity-30 z-0"
      style={{
        backgroundImage: `url(${backgroundPattern})`,
        backgroundPosition: 'center',
        backgroundSize: '40%',
        backgroundRepeat: 'repeat',
      }}
    />
  );
}
