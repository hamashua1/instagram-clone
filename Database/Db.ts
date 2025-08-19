import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'



const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseKey= process.env.SUPABASE_KEY as string
if(!supabaseUrl){
    throw new Error('url not found ')
}
export const supabase = createClient(supabaseUrl,supabaseKey)
    
console.log(`database is connected succesfully ☁️ `)

