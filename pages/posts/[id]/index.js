import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Post = ({ post }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deletePost();
        }
    }, [isDeleting])

    const deleteConfirm = () => {
        if (confirm("Are you sure you want to delete this post?") === true){
            handleDelete();
        }
    }

    const deletePost = async () => {
        const postId = router.query.id;
        try {
            const deleted = await fetch(`http://localhost:3000/api/post/${postId}`, {
                method: "Delete"
            });

            router.push("/posts");
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }

    return (
        <div>
            {
                isDeleting
                    ? <div>Deleting...</div>
                    :
                    <>
                        <h1>{post.title}</h1>
                        <p>{post.content}</p>
                        <button color='red' onClick={deleteConfirm}>Delete</button>
                    </>
            }
        </div>
    )
}

Post.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/post/${id}`);
    const { data } = await res.json();

    return { post: data }
}

export default Post;