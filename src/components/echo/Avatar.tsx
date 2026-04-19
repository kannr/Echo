interface Props { name: string; emoji?: string; size?: number; ring?: boolean; }

const palette = [
  "from-[hsl(22_55%_62%)] to-[hsl(28_60%_75%)]",
  "from-[hsl(38_55%_62%)] to-[hsl(45_60%_78%)]",
  "from-[hsl(15_50%_58%)] to-[hsl(22_55%_72%)]",
  "from-[hsl(30_18%_55%)] to-[hsl(30_20%_72%)]",
  "from-[hsl(8_55%_55%)]  to-[hsl(20_55%_72%)]",
];

const Avatar = ({ name, emoji, size = 44, ring }: Props) => {
  const idx = (name.charCodeAt(0) + (name.charCodeAt(1) || 0)) % palette.length;
  return (
    <div
      className={`rounded-2xl bg-gradient-to-br ${palette[idx]} flex items-center justify-center text-primary-foreground shrink-0 ${
        ring ? "ring-2 ring-primary/30" : ""
      }`}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      <span className="font-medium select-none">{emoji ?? name.slice(0, 1)}</span>
    </div>
  );
};

export default Avatar;
