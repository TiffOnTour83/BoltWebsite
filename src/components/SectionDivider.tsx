interface Props {
  flip?: boolean;
}

export default function SectionDivider({ flip }: Props) {
  return (
    <div className={`relative z-10 flex items-center justify-center py-1 px-6 ${flip ? 'scale-x-[-1]' : ''}`}>
      <div className="max-w-6xl w-full flex items-center gap-2 opacity-40">
        <div
          className="flex-1 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(58,1,92,0.40), transparent)' }}
        />
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 1C9 1 5 5 5 9C5 13 9 17 9 17C9 17 13 13 13 9C13 5 9 1 9 1Z"
            fill="none"
            stroke="#3a015c"
            strokeWidth="1"
            opacity="0.9"
          />
          <circle cx="9" cy="9" r="2" fill="#4f0147" opacity="0.8" />
        </svg>
        <div
          className="flex-1 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(58,1,92,0.40), transparent)' }}
        />
      </div>
    </div>
  );
}
