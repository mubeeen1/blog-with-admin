#!/usr/bin/env node

/**
 * Script to create a super admin user
 * This script creates a super admin user in the database with hashed password
 */

import { createUser } from '../lib/mongoose/models.js';

// Super admin credentials
const SUPER_ADMIN = {
  email: 'mubeennasir117@gmail.com',
  password: 'mubeen117',
  role: 'super_admin'
};

async function createSuperAdmin() {
  try {
    console.log('Creating super admin user...');

    // Check if super admin already exists by trying to create
    try {
      const adminUser = await createUser(SUPER_ADMIN.email, SUPER_ADMIN.password, SUPER_ADMIN.role);
      console.log('Super admin user created successfully!');
      console.log('\nAuthentication credentials:');
      console.log('Email:', adminUser.email);
      console.log('Password:', SUPER_ADMIN.password);
      console.log('Role:', adminUser.role);
    } catch (error) {
      if (error.code === 11000) {
        console.log('Super admin user already exists in the database.');
      } else {
        throw error;
      }
    }

  } catch (error) {
    console.error('Error creating super admin:', error);
  }
}

// Run the script
createSuperAdmin();
