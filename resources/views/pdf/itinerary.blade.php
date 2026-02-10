<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $tour->name }} - Itinerary</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 12px;
            line-height: 1.6;
            color: #333;
        }
        
        .header {
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            margin-bottom: 30px;
        }
        
        .header h1 {
            font-size: 24px;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 14px;
            opacity: 0.9;
        }
        
        .content {
            padding: 0 20px;
        }
        
        .info-grid {
            display: table;
            width: 100%;
            margin-bottom: 25px;
            border-collapse: collapse;
        }
        
        .info-row {
            display: table-row;
        }
        
        .info-cell {
            display: table-cell;
            padding: 10px;
            border: 1px solid #e5e7eb;
            width: 50%;
        }
        
        .info-label {
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 5px;
        }
        
        .info-value {
            color: #4b5563;
        }
        
        .section {
            margin-bottom: 25px;
            page-break-inside: avoid;
        }
        
        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 2px solid #2563eb;
        }
        
        .description {
            text-align: justify;
            line-height: 1.8;
            color: #4b5563;
        }
        
        .highlights {
            background: #f3f4f6;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        
        .highlights ul {
            margin-left: 20px;
            margin-top: 10px;
        }
        
        .highlights li {
            margin-bottom: 8px;
            color: #374151;
        }
        
        .price-box {
            background: #fef3c7;
            border: 2px solid #fbbf24;
            padding: 15px;
            text-align: center;
            margin: 20px 0;
            border-radius: 8px;
        }
        
        .price-label {
            font-size: 14px;
            color: #92400e;
            margin-bottom: 5px;
        }
        
        .price-value {
            font-size: 24px;
            font-weight: bold;
            color: #78350f;
        }
        
        .inclusions-exclusions {
            display: table;
            width: 100%;
            margin-top: 20px;
        }
        
        .column {
            display: table-cell;
            width: 50%;
            padding: 10px;
            vertical-align: top;
        }
        
        .inclusions {
            background: #d1fae5;
            border: 1px solid #10b981;
            border-radius: 8px;
            padding: 15px;
        }
        
        .exclusions {
            background: #fee2e2;
            border: 1px solid #ef4444;
            border-radius: 8px;
            padding: 15px;
        }
        
        .list-title {
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 14px;
        }
        
        .inclusions .list-title {
            color: #065f46;
        }
        
        .exclusions .list-title {
            color: #991b1b;
        }
        
        ul.item-list {
            margin-left: 15px;
            margin-top: 8px;
        }
        
        ul.item-list li {
            margin-bottom: 6px;
        }
        
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            text-align: center;
            color: #6b7280;
            font-size: 11px;
        }
        
        .contact-info {
            margin-top: 15px;
            background: #f9fafb;
            padding: 15px;
            border-radius: 8px;
        }
        
        .contact-info p {
            margin-bottom: 5px;
        }
        
        .badge {
            display: inline-block;
            padding: 5px 12px;
            background: #dbeafe;
            color: #1e40af;
            border-radius: 20px;
            font-size: 11px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .availability-box {
            background: #dcfce7;
            border: 1px solid #22c55e;
            padding: 12px;
            border-radius: 6px;
            text-align: center;
            margin-bottom: 15px;
        }
        
        .availability-box strong {
            color: #15803d;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <h1>{{ $tour->name }}</h1>
        <p>Comprehensive Tour Itinerary</p>
        <p style="margin-top: 10px; font-size: 12px;">Generated on {{ $generatedDate }}</p>
    </div>
    
    <div class="content">
        <!-- Quick Info Grid -->
        <div class="info-grid">
            <div class="info-row">
                <div class="info-cell">
                    <div class="info-label">📍 Destination</div>
                    <div class="info-value">{{ $tour->destination }}</div>
                </div>
                <div class="info-cell">
                    <div class="info-label">⏱️ Duration</div>
                    <div class="info-value">{{ $tour->duration }} Day(s)</div>
                </div>
            </div>
            <div class="info-row">
                <div class="info-cell">
                    <div class="info-label">🗓️ Start Date</div>
                    <div class="info-value">{{ $tour->start_date ? $tour->start_date->format('F d, Y') : 'Flexible' }}</div>
                </div>
                <div class="info-cell">
                    <div class="info-label">👥 Group Size</div>
                    <div class="info-value">Max {{ $tour->max_participants }} participants</div>
                </div>
            </div>
            @if($tour->category)
            <div class="info-row">
                <div class="info-cell">
                    <div class="info-label">🏷️ Category</div>
                    <div class="info-value">{{ $tour->category->name }}</div>
                </div>
                <div class="info-cell">
                    <div class="info-label">✅ Availability</div>
                    <div class="info-value">{{ $availableSeats > 0 ? $availableSeats . ' seat(s) available' : 'Fully Booked' }}</div>
                </div>
            </div>
            @endif
        </div>
        
        <!-- Price Box -->
        <div class="price-box">
            <div class="price-label">Starting Price Per Person</div>
            <div class="price-value">Rp {{ number_format($tour->price, 0, ',', '.') }}</div>
        </div>
        
        <!-- Tour Overview -->
        <div class="section">
            <div class="section-title">📖 Tour Overview</div>
            <div class="description">
                {{ $tour->description }}
            </div>
        </div>
        
        <!-- Tour Highlights -->
        <div class="section">
            <div class="section-title">⭐ Tour Highlights</div>
            <div class="highlights">
                <ul>
                    <li>Visit iconic landmarks and hidden gems in {{ $tour->destination }}</li>
                    <li>Experience local culture and authentic cuisine</li>
                    <li>Professional tour guide with extensive local knowledge</li>
                    <li>Comfortable accommodation and transportation</li>
                    <li>Flexible itinerary with free time for personal exploration</li>
                    @if($tour->duration >= 3)
                    <li>Balanced mix of guided activities and leisure time</li>
                    @endif
                    @if($tour->duration >= 5)
                    <li>Extended stay to fully immerse in the destination</li>
                    @endif
                </ul>
            </div>
        </div>
        
        <!-- Inclusions & Exclusions -->
        <div class="section">
            <div class="section-title">📋 What's Included & What's Not</div>
            <div class="inclusions-exclusions">
                <div class="column">
                    <div class="inclusions">
                        <div class="list-title">✅ Included</div>
                        <ul class="item-list">
                            <li>Accommodation ({{ $tour->duration - 1 }} night(s))</li>
                            <li>Daily breakfast</li>
                            <li>Professional tour guide</li>
                            <li>Transportation during tour</li>
                            <li>Entrance fees to attractions</li>
                            <li>Travel insurance</li>
                            <li>All taxes and service charges</li>
                        </ul>
                    </div>
                </div>
                <div class="column">
                    <div class="exclusions">
                        <div class="list-title">❌ Not Included</div>
                        <ul class="item-list">
                            <li>Flight tickets to/from {{ $tour->destination }}</li>
                            <li>Lunch and dinner (unless specified)</li>
                            <li>Personal expenses</li>
                            <li>Tips for guide and driver</li>
                            <li>Optional activities</li>
                            <li>Travel visa (if required)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Important Information -->
        <div class="section">
            <div class="section-title">ℹ️ Important Information</div>
            <div class="highlights">
                <ul>
                    <li><strong>What to Bring:</strong> Comfortable walking shoes, sunscreen, hat, camera, and personal medications</li>
                    <li><strong>Fitness Level:</strong> Moderate - suitable for most fitness levels</li>
                    <li><strong>Weather:</strong> Check local weather forecast before departure</li>
                    <li><strong>Cancellation Policy:</strong> Full refund if cancelled 14+ days before departure</li>
                    <li><strong>Meeting Point:</strong> Will be confirmed 24 hours before tour start</li>
                    <li><strong>Languages:</strong> English and Indonesian speaking guides available</li>
                </ul>
            </div>
        </div>
        
        <!-- Day by Day Itinerary -->
        <div class="section">
            <div class="section-title">📅 Day-by-Day Itinerary</div>
            @for($day = 1; $day <= $tour->duration; $day++)
            <div style="background: #f9fafb; padding: 12px; margin-bottom: 10px; border-left: 4px solid #2563eb; border-radius: 4px;">
                <strong style="color: #1f2937; font-size: 13px;">Day {{ $day }}:</strong>
                @if($day == 1)
                <span style="color: #4b5563;">Arrival & Check-in - Welcome to {{ $tour->destination }}! Meet your guide, transfer to hotel, and orientation tour. Evening welcome dinner.</span>
                @elseif($day == $tour->duration)
                <span style="color: #4b5563;">Departure Day - Enjoy breakfast, last-minute shopping or sightseeing, then transfer to airport for your return flight.</span>
                @else
                <span style="color: #4b5563;">Full day exploration of {{ $tour->destination }} - Guided tours to major attractions, cultural experiences, and local cuisine. Free time in the evening.</span>
                @endif
            </div>
            @endfor
        </div>
        
        <!-- Contact Information -->
        <div class="contact-info">
            <div class="section-title">📞 Contact Us</div>
            <p><strong>Flymora Tours and Travels</strong></p>
            <p>📧 Email: info@flymoratours.com</p>
            <p>📱 Phone: +62 821-8990-5173</p>
            <p>📍 Address: Jl. Sudirman No. 123, Jakarta Pusat, 10220, Indonesia</p>
            <p style="margin-top: 10px;">🌐 Website: www.flymoratours.com</p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p><strong>Flymora Tours and Travels</strong></p>
            <p>Your trusted partner for unforgettable travel experiences</p>
            <p style="margin-top: 10px;">© 2026 Flymora Tours and Travels. All rights reserved.</p>
            <p style="margin-top: 5px; font-size: 10px;">
                This itinerary is subject to change based on weather conditions and local circumstances.
            </p>
        </div>
    </div>
</body>
</html>
