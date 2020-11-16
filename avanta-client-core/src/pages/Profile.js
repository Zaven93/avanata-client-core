import React, { useState, useEffect } from 'react'
import { useUploadAvatar, useGetAvatar } from '../core/hooks'
import Storage from '@aws-amplify/storage'

Storage.configure({
    track: true,
    level: 'private'
})

const Profile = () => {
    const [image, setImage] = useState('')
    const { uploadAvatar, data: avatarData, error: avatarError } = useUploadAvatar()
    const { data: fetchedAvatar, refetch: getAvatar } = useGetAvatar()

    let fileInput = React.createRef()

    const onOpenFileDialog = () => {
        fileInput.current.click()
    }

    useEffect(() => {
        getAvatar()
    }, [avatarData])

    useEffect(() => {
        fetchImage()
    }, [fetchedAvatar])

    const fetchImage = () => {
        const myRequest = new Request(fetchedAvatar)
        fetch(myRequest)
            .then(function (response) {
                if (response.status === 200) {
                    setImage(fetchedAvatar)
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <div>Profile</div>
            <a href="#">
                <input type="file" onChange={uploadAvatar} ref={fileInput} />
            </a>
            <img src={image} onClick={onOpenFileDialog} />
        </>
    )
}

export default Profile
