import { View,Text,StyleSheet,SafeAreaView,ScrollView } from "react-native"
import Posts from '../components/Post';
import { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "../Models/Post";
import { ApiResponse } from "../Models/ApiPosts";
//defining type for my data from database


export default function HomeScreen(){
    const [posts,setPosts] = useState< Post[] |null>(null);

    useEffect(()=>{
        const fetchPosts = async()=>{
            try{
                const response = await axios.get<ApiResponse>('{ip}:5000/posts')
                // console.log(response.data.data);
                setPosts(response.data.data);
            }catch(err){
                console.log("Error fetching posts server error",err)
            }
        }
        fetchPosts();
    },[])
    return(
        <>
        <SafeAreaView style={styles.container} >
            <ScrollView>
                {posts?.map((item)=>(
                    <Posts key={item.id} post={item}/>
                ))}
            </ScrollView>
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'black',
        flex:1,
    },
})
