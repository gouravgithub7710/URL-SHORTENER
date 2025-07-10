import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_KEY
)

export default async function handler(req, res) {
  const shortCode = req.url.split('/').pop()
  
  try {
    const { data, error } = await supabase
      .from('urls')
      .select('original_url')
      .or(`short_url.eq.${shortCode},custom_url.eq.${shortCode}`)
      .single()
    
    if (error || !data) {
      return res.status(404).redirect('/')
    }
    
    res.redirect(301, data.original_url)
  } catch (error) {
    res.status(500).redirect('/')
  }
}