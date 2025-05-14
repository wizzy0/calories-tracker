# Calories Tracker App

Aplikasi pencatat kalori harian menggunakan Next.js, React, dan Supabase.

## Fitur

- Pencatatan kalori makanan harian
- Melihat riwayat kalori
- Menghapus catatan kalori
- Data tersimpan secara persisten menggunakan Supabase

## Teknologi yang Digunakan

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Supabase

## Cara Menjalankan Aplikasi

1. Clone repository ini
```bash
git clone [URL_REPOSITORY]
```

2. Install dependencies
```bash
npm install
```

3. Setup Supabase
- Buat project di Supabase
- Buat tabel dengan SQL berikut:
```sql
create table calories (
  id uuid default uuid_generate_v4() primary key,
  food_name text not null,
  calories integer not null,
  date date not null,
  time time not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table calories enable row level security;

create policy "Allow anonymous access"
  on calories
  for all
  to anon
  using (true)
  with check (true);
```

4. Jalankan aplikasi
```bash
npm run dev
```

5. Buka [http://localhost:3000](http://localhost:3000) di browser Anda

## Environment Variables

Buat file `.env.local` di root proyek dan isi dengan:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
