<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class NewsApiService
{
    /**
     * Fetch articles from The Guardian API and normalize the data.
     *
     * @return array
     */
    public function fetchArticles(): array
    {
        // Call the NewsAPI endpoint
        $response = Http::get('https://newsapi.org/v2/top-headlines', [
            'apiKey' => config('app.news_api_key'),
            'country' => 'us',
        ]);

        if ($response->failed()) {
            return [];
        }

        $articles = $response->json()['articles'] ?? [];

        return array_map(function ($article) {
            return [
                'title' => $article['title'] ?? null,
                'content' => $article['content'] ?? null,
                'category' => $article['source']['name'] ?? null,
                'url' => $article['url'] ?? null,
                'author' => $article['author'] ?? null,
                'image' => $article['urlToImage'] ?? null,
                'published_at' => $article['publishedAt'] ?? null,
            ];
        }, $articles);
    }
}
