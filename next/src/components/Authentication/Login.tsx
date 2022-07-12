import { faDiscord, faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faAt, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Auth from "../../api/Auth";
import Config from "../../Config";
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
    ];

    const oauthOptions = [
        { name: "Google", icon: faGoogle, url: `${Config.authUrl}/google`},
        { name: "Discord", icon: faDiscord, url: `${Config.authUrl}/discord` },
        { name: "GitHub", icon: faGithub, url: `${Config.authUrl}/github`},
    ];

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
                    <div className="my-1 border-t" />
                    {oauthOptions.map((item, k) => (
                        <a key={k} href={item.url} className="relative py-2 px-4 rounded-lg border hover:border-gray-600" target="_blank">
                            <FontAwesomeIcon icon={item.icon} className="opacity-80 absolute left-4 top-0 bottom-0 my-auto w-5" />
                            <div className="text-center">
                                Sign in with {item.name}
                            </div>
                        </a>
                    ))}
                    <div className="my-1 border-t" />
                    <Link to="/auth/forgot/send" className="text-center">Forgot Password?</Link>
                </form>
                <Link to="/auth/register" className="absolute left-0 right-0 -bottom-12 text-center">Don't have an account?</Link>
            </div>
        </div>
    )

}

export default Login;