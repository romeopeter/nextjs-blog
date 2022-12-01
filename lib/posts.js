import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

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