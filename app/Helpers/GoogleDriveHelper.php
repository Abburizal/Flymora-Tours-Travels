<?php

namespace App\Helpers;

class GoogleDriveHelper
{
    /**
     * Convert Google Drive view link to direct download link
     */
    public static function convertToDirectDownload(string $url): string
    {
        // Extract file ID from various Google Drive URL formats
        $patterns = [
            '/\/file\/d\/([a-zA-Z0-9_-]+)/',
            '/id=([a-zA-Z0-9_-]+)/',
            '/\/d\/([a-zA-Z0-9_-]+)/',
        ];
        
        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $url, $matches)) {
                $fileId = $matches[1];
                return "https://drive.google.com/uc?export=download&id={$fileId}";
            }
        }
        
        return $url;
    }
}
