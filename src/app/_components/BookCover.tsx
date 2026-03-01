import { Box, Text } from 'tharaday';

import styles from './BookCover.module.css';

type BookCoverProps = {
  id: number;
  title: string;
  author?: string;
  badge?: string;
  size?: 'sm' | 'md' | 'lg';
};

const COLOR_CLASSES = [
  styles.color0,
  styles.color1,
  styles.color2,
  styles.color3,
  styles.color4,
  styles.color5,
  styles.color6,
  styles.color7,
  styles.color8,
  styles.color9,
  styles.color10,
  styles.color11,
] as const;

function clampWords(value: string, wordsCount: number) {
  return value.trim().split(/\s+/).slice(0, wordsCount).join(' ');
}

export function BookCover({
  id,
  title,
  author,
  badge,
  size = 'md',
}: BookCoverProps) {
  const seed = id || title.length || 1;
  const colorClass = COLOR_CLASSES[seed % COLOR_CLASSES.length];
  const sizeClass =
    size === 'lg'
      ? styles.sizeLg
      : size === 'sm'
        ? styles.sizeSm
        : styles.sizeMd;

  return (
    <Box className={`${styles.root} ${colorClass} ${sizeClass}`}>
      <Box
        display="flex"
        flexDirection="column"
        gap={1}
        className={styles.textWrap}
      >
        <Text
          variant={size === 'lg' ? 'h4' : 'body-sm'}
          weight="bold"
          className={styles.title}
        >
          {clampWords(title || 'Untitled', size === 'sm' ? 5 : 8)}
        </Text>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        gap={1}
        className={styles.meta}
      >
        {badge ? (
          <Text variant="body-sm" className={styles.badge}>
            {badge}
          </Text>
        ) : null}

        <Text variant="body-sm" className={styles.author}>
          {clampWords(author || 'Unknown author', 4)}
        </Text>
      </Box>
    </Box>
  );
}
