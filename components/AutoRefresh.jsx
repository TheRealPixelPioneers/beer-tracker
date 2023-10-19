"use client"

import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function AutoRefresh() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const router = useRouter();

  React.useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'beers',
        },
        (payload) => {
          console.log('Change in beers registered!');
          router.refresh();
        }
      )
      .subscribe();
      console.log('Listening for changes');

    return () => supabase.removeChannel(channel);
  }, [supabase, router]);

  return null;
}