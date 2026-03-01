import { Box, Text } from 'tharaday';

type BookCoverProps = {
  id: number;
  title: string;
  author?: string;
  size?: 'sm' | 'md' | 'lg';
};

const BOOK_COVER_SIZES = {
  sm: { width: 120, height: 180, titleVariant: 'body-sm' as const },
  md: { width: 120, height: 180, titleVariant: 'body-sm' as const },
  lg: { width: 220, height: 330, titleVariant: 'h4' as const },
} as const;

function clampWords(value: string, wordsCount: number) {
  return value.trim().split(/\s+/).slice(0, wordsCount).join(' ');
}

function buildCoverColors(seedValue: number) {
  const hue = (seedValue * 47) % 360;
  const hueAlt = (hue + 36) % 360;

  return {
    background: `linear-gradient(145deg, hsl(${hue} 70% 46%), hsl(${hueAlt} 62% 30%))`,
    accent: `hsl(${(hue + 12) % 360} 85% 92% / 0.2)`,
  };
}

export function BookCover({ id, title, author, size = 'md' }: BookCoverProps) {
  const seed = id || title.length || 1;
  const colors = buildCoverColors(seed);
  const sizeStyle = BOOK_COVER_SIZES[size];

  return (
    <Box
      style={{
        width: `${sizeStyle.width}px`,
        height: `${sizeStyle.height}px`,
        minWidth: `${sizeStyle.width}px`,
        flexShrink: 0,
        borderRadius: '12px',
        background: colors.background,
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '12px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 24px rgba(0, 0, 0, 0.22)',
        border: '1px solid rgba(255, 255, 255, 0.26)',
      }}
    >
      <Box
        style={{
          position: 'absolute',
          inset: '-30% -45% auto auto',
          width: '90px',
          height: '90px',
          borderRadius: '999px',
          background: colors.accent,
          filter: 'blur(1px)',
          pointerEvents: 'none',
        }}
      />

      <Box display="flex" flexDirection="column" gap={1} style={{ zIndex: 1 }}>
        <Text
          variant={sizeStyle.titleVariant}
          weight="bold"
          style={{
            lineHeight: 1.2,
            textShadow: '0 1px 8px rgba(0, 0, 0, 0.25)',
          }}
        >
          {clampWords(title || 'Untitled', size === 'sm' ? 5 : 8)}
        </Text>
      </Box>

      <Box display="flex" flexDirection="column" gap={1} style={{ zIndex: 1 }}>
        <Text
          variant="body-sm"
          style={{
            opacity: 0.95,
            textShadow: '0 1px 6px rgba(0, 0, 0, 0.2)',
            fontSize: '12px',
          }}
        >
          {clampWords(author || 'Unknown author', 4)}
        </Text>
      </Box>
    </Box>
  );
}
