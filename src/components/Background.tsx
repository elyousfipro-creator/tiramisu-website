import logoBg from '../assets/logo-bg.png';

export function Background() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none opacity-20 z-0"
      style={{
        backgroundImage: `url(${logoBg})`,
        backgroundPosition: 'center',
        backgroundSize: '35%',
        backgroundRepeat: 'repeat',
      }}
    />
  );
}
