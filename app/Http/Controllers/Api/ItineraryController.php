<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tour;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class ItineraryController extends Controller
{
    public function download($id)
    {
        $tour = Tour::with('category')->findOrFail($id);
        
        // Priority 1: Check if Google Drive link exists
        if ($tour->itinerary_url) {
            // Redirect to Google Drive direct download link
            $downloadUrl = $this->convertToGoogleDriveDownload($tour->itinerary_url);
            return redirect()->away($downloadUrl);
        }
        
        // Priority 2: Check if custom itinerary PDF exists (old system)
        $customItinerary = $tour->getFirstMedia('itinerary');
        
        if ($customItinerary) {
            // Download custom PDF uploaded by admin
            return response()->download(
                $customItinerary->getPath(),
                $customItinerary->file_name,
                [
                    'Content-Type' => 'application/pdf',
                ]
            );
        }
        
        // Priority 3: If no custom PDF, generate default itinerary
        return $this->generateDefaultItinerary($tour);
    }
    
    /**
     * Convert Google Drive view link to direct download link
     */
    private function convertToGoogleDriveDownload($url)
    {
        // Extract file ID from various Google Drive URL formats
        $patterns = [
            '/\/file\/d\/([a-zA-Z0-9_-]+)/',       // /file/d/FILE_ID/view
            '/id=([a-zA-Z0-9_-]+)/',               // ?id=FILE_ID
            '/\/d\/([a-zA-Z0-9_-]+)/',             // /d/FILE_ID
        ];
        
        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $url, $matches)) {
                $fileId = $matches[1];
                return "https://drive.google.com/uc?export=download&id={$fileId}";
            }
        }
        
        // If no match, return original URL
        return $url;
    }
    
    private function generateDefaultItinerary($tour)
    {
        // Get gallery images
        $galleryImages = $tour->getMedia('images')->take(3)->map(function($media) {
            return $media->getUrl();
        });
        
        // Calculate available seats
        $availableSeats = $tour->max_participants - $tour->booked_participants;
        
        // Prepare data for PDF
        $data = [
            'tour' => $tour,
            'galleryImages' => $galleryImages,
            'availableSeats' => $availableSeats,
            'generatedDate' => now()->format('F d, Y'),
        ];
        
        // Generate PDF
        $pdf = Pdf::loadView('pdf.itinerary', $data);
        $pdf->setPaper('a4', 'portrait');
        
        // Download with tour name
        $filename = str_replace(' ', '-', strtolower($tour->name)) . '-itinerary.pdf';
        
        return $pdf->download($filename);
    }
}
