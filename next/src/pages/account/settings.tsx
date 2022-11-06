import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Account from '../../api/Account'
import Auth from '../../api/Auth'
import Modal from '../../components/Modal'
import AppContainer from '../../components/Page/AppContainer'
import { Meta } from '../../components/Page/Meta'
import Redirect from '../../components/Utils/Redirect'
import Config from '../../Config'
import { useAppContext } from '../../contexts/App.context'
import { useSessionContext } from '../../contexts/Session.context'

const Page = () => {

    const { sessionData, resetSessionData } = useSessionContext();
    const { modal, setModal } = useAppContext();
    const [ redirect, setRedirect ] = useState<string>('');
    const [ confirmData, setConfirmData ] = useState<string>('');
    const [ formData, setFormData ] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        setFormData({ 
            displayName: sessionData?.displayName || '',
        })
    }, [ sessionData ]);

    const handleDelete = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setModal(null);

        Auth.remove().then((res) => {
          if (res?.status === 200) {
              resetSessionData();
              setRedirect('/');
          } else 
              toast.error('An error occurred while deleting your account.');
        });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        Account.update(formData).then((res) => (res?.status === 200)
          ? toast.success('Account updated successfully.')
          : toast.error(res?.data?.message || 'An error occurred.'));
    };
    
    const formOptions = [
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

    const isMatch = confirmData === sessionData?.accountId;

    return (
        <AppContainer meta={<Meta title="Settings" />} isLoaded={sessionData !== null && sessionData?.authName !== 'Guest'}>
            {redirect && <Redirect to={redirect} />}
            <Modal isOpened={modal === 0} onClose={() => setModal(null)}>
                <div className="h3">Delete your account</div>
                <p className="mt-4 text-lg">
                    Are you sure you want to delete your account? This action cannot be undone.
                </p>
                <form onSubmit={handleDelete} className="mt-4">
                    Please enter <span className="text-teal-500 font-semibold">{sessionData?.accountId}</span> to delete your account
                    <div className="_formField my-4">
                        <div>
                            <FontAwesomeIcon icon={faCode} />
                        </div>
                        <input type="text" id="confirm" placeholder="Enter here..." value={confirmData} onChange={(e) => setConfirmData(e.target.value)} />
                    </div>
                    <button type="submit" className={`button medium default ${!isMatch ? 'opacity-50 pointer-events-none' : ''}`}>Delete Account</button>
                </form>
            </Modal>
            <div className="tw-container tw-padding">
                <div>
                    <h2>Settings</h2>
                    <form method="post" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-4 my-4">
                            {formOptions.map((item) => (
                                <div key={item.name} className="_formField">
                                    <div>
                                        <FontAwesomeIcon icon={item.icon} />
                                    </div>
                                    <input type={item.type} id={item.name} placeholder={item.label} value={formData[item.name]} onChange={(e) => setFormData({ ...formData, [item.name]: e.target.value })} />
                                </div>
                            ))}
                        </div>
                        <button type="submit" className="button medium default">Update</button>
                    </form>
                </div>
                <div className="mt-6">
                    <h2>Danger Zone</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                        <div className="bg-gray-100 rounded-lg p-4">
                            <h3 className="text-lg font-semibold">Delete</h3>
                            <p>Delete your account. This action cannot be undone.</p>
                            <button className="button medium default mt-4" onClick={() => setModal(0)}>Delete Account</button>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-4">
                            <h3 className="text-lg font-semibold">GDPR</h3>
                            <p>View and save all of your data in JSON.</p>
                            <a href={`${Config.authUrl}/gdpr`} className="button medium default mt-4" target="_blank" rel="noopener noreferrer">View Data</a>
                        </div>
                    </div>
                </div>
            </div>
        </AppContainer>
    )
}

export default Page
