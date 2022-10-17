import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const EditPost = ({ post }) => {
    const [form, setForm] = useState({ title: post.title, content: post.content});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updatePost();
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const updatePost = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/post/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            await router.push("/posts");
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = validate();
        setErrors(errors);
        setIsSubmitting(true);
    };
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const validate = () => {
        let error = {};

        if (!form.title){
            error.title = "Title is required!";
        }

        if (!form.content){
            error.content = "Content is required!";
        }

        return error;
    }

    return (
        <div>
            <h1>Update Post</h1>
            <br/>
            <div>
                {
                    isSubmitting
                        ? <h1>Updating...</h1>
                        : <form onSubmit={handleSubmit}>
                            <input type={"text"} name={'title'} onChange={handleChange} required={true} value={form.title}/>
                            <textarea name={'content'} onChange={handleChange} required={true} value={form.content}/>
                            <input type={"submit"} name={"submit"}/>
                        </form>
                }
            </div>
        </div>
    )
}

EditPost.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/post/${id}`);
    const { data } = await res.json();

    return { post: data }
}

export default EditPost;