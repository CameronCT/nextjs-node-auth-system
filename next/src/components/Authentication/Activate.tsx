import { faAt, faKey } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import Auth from '../../api/Auth'
import { useSessionContext } from '../../contexts/Session.context'
import Input from '../Forms/Input'
import Link from '../Utils/Link'

interface FormData {
    [key: string]: string
}

interface IProps {
    activationCode: string
}

const Activation = (props: IProps) => {
    const router = useRouter()
    const { authSessionData } = useSessionContext()
    const [formData, setFormData] = useState<FormData>({
        ...props,
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        Auth.activate(formData.emailAddress, formData.activationCode).then((r) => {
            if (r?.status === 200) {
                authSessionData(r.data.token, r.data.csrf)
                router.push('/')
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
        {
            type: 'text',
            name: 'activationCode',
            label: 'Activation Code',
            icon: faKey,
        },
    ]

    return (
        <div className="tw-container tw-vertical">
            <div className="_authForm">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                    <div>
                        <h1>Activate!</h1>
                        <span>Please verify your details.</span>
                    </div>
                    {formOptions.map((item, k) => (
                        <Input key={k} {...item} value={formData[item.name]} onChange={(v) => handleChange(item.name, v)} />
                    ))}
                    <div className="flex flex-wrap justify-center lg:justify-between space-x-2">
                        <button type="submit">Activate</button>
                    </div>
                </form>
                <Link to="/auth/login" className="absolute left-0 right-0 -bottom-12 text-center">
                    Already have an account?
                </Link>
            </div>
        </div>
    )
}

export default Activation
