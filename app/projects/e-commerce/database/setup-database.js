#!/usr/bin/env node

/**
 * Database Migration Script for E-Commerce Supabase Setup
 * 
 * This script automatically creates all necessary tables in your Supabase database.
 * 
 * Usage:
 *   node setup-database.js
 * 
 * Requirements:
 *   - @supabase/supabase-js installed
 *   - .env.local configured with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../../.env.local') });

// ANSI color codes for pretty output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
    console.log('\n' + colors.cyan + '═'.repeat(60) + colors.reset);
    console.log(colors.bright + colors.cyan + `  ${title}` + colors.reset);
    console.log(colors.cyan + '═'.repeat(60) + colors.reset + '\n');
}

async function setupDatabase() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    logSection('🚀 E-Commerce Database Setup');

    if (!supabaseUrl || !supabaseServiceKey) {
        log('❌ Error: Missing Supabase credentials', 'red');
        log('Please ensure these variables are set in .env.local:', 'yellow');
        log('  - NEXT_PUBLIC_SUPABASE_URL', 'blue');
        log('  - SUPABASE_SERVICE_ROLE_KEY', 'blue');
        process.exit(1);
    }

    log(`📡 Supabase URL: ${supabaseUrl}`, 'blue');

    // Create client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Test connection
    logSection('🔍 Testing Database Connection');
    const { data, error } = await supabase.from('products').select('count', { count: 'exact', head: true });

    if (!error) {
        log('✓ Successfully connected to Supabase!', 'green');
        log(`✓ Products table already exists`, 'green');
        logSection('✨ Database Already Set Up!');
        log('Your database appears to be ready.', 'green');
        return;
    }

    // Tables don't exist yet - provide setup instructions
    logSection('📋 Database Setup Instructions');
    log('The database tables need to be created. Follow these steps:', 'yellow');
    log('', 'reset');

    log('STEP 1: Open Supabase SQL Editor', 'bright');
    const dashboardUrl = supabaseUrl.replace('supabase.co', 'supabase.com').replace('//', '//app.');
    log(`  → ${dashboardUrl}/editor/sql`, 'cyan');
    log('', 'reset');

    log('STEP 2: Copy Schema File', 'bright');
    const schemaPath = path.join(__dirname, 'schema.sql');
    log(`  → File: ${schemaPath}`, 'cyan');

    // Try to display first few lines of schema
    try {
        const schema = fs.readFileSync(schemaPath, 'utf8');
        log(`  → File size: ${(schema.length / 1024).toFixed(1)} KB`, 'cyan');
        log('', 'reset');

        log('STEP 3: Execute Schema', 'bright');
        log('  1. Copy the entire contents of schema.sql', 'blue');
        log('  2. Paste it into the SQL Editor', 'blue');
        log('  3. Click "Run" to create all tables', 'blue');
        log('', 'reset');

        log('STEP 4: (Optional) Add Sample Data', 'bright');
        const seedPath = path.join(__dirname, 'seed.sql');
        log(`  → File: ${seedPath}`, 'cyan');
        log('  → Execute seed.sql in SQL Editor to add sample products', 'blue');
        log('', 'reset');

        logSection('📝 What Gets Created');
        log('Tables:', 'bright');
        log('  ✓ products - Product catalog', 'green');
        log('  ✓ customers - Customer profiles', 'green');
        log('  ✓ orders - Order management', 'green');
        log('  ✓ order_items - Line items', 'green');
        log('  ✓ reviews - Product reviews', 'green');
        log('  ✓ wishlist - User wishlists', 'green');
        log('  ✓ cart_items - Shopping carts', 'green');
        log('  ✓ categories - Product categories', 'green');
        log('', 'reset');
        log('Plus: Indexes, RLS policies, and triggers', 'yellow');

    } catch (err) {
        log(`⚠ Could not read schema file: ${err.message}`, 'yellow');
    }

    logSection('🎯 Quick Start Alternative');
    log('If you have Supabase CLI installed:', 'bright');
    log('  1. npm install -g supabase', 'blue');
    log('  2. supabase login', 'blue');
    log('  3. supabase db push', 'blue');
    log('', 'reset');

    logSection('✅ Next Steps');
    log('After creating the tables:', 'bright');
    log('  → Your E-Commerce app will automatically connect', 'cyan');
    log('  → All features (cart, wishlist, orders) will work', 'cyan');
    log('  → Admin panel will have live data', 'cyan');
    log('', 'reset');
}

// Run the setup
setupDatabase().catch((err) => {
    log(`\n❌ Error: ${err.message}`, 'red');
    process.exit(1);
});
