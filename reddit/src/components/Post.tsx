import { useFonts,Inter_600SemiBold_Italic,Inter_400Regular,Inter_900Black,Inter_300Light_Italic } from "@expo-google-fonts/inter"
import { View,StyleSheet,Text,SafeAreaView } from "react-native"
import { formatDistanceToNow } from "date-fns"
import { Post } from "../Models/Post"
import { useEffect, useState } from "react"
import axios from "axios"
import { ApiFollowing } from "../Models/ApiFollowing"

//prop which takes single post as a prop
type postProp={
    post:Post;
}

export default function Posts({post}:postProp){
    const[following,setFollowing] = useState<string[]|null>(null);
    const [fonts] = useFonts({
        Inter_600SemiBold_Italic,
        Inter_400Regular,
        Inter_900Black,
        Inter_300Light_Italic
    })

    useEffect(()=>{
        const handleFollowing = async()=>{
            try{
                const response = await axios.get<ApiFollowing>('{ip}:5000/following')
                setFollowing(response.data.data)
            }catch(err){
                console.log('Error feting following list',err)
            }
        }
        
        handleFollowing();
    },[])
    if(!fonts){
    return null;
  }
    return(
        <>
        <SafeAreaView style={styles.container}>
            <View nativeID="title-container" style={styles.title}>
                <Text nativeID="title-text" style={styles.title_text}> {post.title} </Text>
                <Text nativeID="time stamp" style={styles.time}> {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })} </Text>
            </View>
            <Text nativeID="user_name" style={styles.user_name}>
            {post.name} {following?.includes(post.user_id) ? '(Following)' : ''}
            </Text>
            <View nativeID="description" style={styles.text_container}>
                <Text style={styles.post_description}>{post.content}</Text>
            </View>
            <View nativeID="tags">
                <Text nativeID="tag-text" style={styles.tag_text}>
                    Tags: {Array.isArray(post.tags) ? post.tags.join(', ') : 'No tags'}
                </Text>

            </View>
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#121212', 
        justifyContent:'center',
        padding:10,
        flexDirection:'column',
        gap:4,
        borderBottomWidth:1,
        borderBottomColor:'#2c2c2c',
    },
   
    post_content:{
        backgroundColor:'#1e1e2f',
        maxWidth:400
    },
    user_name:{
        fontFamily:"Inter_600SemiBold_Italic",
        color:'#82aaff',
        paddingBottom:4
    },
    title:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        gap:4
    },
    title_text:{
        fontFamily:'Inter_900Black',
        fontSize:20,
        color:'#ffffff',
    },
    time:{
        fontFamily:'Inter_700Bold',
        color: '#bbbbbb',
    },
    post_description:{
        fontFamily:'Inter_700Bold',
        paddingVertical:5,
        paddingHorizontal:7,
        color:'#e0e0e0',
    },
    text_container:{
        backgroundColor:'#1a1a2e',
        borderRadius:5,
        paddingHorizontal:3,
        justifyContent:'center',
    },
    tag_text:{
        fontFamily:'Inter_300Light_Italic',
        color:'white'
    }
})
