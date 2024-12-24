<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Services\GuardianService;
use App\Services\NewsApiService;
use App\Services\NytService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Http\JsonResponse;

class ArticleController extends Controller
{
    // Fetch filtered articles
    public function index(Request $request)
    {
        $query = Article::query();

        // Search by title
        if ($request->has('search') && $request->search != '') {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        // Filter by categories
        if ($request->has('categories') && !empty($request->categories)) {
            $query->whereIn('category', $request->categories);
        }

        // Filter by sources
        if ($request->has('sources') && !empty($request->sources)) {
            $query->whereIn('source', $request->sources);
        }

        // Filter by authors
        if ($request->has('authors') && !empty($request->authors)) {
            $query->whereIn('author', $request->authors);
        }

        // Filter by published_at date
        if ($request->has('published_at') && $request->published_at != '') {
            $query->whereDate('published_at', $request->published_at);
        }

        // Get the filtered articles/Paginate results
        $articles = $query->orderBy('published_at', 'desc')->paginate(10);

        return response()->json($articles);
    }

    // Fetch article details
    public function getArticle($id)
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json(['message' => 'Article not found'], 404);
        }

        return response()->json($article);
    }

    // Fetch articles from API
    public function fetchArticles(GuardianService $guardianService, NewsApiService $newsApiService, NytService $nytService): JsonResponse
    {
        // Check if the 'articles' table exists
        if (!Schema::hasTable('articles')) {
            return response()->json(['message' => 'Articles table does not exist'], 400);
        }

        // Fetch articles from the Guardian API
        $guardianArticles = $guardianService->fetchArticles();
        $this->storeArticles($guardianArticles, 'The Guardian');

        // Fetch articles from the NewsAPI
        $newsApiArticles = $newsApiService->fetchArticles();
        $this->storeArticles($newsApiArticles, 'NewsAPI');

        // Fetch articles from the New York Times API
        $nytArticles = $nytService->fetchArticles();
        $this->storeArticles($nytArticles, 'New York Times');

        return response()->json(['message' => 'Articles fetched and updated successfully']);
    }

    /**
     * Store articles in the database.
     *
     * @param array $articles
     * @param string $source
     * @return void
     */
    private function storeArticles(array $articles, string $source): void
    {
        foreach ($articles as $articleData) {
            Article::updateOrCreate(
                ['url' => $articleData['url']],
                [
                    'title' => $articleData['title'] ?? null,
                    'content' => $articleData['content'] ?? null,
                    'category' => $articleData['category'] ?? null,
                    'url' => $articleData['url'] ?? null,
                    'source' => $source,
                    'author' => $articleData['author'] ?? null,
                    'image' => $articleData['image'] ?? null,
                    'published_at' => $articleData['published_at'] ?? null,
                ]
            );
        }
    }

    // Fetch unique categories, sources and authors
    public function getFilters()
    {
        $categories = Article::distinct()->pluck('category')->filter();
        $sources = Article::distinct()->pluck('source')->filter();
        $authors = Article::distinct()->pluck('author')->filter();

        return response()->json([
            'categories' => $categories,
            'sources' => $sources,
            'authors' => $authors,
        ]);
    }
}
