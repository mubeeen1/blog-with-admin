-- Create storage bucket for fonts
INSERT INTO storage.buckets (id, name, public) VALUES ('fonts', 'fonts', true);

-- Create storage policies for fonts bucket
CREATE POLICY "Anyone can view fonts" ON storage.objects FOR SELECT USING (bucket_id = 'fonts');

CREATE POLICY "Admins can upload fonts" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'fonts' AND 
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE admin_users.id = auth.uid()
  )
);

CREATE POLICY "Admins can delete fonts" ON storage.objects FOR DELETE USING (
  bucket_id = 'fonts' AND 
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE admin_users.id = auth.uid()
  )
);
