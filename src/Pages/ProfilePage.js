import React, { useRef } from "react";

const ProfilePage = () =>{
    const updateProfileNameRef = useRef();
    const updateProfilePhotoRef = useRef();

    const updateProfileSubmitHandler = (event)=> {
        event.preventDefault()
        const updatedProfileName = updateProfileNameRef.current.value;
        const updatedProfilePhoto = updateProfilePhotoRef.current.value;
        const TokenId = localStorage.getItem("TokenIDExpense")

        fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA5nYjPCDidltvXYlAkGXzCUR0CIOQBAOo",{
            method: 'POST',
            body: JSON.stringify({
                idToken: TokenId,
                displayName: updatedProfileName,
                photoUrl: updatedProfilePhoto,
                returnSecureToken: true
            }),
            headers:{
                'Content-Type': 'application/json'
              }
        }).then(res=>{
            if(res.ok){
                alert("Profile Updated")
                return res.json()
            }
            else{
                return res.json((data)=>{
                    alert(data.error.message)
                })

            }
        })

    }

    return (
        <div>
            <form onSubmit={updateProfileSubmitHandler}>
            <label htmlFor="profileName">Full Name: </label>
            <input id="profileName" type="text" required ref={updateProfileNameRef}></input>
            <label htmlFor="profileURL">Profile Photo Url: </label>
            <input id="profileURL" type="text" required ref={updateProfilePhotoRef}></input>
            <button type="submit">Update</button>
            </form>
            
        </div>
    )
}


export default ProfilePage;