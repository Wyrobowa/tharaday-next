'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box } from 'tharaday';

import { FeaturedGenresSection } from '@/app/_components/home/FeaturedGenresSection';
import { FeaturedTitlesSection } from '@/app/_components/home/FeaturedTitlesSection';
import { HeroSection } from '@/app/_components/home/HeroSection';
import { MarketplaceSnapshotCard } from '@/app/_components/home/MarketplaceSnapshotCard';
import { NewArrivalsCard } from '@/app/_components/home/NewArrivalsCard';
import { SellerSpotlightCard } from '@/app/_components/home/SellerSpotlightCard';
import { apiGet } from '@/lib/api';
import { BookRecord } from '@/types/api';

export default function HomePage() {
  const [books, setBooks] = useState<BookRecord[]>([]);

  useEffect(() => {
    let isMounted = true;
    apiGet<BookRecord[]>('/api/books')
      .then((data) => {
        if (isMounted) {
          setBooks(data);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredBooks = books.slice(0, 3);
  const newArrivals = books.slice(3, 8);
  const featuredGenres = useMemo(() => {
    const typeSet = new Set<string>();
    books.forEach((book) => {
      if (book.type) {
        typeSet.add(book.type);
      }
    });
    return Array.from(typeSet).slice(0, 8);
  }, [books]);

  return (
    <Box paddingY={8} display="flex" flexDirection="column" gap={10}>
      <Box display="grid" gridTemplateColumns="1.2fr 0.8fr" gap={8}>
        <HeroSection />
        <MarketplaceSnapshotCard />
      </Box>

      <FeaturedGenresSection genres={featuredGenres} />

      <FeaturedTitlesSection books={featuredBooks} />

      <Box display="grid" gridTemplateColumns="1.1fr 0.9fr" gap={8}>
        <NewArrivalsCard books={newArrivals} />
        <SellerSpotlightCard />
      </Box>
    </Box>
  );
}
