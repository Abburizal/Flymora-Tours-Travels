<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // Tour permissions
            'view_tours',
            'create_tours',
            'edit_tours',
            'delete_tours',
            
            // Booking permissions
            'view_bookings',
            'create_bookings',
            'edit_bookings',
            'delete_bookings',
            'approve_bookings',
            
            // User permissions
            'view_users',
            'create_users',
            'edit_users',
            'delete_users',
            
            // Category permissions
            'view_categories',
            'create_categories',
            'edit_categories',
            'delete_categories',
            
            // Review permissions
            'view_reviews',
            'create_reviews',
            'edit_reviews',
            'delete_reviews',
            'approve_reviews',
            
            // Newsletter permissions
            'view_newsletters',
            'delete_newsletters',
            
            // Activity log permissions
            'view_activity_logs',
            
            // Widget permissions
            'view_dashboard',
            'view_analytics',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create roles and assign permissions
        
        // Super Admin - has all permissions
        $superAdmin = Role::firstOrCreate(['name' => 'super_admin']);
        $superAdmin->givePermissionTo(Permission::all());
        
        // Admin - has most permissions except user management
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->givePermissionTo([
            'view_tours', 'create_tours', 'edit_tours', 'delete_tours',
            'view_bookings', 'create_bookings', 'edit_bookings', 'delete_bookings', 'approve_bookings',
            'view_categories', 'create_categories', 'edit_categories', 'delete_categories',
            'view_reviews', 'edit_reviews', 'delete_reviews', 'approve_reviews',
            'view_newsletters', 'delete_newsletters',
            'view_activity_logs',
            'view_dashboard', 'view_analytics',
        ]);
        
        // Manager - can manage tours and bookings
        $manager = Role::firstOrCreate(['name' => 'manager']);
        $manager->givePermissionTo([
            'view_tours', 'create_tours', 'edit_tours',
            'view_bookings', 'create_bookings', 'edit_bookings', 'approve_bookings',
            'view_categories',
            'view_reviews', 'approve_reviews',
            'view_newsletters',
            'view_dashboard', 'view_analytics',
        ]);
        
        // Staff - read-only with limited editing
        $staff = Role::firstOrCreate(['name' => 'staff']);
        $staff->givePermissionTo([
            'view_tours',
            'view_bookings', 'create_bookings', 'edit_bookings',
            'view_categories',
            'view_reviews',
            'view_newsletters',
            'view_dashboard',
        ]);

        // Assign super_admin role to first admin user if exists
        $firstAdmin = User::where('is_admin', true)->first();
        if ($firstAdmin && !$firstAdmin->hasRole('super_admin')) {
            $firstAdmin->assignRole('super_admin');
            $this->command->info("Assigned super_admin role to: {$firstAdmin->name}");
        }

        $this->command->info('Roles and permissions created successfully!');
        $this->command->info('Roles: super_admin, admin, manager, staff');
        $this->command->info('Total permissions: ' . count($permissions));
    }
}
