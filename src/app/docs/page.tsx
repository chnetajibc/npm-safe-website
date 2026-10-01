import { redirect } from 'next/navigation';

export default function DocsIndexPage(): never {
  redirect('/docs/overview');
}
