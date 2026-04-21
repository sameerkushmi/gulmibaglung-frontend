function RingInfoCell({ label, value }) {
  return (
    <div className="flex min-h-[74px] flex-col items-center justify-center border-r border-[#d4af37] px-2 text-center">
      <p className="text-[12px] font-medium text-[#6d6282]">{label}</p>
      <p className="mt-1 text-[20px] font-bold text-[#2e2148] leading-tight">
        {value || "N/A"}
      </p>
    </div>
  );
}

export default RingInfoCell;