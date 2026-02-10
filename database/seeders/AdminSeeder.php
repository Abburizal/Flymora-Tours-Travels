<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create default admin user
        User::updateOrCreate(
            ['email' => 'admin@flymoratours.com'],
            [
                'name' => 'Admin Flymora',
                'email' => 'admin@flymoratours.com',
                'password' => Hash::make('Admin@Flymora2026!'),
                'phone' => '+62 812 3456 7890',
                'is_admin' => true,
                'role' => 'admin',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        $this->command->info('✅ Admin user created successfully!');
        $this->command->info('📧 Email: admin@flymoratours.com');
        $this->command->info('🔑 Password: Admin@Flymora2026!');
        $this->command->warn('⚠️  IMPORTANT: Change password after first login!');
    }
}
