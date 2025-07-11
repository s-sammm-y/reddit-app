"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const supabase_js_1 = require("@supabase/supabase-js");
const cors_1 = __importDefault(require("cors"));
//Configuring app
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//Supabase config
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Missing Supabase environment variables');
}
const supabase = (0, supabase_js_1.createClient)(SUPABASE_URL, SUPABASE_KEY);
//apis
//fetcching posts
app.get('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase.rpc('get_all_posts_with_user');
        if (error) {
            return res.status(500).json({ message: 'Failed to fetch data from database', error: error });
        }
        return res.status(200).json({ message: 'DAta fetched succesfully', data: data });
    }
    catch (_a) {
        return res.status(400).json({ error: 'Internal server error' });
    }
}));
app.get('/following', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase.from('user_follows').select('following_id').eq('follower_id', '773fb23a-60ef-49ce-af78-dcc906030569');
        if (error) {
            return res.status(500).json({ message: 'Failed to fect follwong details', error: error });
        }
        return res.status(200).json({ message: 'DAta fetched succesfully', data: data });
    }
    catch (_a) {
        return res.status(400).json({ error: 'Internal server error' });
    }
}));
//Running server
app.listen(5000, '0.0.0.0', () => {
    console.log(`Server running at ${5000}`);
});
