import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="ball w-[120px] h-[120px] p-[6px] rounded-full shadow-[inset_0_0_20px_-5px_#fff,inset_0_-40px_40px_-20px_#fff] relative">
        <div className="wave-container absolute inset-0 rounded-full overflow-hidden">
          <div className="wave animate-wave"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;