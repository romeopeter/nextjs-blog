import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const __filename = fileURLToPath(import.meta.url);
const __fileDirname = path.dirname(__filename);

const rootDirectory = path.resolve(path.dirname(__fileDirname));
const postsDirectory = path.join(rootDirectory, "blog");

export function getSortedBlogPostData() {
  // Get file names in "/blog" directory
  const fileNames = fs.readdirSync(postsDirectory);

  const postsData = fileNames.map((name) => {
    // Remove extension and use name as ID
    const id = name.replace(/\.md$/, "");

    // Read content as string
    const fullFilePath = path.join(postsDirectory, name);
    const fileContents = fs.readFileSync(fullFilePath, "utf-8");

    // Parse markdown file
    const matterResult = matter(fileContents);

    return {
      id,
      matterResult: matterResult,
    };
  });

  return JSON.stringify(postsData);
}

export function getAllBlogIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, "")
      }
    }
  });
}

export async function getAllBlogData(id) {
  const postFullPath = path.join(postsDirectory, `${id}.md`);
  const postContent = fs.readFileSync(postFullPath);

  // Parse markdown meta data
  const matterResult = matter(postContent, "utf-8");

  // Convert markdown to HTML using Remark
  const processContent = await remark().use(html).process(matterResult.content);
  const contentHTML = processContent.toString();

  return {
    id,
    contentHTML,
    ...matterResult.data,
  }
}