<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class NytService
{
    /**
     * Fetch articles from The Guardian API and normalize the data.
     *
     * @return array
     */
    public function fetchArticles(): array
    {
        $response = Http::get('https://api.nytimes.com/svc/topstories/v2/home.json', [
            'api-key' => config('app.nyt_api_key'),
        ]);

        if ($response->failed()) {
            return [];
        }

        $articles = $response->json()['results'] ?? [];

        return array_map(function ($article) {
            return [
                'title' => $article['title'] ?? null,
                'content' => $article['abstract'] ?? null,
                'category' => $article['section'] ?? null,
                'url' => $article['url'] ?? null,
                'author' => $article['byline'] ?? null,
                'image' => $article['multimedia'][0]['url'] ?? null,
                'published_at' => $article['published_date'] ?? null,
            ];
        }, $articles);
    }
}
