<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GuardianService
{
    /**
     * Fetch articles from The Guardian API and normalize the data.
     *
     * @return array
     */
    public function fetchArticles(): array
    {
        $response = Http::withoutVerifying()->get('https://content.guardianapis.com/search', [
            'api-key' => config('app.guardian_api_key'),
            'show-fields' => 'all',
        ]);

        if ($response->failed()) {
            return [];
        }

        $articles = $response->json()['response']['results'] ?? [];

        return array_map(function ($article) {
            return [
                'title' => $article['webTitle'] ?? null,
                'content' => $article['fields']['body'] ?? null,
                'category' => $article['sectionName'] ?? null,
                'url' => $article['webUrl'] ?? null,
                'author' => $article['fields']['byline'] ?? null,
                'image' => $article['fields']['thumbnail'] ?? null,
                'published_at' => $article['webPublicationDate'] ?? null,
            ];
        }, $articles);
    }
}
