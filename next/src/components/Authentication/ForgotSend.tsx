import { faAt } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import Auth from '../../api/Auth'
import Input from '../Forms/Input'
import Link from '../Utils/Link'

interface FormData {
    [key: string]: string
}

const ForgotSend = () => {
    const router = useRouter()
    const [formData, setFormData] = useState<FormData>({})

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        Auth.recoveryForgot(formData.emailAddress).then((r) => {
            if (r?.status === 200) {
                toast.success(r?.message)
                router.push('/auth/forgot')
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
            type: 'text',
            name: 'emailAddress',
            label: 'Email Address',
            icon: faAt,
        },
    ]

    return (
        <div className="tw-container tw-vertical">
            <div className="_authForm">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                    <div>
                        <h1>Password Recovery!</h1>
                        <span>Please enter your email address.</span>
                    </div>
                    {formOptions.map((item, k) => (
                        <Input key={k} {...item} value={formData[item.name]} onChange={(v) => handleChange(item.name, v)} />
                    ))}
                    <div className="flex flex-wrap justify-center lg:justify-between space-x-2">
                        <button type="submit">Send Email</button>
                    </div>
                </form>
                <Link to="/auth/login" className="absolute left-0 right-0 -bottom-12 text-center">
                    Already have an account?
                </Link>
            </div>
        </div>
    )
}

export default ForgotSend
