import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const NewPost = () => {
    const [form, setForm] = useState({ title: '', content: ''});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createPost();
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const createPost = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/post', {
                method: 'POST',
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
            <h1>Create Post</h1>
            <br/>
            <div>
                {
                    isSubmitting
                        ? <h1>What</h1>
                        : <form onSubmit={handleSubmit}>
                            <input type={"text"} name={'title'} onChange={handleChange} required={true}/>
                            <textarea name={'content'} onChange={handleChange} required={true}/>
                            <input type={"submit"} name={"submit"}/>
                        </form>
                }
            </div>
        </div>
    )
}

export default NewPost;