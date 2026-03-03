export function TransparencyItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-brand-purple mt-1.5 shrink-0" />
      <p className="text-sm text-gray-400 leading-snug">{text}</p>
    </li>
  );
}
