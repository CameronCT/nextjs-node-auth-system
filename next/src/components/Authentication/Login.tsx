import { faAt, faKey } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Auth from "../../api/Auth";
import Input from "../Forms/Input";
import Link from "../Utils/Link";

interface FormData {
    [key: string]: string;
}

const Login = () => {

    const router = useRouter();
    const [ formData, setFormData ] = useState<FormData>({});

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        Auth.login(formData.emailAddress, formData.password)
            .then((r) => r?.status === 200 ? router.push('/') : false);
    }

    const handleChange = (key: string, value: string) => 
        setFormData({ ...formData, [key]: value });

    const formOptions = [
        { type: 'text', name: 'emailAddress', label: 'Email Address', icon: faAt },
        { type: 'password', name: 'password', label: 'Password', icon: faKey },
    ]

    return (
        <div className="tw-container tw-vertical">
            <div className="_authForm">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                    <div>
                        <h1>Welcome!</h1>
                        <span>Please enter your credentials.</span>
                    </div>
                    {formOptions.map((item, k) => <Input key={k} {...item} value={formData[item.name]} onChange={(v) => handleChange(item.name, v)} />)}
                    <div className="flex flex-wrap justify-center lg:justify-between space-x-2">
                        <button type="submit">Login</button>
                    </div>
                    <Link to="/auth/forgot-password" className="text-center">Forgot Password?</Link>
                </form>
                <Link to="/auth/register" className="absolute left-0 right-0 -bottom-12 text-center">Don't have an account?</Link>
            </div>
        </div>
    )

}

export default Login;