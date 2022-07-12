import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faAt, faKey } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import Auth from '../../api/Auth'
import Input from '../Forms/Input'
import Link from '../Utils/Link'

interface FormData {
    [key: string]: string
}

const Register = () => {
    const router = useRouter()
    const [formData, setFormData] = useState<FormData>({})

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        Auth.register(formData.emailAddress, formData.password, formData.displayName).then((r) => {
            if (r?.status === 200) {
                toast.success(r.message)
                router.push(r.data.enableActivation ? '/auth/activate' : '/auth/login')
            }
        })
    }

    const handleChange = (key: string, value: string) =>
        setFormData({
            ...formData,
            [key]: value,
        })

    const formOptions = [
        {
            type: 'email',
            name: 'emailAddress',
            label: 'Email Address',
            icon: faAt,
            required: true,
            regex: {
                pattern: '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$',
                message: 'Invalid email address.',
            },
        },
        {
            type: 'password',
            name: 'password',
            label: 'Password',
            icon: faKey,
            required: true,
            regex: {
                pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
                message: 'Requires at least one lowercase letter, one uppercase letter, one number and one special character.',
            },
        },
        {
            type: 'password',
            name: 'passwordConfirm',
            label: 'Confirm Password',
            icon: faKey,
            required: true,
            condition: {
                pattern: formData.password === formData.passwordConfirm,
                message: 'Passwords must match.',
            },
        },
        {
            type: 'text',
            name: 'displayName',
            label: 'Display Name',
            icon: faUser,
            minimumValue: 1,
            maximumValue: 14,
            required: true,
            regex: {
                pattern: '^[a-zA-Z0-9 ]+$',
                message: 'Must contain only letters, numbers or spaces.',
            },
        },
    ]

    return (
        <div className="tw-container tw-vertical">
            <div className="_authForm">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                    <div>
                        <h1>Create an account!</h1>
                        <span>Please enter the fields below.</span>
                    </div>
                    {formOptions.map((item, k) => (
                        <Input key={k} {...item} value={formData[item.name]} onChange={(v) => handleChange(item.name, v)} />
                    ))}
                    <div className="flex flex-wrap justify-center lg:justify-between space-x-2">
                        <button type="submit">Submit</button>
                    </div>
                    <Link to="/auth/forgot/send" className="text-center">
                        Forgot Password?
                    </Link>
                </form>
                <Link to="/auth/login" className="absolute left-0 right-0 -bottom-12 text-center">
                    Already have an account?
                </Link>
            </div>
        </div>
    )
}

export default Register
