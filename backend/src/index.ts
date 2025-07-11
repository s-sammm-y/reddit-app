import express,{Express,Request,Response} from 'express';
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js';
import { error } from 'console';
import cors from 'cors';

//Configuring app
const app:Express= express();
dotenv.config();
app.use(express.json());
app.use(cors())

//Supabase config
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing Supabase environment variables');
}
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

//apis
//fetcching posts
app.get('/posts',async(req:Request,res:Response)=>{
    try{
        const {data,error} = await supabase.rpc('get_all_posts_with_user')
        if(error){
            return res.status(500).json({message:'Failed to fetch data from database',error:error});
        }
        return res.status(200).json({message:'DAta fetched succesfully',data:data});
    }catch{
        return res.status(400).json({error:'Internal server error'});
    }
})

app.get('/following',async(req:Request,res:Response)=>{
    try{
        const {data,error} = await supabase.from('user_follows').select('following_id').eq('follower_id','773fb23a-60ef-49ce-af78-dcc906030569')
        if(error){
            return res.status(500).json({message:'Failed to fect follwong details',error:error});
        }
        return res.status(200).json({message:'DAta fetched succesfully',data:data});
    }catch{
        return res.status(400).json({error:'Internal server error'});
    }
})


//Running server
app.listen(5000,'0.0.0.0',()=>{
    console.log(`Server running at ${5000}`);
})