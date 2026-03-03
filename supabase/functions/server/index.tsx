import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Create Supabase client with service role key for admin operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Initialize storage bucket on startup
async function initStorage() {
  const bucketName = 'portfolio-images-098d0831';
  
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      const { data, error } = await supabase.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
      });
      
      if (error) {
        console.error('Bucket creation error:', error);
      } else {
        console.log('✅ Storage bucket created:', bucketName);
      }
    } else {
      console.log('✅ Storage bucket already exists:', bucketName);
    }
  } catch (err) {
    console.error('Storage initialization error:', err);
  }
}

// Initialize storage on startup
initStorage();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-098d0831/health", (c) => {
  return c.json({ status: "ok" });
});

// Upload image endpoint
app.post("/make-server-098d0831/upload-image", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return c.json({ error: 'File must be an image' }, 400);
    }
    
    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return c.json({ error: 'File size must be less than 5MB' }, 400);
    }
    
    const bucketName = 'portfolio-images-098d0831';
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;
    
    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, uint8Array, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });
    
    if (uploadError) {
      console.error('Upload error:', uploadError);
      return c.json({ error: 'Failed to upload file: ' + uploadError.message }, 500);
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);
    
    const publicUrl = urlData.publicUrl;
    
    // Store metadata in KV store
    const imageId = crypto.randomUUID();
    await kv.set(`image:${imageId}`, {
      id: imageId,
      fileName: file.name,
      filePath: filePath,
      publicUrl: publicUrl,
      contentType: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString()
    });
    
    return c.json({
      success: true,
      imageId: imageId,
      publicUrl: publicUrl,
      filePath: filePath
    });
    
  } catch (err) {
    console.error('Upload endpoint error:', err);
    return c.json({ error: 'Internal server error: ' + err.message }, 500);
  }
});

// Get image metadata
app.get("/make-server-098d0831/image/:id", async (c) => {
  try {
    const imageId = c.req.param('id');
    const imageData = await kv.get(`image:${imageId}`);
    
    if (!imageData) {
      return c.json({ error: 'Image not found' }, 404);
    }
    
    return c.json(imageData);
  } catch (err) {
    console.error('Get image error:', err);
    return c.json({ error: 'Internal server error: ' + err.message }, 500);
  }
});

// Delete image endpoint
app.delete("/make-server-098d0831/image/:id", async (c) => {
  try {
    const imageId = c.req.param('id');
    const imageData = await kv.get(`image:${imageId}`);
    
    if (!imageData) {
      return c.json({ error: 'Image not found' }, 404);
    }
    
    const bucketName = 'portfolio-images-098d0831';
    
    // Delete from storage
    const { error: deleteError } = await supabase.storage
      .from(bucketName)
      .remove([imageData.filePath]);
    
    if (deleteError) {
      console.error('Delete error:', deleteError);
    }
    
    // Delete metadata
    await kv.del(`image:${imageId}`);
    
    return c.json({ success: true });
  } catch (err) {
    console.error('Delete image error:', err);
    return c.json({ error: 'Internal server error: ' + err.message }, 500);
  }
});

// Contact form submission endpoint
app.post("/make-server-098d0831/contact", async (c) => {
  try {
    const body = await c.req.json();
    
    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.budget || !body.message) {
      return c.json({ error: 'All fields are required' }, 400);
    }
    
    // Create inquiry object
    const inquiryId = crypto.randomUUID();
    const inquiry = {
      id: inquiryId,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      budget: body.budget,
      message: body.message,
      status: 'unread',
      submittedAt: new Date().toISOString(),
    };
    
    // Store in KV store
    await kv.set(`contact:${inquiryId}`, inquiry);
    
    console.log('✅ Contact form submission stored:', inquiryId);
    
    return c.json({ 
      success: true, 
      inquiryId: inquiryId,
      message: 'Your message has been submitted successfully!' 
    });
    
  } catch (err) {
    console.error('Contact form submission error:', err);
    return c.json({ error: 'Internal server error: ' + err.message }, 500);
  }
});

// Get all contact inquiries (admin only)
app.get("/make-server-098d0831/contacts", async (c) => {
  try {
    const contacts = await kv.getByPrefix('contact:');
    
    // Sort by submission date (newest first)
    const sortedContacts = contacts.sort((a: any, b: any) => {
      return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
    });
    
    return c.json({ 
      success: true, 
      contacts: sortedContacts,
      total: sortedContacts.length 
    });
    
  } catch (err) {
    console.error('Get contacts error:', err);
    return c.json({ error: 'Internal server error: ' + err.message }, 500);
  }
});

// Update contact inquiry status
app.put("/make-server-098d0831/contact/:id", async (c) => {
  try {
    const inquiryId = c.req.param('id');
    const body = await c.req.json();
    
    const inquiry = await kv.get(`contact:${inquiryId}`);
    
    if (!inquiry) {
      return c.json({ error: 'Inquiry not found' }, 404);
    }
    
    // Update status
    const updatedInquiry = {
      ...inquiry,
      status: body.status || inquiry.status,
      notes: body.notes || inquiry.notes,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`contact:${inquiryId}`, updatedInquiry);
    
    return c.json({ success: true, inquiry: updatedInquiry });
    
  } catch (err) {
    console.error('Update contact error:', err);
    return c.json({ error: 'Internal server error: ' + err.message }, 500);
  }
});

// Delete contact inquiry
app.delete("/make-server-098d0831/contact/:id", async (c) => {
  try {
    const inquiryId = c.req.param('id');
    const inquiry = await kv.get(`contact:${inquiryId}`);
    
    if (!inquiry) {
      return c.json({ error: 'Inquiry not found' }, 404);
    }
    
    await kv.del(`contact:${inquiryId}`);
    
    return c.json({ success: true });
    
  } catch (err) {
    console.error('Delete contact error:', err);
    return c.json({ error: 'Internal server error: ' + err.message }, 500);
  }
});

// ==================== PORTFOLIO DATA ENDPOINTS ====================

// Get all portfolio data
app.get("/make-server-098d0831/portfolio", async (c) => {
  try {
    const [projects, services, testimonials, hero, aboutSection, caseStudies] = await Promise.all([
      kv.get('portfolio:projects'),
      kv.get('portfolio:services'),
      kv.get('portfolio:testimonials'),
      kv.get('portfolio:hero'),
      kv.get('portfolio:about'),
      kv.get('portfolio:caseStudies'),
    ]);
    
    return c.json({
      success: true,
      data: {
        projects: projects || [],
        services: services || [],
        testimonials: testimonials || [],
        heroContent: hero || null,
        aboutSection: aboutSection || null,
        professionalCaseStudies: caseStudies || [],
      }
    });
  } catch (err) {
    console.error('Get portfolio error:', err);
    return c.json({ error: 'Internal server error: ' + err.message }, 500);
  }
});

// Update projects
app.put("/make-server-098d0831/portfolio/projects", async (c) => {
  try {
    const body = await c.req.json();
    await kv.set('portfolio:projects', body.projects);
    console.log('✅ Projects updated');
    return c.json({ success: true, data: body.projects });
  } catch (err) {
    console.error('Update projects error:', err);
    return c.json({ error: 'Internal server error: ' + err.message }, 500);
  }
});

// Update services
app.put("/make-server-098d0831/portfolio/services", async (c) => {
  try {
    const body = await c.req.json();
    await kv.set('portfolio:services', body.services);
    console.log('✅ Services updated');
    return c.json({ success: true, data: body.services });
  } catch (err) {
    console.error('Update services error:', err);
    return c.json({ error: 'Internal server error: ' + err.message }, 500);
  }
});

// Update testimonials
app.put("/make-server-098d0831/portfolio/testimonials", async (c) => {
  try {
    const body = await c.req.json();
    await kv.set('portfolio:testimonials', body.testimonials);
    console.log('✅ Testimonials updated');
    return c.json({ success: true, data: body.testimonials });
  } catch (err) {
    console.error('Update testimonials error:', err);
    return c.json({ error: 'Internal server error: ' + err.message }, 500);
  }
});

// Update hero content
app.put("/make-server-098d0831/portfolio/hero", async (c) => {
  try {
    const body = await c.req.json();
    await kv.set('portfolio:hero', body.heroContent);
    console.log('✅ Hero content updated');
    return c.json({ success: true, data: body.heroContent });
  } catch (err) {
    console.error('Update hero error:', err);
    return c.json({ error: 'Internal server error: ' + err.message }, 500);
  }
});

// Update case studies
app.put("/make-server-098d0831/portfolio/caseStudies", async (c) => {
  try {
    const body = await c.req.json();
    console.log('📝 Saving case studies:', body.caseStudies?.length || 0, 'items');
    if (body.caseStudies && body.caseStudies.length > 0) {
      console.log('🖼️ First case study heroImage:', body.caseStudies[0].heroImage);
      console.log('📱 First case study mobileMockups:', body.caseStudies[0].mobileMockups?.length || 0);
    }
    await kv.set('portfolio:caseStudies', body.caseStudies);
    console.log('✅ Case studies updated');
    return c.json({ success: true, data: body.caseStudies });
  } catch (err) {
    console.error('Update case studies error:', err);
    return c.json({ error: 'Internal server error: ' + err.message }, 500);
  }
});

// Update CV data
app.put("/make-server-098d0831/portfolio/cv", async (c) => {
  try {
    const body = await c.req.json();
    
    // If cvData is null, delete the key instead of storing null
    if (body.cvData === null || body.cvData === undefined) {
      await kv.del('portfolio:cv');
      console.log('✅ CV data deleted');
      return c.json({ success: true, data: null });
    }
    
    await kv.set('portfolio:cv', body.cvData);
    console.log(' CV data updated');
    return c.json({ success: true, data: body.cvData });
  } catch (err) {
    console.error('Update CV error:', err);
    return c.json({ error: 'Internal server error: ' + err.message }, 500);
  }
});

// Get CV data
app.get("/make-server-098d0831/portfolio/cv", async (c) => {
  try {
    const cvData = await kv.get('portfolio:cv');
    return c.json({ success: true, data: cvData });
  } catch (err) {
    console.error('Get CV error:', err);
    return c.json({ error: 'Internal server error: ' + err.message }, 500);
  }
});

// Update about section
app.put("/make-server-098d0831/portfolio/about", async (c) => {
  try {
    const body = await c.req.json();
    await kv.set('portfolio:about', body.aboutSection);
    console.log('✅ About section updated');
    return c.json({ success: true, data: body.aboutSection });
  } catch (err) {
    console.error('Update about section error:', err);
    return c.json({ error: 'Internal server error: ' + err.message }, 500);
  }
});

Deno.serve(app.fetch);