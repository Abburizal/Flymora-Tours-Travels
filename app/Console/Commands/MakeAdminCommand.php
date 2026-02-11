<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class MakeAdminCommand extends Command
{
    protected $signature = 'make:admin 
                            {--name= : The name of the admin user}
                            {--email= : The email address of the admin user}
                            {--password= : The password for the admin user}';

    protected $description = 'Create a new admin user for the Flymora admin panel';

    public function handle()
    {
        $this->info('🚀 Flymora Admin User Generator');
        $this->newLine();

        // Get user input
        $name = $this->option('name') ?: $this->ask('Admin Name');
        $email = $this->option('email') ?: $this->ask('Admin Email');
        $password = $this->option('password') ?: $this->secret('Admin Password (min 12 characters)');

        // Validate input
        $validator = Validator::make([
            'name' => $name,
            'email' => $email,
            'password' => $password,
        ], [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:12',
        ]);

        if ($validator->fails()) {
            $this->error('❌ Validation failed:');
            foreach ($validator->errors()->all() as $error) {
                $this->error('   • ' . $error);
            }
            return Command::FAILURE;
        }

        // Confirm creation
        $this->newLine();
        $this->table(
            ['Field', 'Value'],
            [
                ['Name', $name],
                ['Email', $email],
                ['Password', str_repeat('•', strlen($password))],
                ['Role', 'Administrator'],
                ['Admin Access', '✅ Yes'],
            ]
        );

        if (!$this->confirm('Create this admin user?', true)) {
            $this->warn('⚠️  Admin creation cancelled.');
            return Command::FAILURE;
        }

        // Create admin user
        try {
            $user = User::create([
                'name' => $name,
                'email' => $email,
                'password' => Hash::make($password),
                'is_admin' => true,
                'role' => 'admin',
                'is_active' => true,
                'email_verified_at' => now(),
            ]);

            $this->newLine();
            $this->info('✅ Admin user created successfully!');
            $this->newLine();
            
            $this->table(
                ['Field', 'Value'],
                [
                    ['ID', $user->id],
                    ['Name', $user->name],
                    ['Email', $user->email],
                    ['Role', $user->role],
                    ['Admin Panel Access', '✅ Enabled'],
                ]
            );

            $this->newLine();
            $this->info('🔐 Login URL: ' . url('/admin'));
            $this->info('📧 Email: ' . $user->email);
            $this->newLine();

            return Command::SUCCESS;

        } catch (\Exception $e) {
            $this->error('❌ Failed to create admin user: ' . $e->getMessage());
            return Command::FAILURE;
        }
    }
}
