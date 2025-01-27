import React,{useState,useEffect} from 'react'
import appwriteService from '../appwrite/conf'
import { Container, PostCard } from '../components'
import { useNavigate } from 'react-router-dom'


function Home() {

    const [posts,setPosts] = useState([])
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        })
        setLoading(false)
    },[])

    if (posts.length === 0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-col justify-center items-center rounded-md flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold'>
                                Join millions of others
                            </h1>
                            <p className='font-medium leading-10 text-lg'>Whether sharing your expertise, <br />
                             breaking news, or whatever’s on your mind, <br />
                             you’re in good company on BlogSphere. <br />
                              Sign up to discover why millions of people have published their passions here.</p>
                        </div>
                        <button 
                        className="text-center border-gray-500 rounded-md p-2 font-semibold uppercase bg-orange-500 "
                        onClick={() => navigate("/Login")}>
                            Create Blog
                        </button>
                        <div className='mt-20 shadow-lg shadow-amber-300 font-serif text-lg'>
                        "Writing isn't about making money, getting famous, getting dates, getting laid, or making friends. In the end, it's about enriching the lives of those who will read your work, and enriching your own life, as well" <span className='font-bold'>— Stephen King</span> 
                        </div>
                    </div>
                </Container>

            </div>
        )
    }
    return !loading ? (
        <div className='w-full py-8'>
            <Container>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard  {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    ) : <div>loading</div>
}

export default Home
