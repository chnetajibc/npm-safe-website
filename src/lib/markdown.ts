import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content');

export function getPostBySlug(slug: string, folder: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(contentDirectory, folder, `${realSlug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: data,
    content,
  };
}

export function getAllPosts(folder: string) {
  const dirPath = path.join(contentDirectory, folder);
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  const slugs = fs.readdirSync(dirPath);
  const posts = slugs
    .filter((slug) => slug.endsWith('.md'))
    .map((slug) => getPostBySlug(slug, folder))
    .filter((post) => post !== null)
    .sort((post1, post2) => {
      if (post1.meta.order !== undefined && post2.meta.order !== undefined) {
        return post1.meta.order - post2.meta.order;
      }
      return post1.meta.date > post2.meta.date ? -1 : 1;
    });
  return posts;
}
