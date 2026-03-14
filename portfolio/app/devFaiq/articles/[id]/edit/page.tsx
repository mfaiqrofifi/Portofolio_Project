import { notFound } from "next/navigation";
import { getArticleById } from "@/lib/queries/articles";
import ArticleForm from "@/components/admin/ArticleForm";

interface Props {
  params: { id: string };
}

export default async function EditArticlePage({ params }: Props) {
  const article = await getArticleById(params.id);
  if (!article) notFound();

  return (
    <div>
      <h1
        className="font-mono text-sm mb-6"
        style={{ color: "var(--foreground)" }}
      >
        edit article
      </h1>
      <ArticleForm article={article} />
    </div>
  );
}
