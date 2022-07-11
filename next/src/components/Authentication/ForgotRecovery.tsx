import { faAt, faKey } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Auth from "../../api/Auth";
import Input from "../Forms/Input";
import Link from "../Utils/Link";

interface FormData {
    [key: string]: string;
}

interface IProps {
    recoveryCode: string;
}

const ForgotRecovery = (props: IProps) => {

    const router = useRouter();
    const [ formData, setFormData ] = useState<FormData>({ ...props });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        Auth.recoveryPassword(formData.emailAddress, formData.password, formData.recoveryCode)
            .then((r) => {
                if (r?.status === 200) {
                    toast.success(r?.message);
                    router.push('/auth/login');
                }
            });
    }

    const handleChange = (key: string, value: string) => 
        setFormData({ ...formData, [key]: value });

    const formOptions = [
        { type: 'text', name: 'emailAddress', label: 'Email Address', icon: faAt },
        { type: 'text', name: 'recoveryCode', label: 'Recovery Code', icon: faKey },
        { type: 'password', name: 'password', label: 'Password', icon: faKey, required: true, regex: {
            pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
            message: 'Requires at least one lowercase letter, one uppercase letter, one number and one special character.'
        } },
        { type: 'password', name: 'passwordConfirm', label: 'Confirm Password', icon: faKey, required: true, condition: {
            pattern: (formData.password === formData.passwordConfirm),
            message: 'Passwords must match.'
        } }
    ]

    return (
        <div className="tw-container tw-vertical">
            <div className="_authForm">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                    <div>
                        <h1>Password Recovery!</h1>
                        <span>Please enter your new password.</span>
                    </div>
                    {formOptions.map((item, k) => <Input key={k} {...item} value={formData[item.name]} onChange={(v) => handleChange(item.name, v)} />)}
                    <div className="flex flex-wrap justify-center lg:justify-between space-x-2">
                        <button type="submit">Change Password</button>
                    </div>
                </form>
                <Link to="/auth/login" className="absolute left-0 right-0 -bottom-12 text-center">Already have an account?</Link>
            </div>
        </div>
    )

}

export default ForgotRecovery;