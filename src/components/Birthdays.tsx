
// src/components/Birthdays.tsx

import Image from "next/image";

const Birthdays = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm">
      {/* Top */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Birthdays</span>
      </div>

      {/* User 01 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src="https://images.pexels.com/photos/35496265/pexels-photo-35496265.jpeg" alt="Horizonte de Nova York à noite" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
          <span className="font-semibold">Angelina Jolie</span>
        </div>
        <div className="flex gap-3 justify-end">
          <button className="bg-blue-500 text-white text-xs px-2 ">Celebrate</button>
        </div>
      </div>
    </div>
  );
};

export default Birthdays;
