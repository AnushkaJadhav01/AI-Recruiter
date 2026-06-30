
type TimelineItem = {
  date: string
  title: string
  subtitle?: string
  description?: string
}

type TimelineProps = {
  items: TimelineItem[]
  className?: string
}

export const Timeline = ({ items, className = '' }: TimelineProps) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {items.map((item, idx) => (
        <div key={idx} className="relative flex gap-4">
          {/* Vertical Line */}
          {idx < items.length - 1 && (
            <span className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-gray-200" aria-hidden="true" />
          )}
          
          {/* Circular Indicator */}
          <div className="mt-1 w-6 h-6 rounded-full border-2 border-[#F97316] bg-white flex items-center justify-center shrink-0 z-10">
            <span className="w-2 h-2 rounded-full bg-[#F97316]" />
          </div>

          {/* Details */}
          <div className="flex-1 pb-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.date}</span>
            <h4 className="font-bold text-sm text-gray-900 mt-0.5">{item.title}</h4>
            {item.subtitle && <p className="text-xs font-semibold text-[#F97316] mt-0.5">{item.subtitle}</p>}
            {item.description && <p className="text-xs text-gray-500 mt-2 leading-relaxed">{item.description}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
